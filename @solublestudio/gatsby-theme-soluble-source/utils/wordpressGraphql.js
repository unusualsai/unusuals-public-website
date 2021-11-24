const { getTextWithoutWrapper, getTextWithoutBreaklinesAround } = require('./marked');
const { wordpressgraphqlpages: wordpressGraphqlPagesQuery } = require('../data/query');
const path = require('path');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.createWordpressGraphqlTranslationNodes = function({ actions, getNodesByType, createNodeId, createContentDigest }) {
    const { createNode } = actions;

    const translations = getNodesByType('WpTranslation');
    
	if (!translations || !translations.length) {
		return;
	}
    
	translations.forEach(node => {
		const fieldsData = {
			data: {
				key: node.title,
				language: node.language,
				text: getTextWithoutWrapper(node.content),
				md: getTextWithoutBreaklinesAround(node.content)
			}
        };
        
		createNode({
			...fieldsData,
			id: createNodeId(`translation-${node.language}-${node.id}`),
			parent: null,
			children: [],
			internal: {
				type: 'Translation',
				content: JSON.stringify(fieldsData),
				contentDigest: createContentDigest(fieldsData)
			}
        });
    });
}

exports.createWordpressGraphqlPages = async function({ actions, graphql }, defaultThemeOptions, themeOptions, url, getTemplate) {
    const { createPage } = actions;
    const { templatesPath, primaryLanguage, language } = defaultThemeOptions;
    const { modelPages = [ 'Page' ], supports } = themeOptions.wordpressGraphql;
    
    const data = await graphql(wordpressGraphqlPagesQuery(modelPages, supports ? supports : {}));

    let titleSuffix = data.data.wp.generalSettings.title;
    let fallbackDescriptionByLang = {};
    let fallbackSeoImage = null;

    const availableLanguages = Object.keys(language);
    
    if (data.data.allWpPage && data.data.allWpPage.edges) {
        data.data.allWpPage.edges
            .filter(({ node }) => {
                return node && node.templateKey && node.templateKey.templateKey === '_options';
            })
            .forEach(({ node }) => {
                fallbackDescriptionByLang[node.language] = entities.decode(node.seo.metaDesc);
                if (!fallbackSeoImage && node.featuredImage && node.featuredImage.node && node.featuredImage.node.localFile) {
                    fallbackSeoImage = node.featuredImage.node.localFile;
                }
            });
    }

    modelPages.forEach(model => {
        let pages = data.data[`allWp${model}`].edges;
        let homeIds = [];

        if (supports.wpml) {
            pages = data.data[`allWp${model}`].edges.filter(({ node }) => (availableLanguages.indexOf(node.language) !== -1));
            let homePage = pages.find(p => p.node.link === `${data.data.wp.generalSettings.url}` || p.node.link === `${data.data.wp.generalSettings.url}/`);
            homeIds = homePage ? [
                homePage.node.id,
                ...homePage.node.translations.map(t => t.id)
            ] : [];
        }
        
        pages.filter(({ node }) => (!node.templateKey || node.templateKey.templateKey !== '_options')).forEach(({ node }) => {
            let alternateLanguages = [];

            if (node._allSlugLocales) {
                node._allSlugLocales.forEach(item => {
                    if (typeof language[item.locale] !== 'undefined') {
                        alternateLanguages.push({
                            language: item.locale,
                            slug: item.value
                        });
                    }
                });
            }

            // TODO: removeSuffix right now is attached to home
            let seo = {
                title: node.seo?.title ? entities.decode(node.seo.title) : node.title,
                description: node.seo?.metaDesc ? entities.decode(node.seo.metaDesc) : fallbackDescriptionByLang[node.language],
                image: node.featuredImage && node.featuredImage.node && node.featuredImage.node.localFile ? node.featuredImage.node.localFile : fallbackSeoImage,
                noIndex: node.seo?.metaRobotsNoindex === 'noindex' ? true : false,
                removeSuffix: supports && supports.rankmath ? false : (homeIds.indexOf(node.id) !== -1 || node.seo?.title ? true : false),
                alternateLanguages,
                ...titleSuffix && { titleSuffix }
            };

            // TODO
            const headerItems = [];
    
            createPage({
                path: `${node.slug}/`,
                component: getTemplate(path.resolve(`${templatesPath}/${node.templateKey && node.templateKey.templateKey ? node.templateKey.templateKey : model.toLowerCase()}.js`)),
                context: {
                    id: node.id,
                    url,
                    pageUrl: `${url}${node.slug}${node.slug ? '/' : ''}`,
                    language: node.language ? node.language : primaryLanguage,
                    seo,
                    headerItems
                }
            });
        });
    });
}

async function resolveWordpressSlug(language, pageNode, itemModel = '', homeIds) {
    let value = [];

	if (pageNode.language && language[pageNode.language]) {
		value.push(language[pageNode.language]);
    }

    // TODO: Model trees
	if (itemModel) {
        let slugModel = '';
        if (pageNode.language && typeof itemModel === 'object') {
            slugModel = itemModel[pageNode.language];
        } else if (typeof itemModel === 'object') {
            let itemModelArray = Object.values(itemModel);
            // TODO: Make this work with the primaryLanguage? Normally primaryLanguage is the first one?
            if (itemModelArray.length) {
                slugModel = itemModelArray[0];
            }
        } else {
            slugModel = itemModel;
        }
        
		value.push(slugModel);
    }
    
	if (homeIds.indexOf(pageNode.id) === -1) {
		value.push(pageNode.slug);
    }
    
	return value.join('/');
}

async function getHomeIds(model, context) {
    if (model !== 'Page') {
        return [];
    }

    const home = await context.nodeModel.runQuery({
        query: {
            filter: { 
                isFrontPage: {
                    eq: true
                }
            }
        },
        type: 'WpPage'
    });

    return home && home.length ? 
    [
        home[0].id,
        ...home[0].translations.map(t => t.id)
    ] : [];
}

exports.createWordpressGraphqlResolvers = function(defaultThemeOptions, themeOptions) {
    const { modelPages = [ 'Page' ], resolveSlugAfter } = themeOptions.wordpressGraphql;
	const { language, pathsByLanguage } = defaultThemeOptions;

    let resolvers = {};

    modelPages.forEach(model => {
        let slugModel = pathsByLanguage[model] ? pathsByLanguage[model] : (
            pathsByLanguage[model.toLowerCase()] ? pathsByLanguage[model.toLowerCase()] : ''
        );

        resolvers[`Wp${model}`] = {
            slug: {
                type: "String",
                resolve: async (source, args, context, info) => {
                    if (source.slug) {
                        const homeIds = await getHomeIds(model, context);
                        
                        let slug = await resolveWordpressSlug(
                            language, 
                            source,
                            slugModel,
                            homeIds
                        );

                        if (resolveSlugAfter) {
                            slug = await resolveSlugAfter(
                                slug,
                                source,
                                context
                            );
                        }

                        return slug;
                    }

                    return null;
                },
            },
            _allSlugLocales: {
                type: "[SlugLocale]",
                resolve: async (source, args, context, info) => {
                    const otherIds = source.translations ? source.translations.filter(t => !!t).map(t => t.id) : [];
                    if (!otherIds || !otherIds.length) {
                        return [];
                    }

                    const otherPages = await context.nodeModel.runQuery({
                        query: {
                            filter: { 
                                id: { in: otherIds }
                            }
                        },
                        type: `Wp${model}`
                    });

                    if (!otherPages || !otherPages.length) {
                        return [];
                    }

                    const homeIds = await getHomeIds(model, context);

                    // TODO: Missing resolveSlugAfter
                    return otherPages.map(page => ({
                        locale: page.language,
                        value: resolveWordpressSlug(
                            language,
                            page,
                            slugModel,
                            homeIds
                        )
                    }));
                },
            }
        }
    });

    return resolvers;
}

async function getWordpressMenuItem(item, defaultThemeOptions, getNode) {
    let slug = '#';

    if (!item.link && item.externalLink) {
        slug = item.externalLink;
    } else if (item.link && item.link.id) {
        // TODO: Esto es un desastre, se repite por ahí. Centralizar!
        const { language, pathsByLanguage } = defaultThemeOptions;

        const model = item.link.__typename;
        const page = await getNode(item.link.id);

        if (page) {
            let slugModel = pathsByLanguage[model] ? pathsByLanguage[model] : (
                pathsByLanguage[model.toLowerCase()] ? pathsByLanguage[model.toLowerCase()] : ''
            );
    
            // TODO: Hacer que esto vaya bien... normalmente no se añade la home en el menú pero...
            //const homeIds = await getHomeIds(model, context);
            const homeIds = [];


            // TODO: Missing resolveSlugAfter
            slug = await resolveWordpressSlug(
                language, 
                page,
                slugModel,
                homeIds
            );
        }
    }

    return {
        slug,
        label: item.label,
        description: item.description,
        column: item.column
    }
}

exports.createWordpressGraphqlMenu = async function({ actions, createNodeId, createContentDigest, getNodesByType, getNode }, defaultThemeOptions, themeOptions) {
    const { createNode } = actions;

    const nodes = getNodesByType('WpPage');
    if (!nodes || !nodes.length) {
        return;
    }

    nodes
        .filter(node => (node.pageLinks && (node.pageLinks.header || node.pageLinks.footer)))
        .forEach(node => {
            ['header', 'footer'].forEach(typeLink => {
                if (!node.pageLinks[typeLink] || !node.pageLinks[typeLink].length) {
                    return;
                }

                const baseFieldsData = {
                    templateKey: `_link-${typeLink}`,
                    language: node.language,
                    // TODO: Type button? showInPages?
                    type: '',
                    showInPages: '-'
                };

                node.pageLinks[typeLink].forEach(async (item, i) => {
                    const menuItemData = await getWordpressMenuItem(item, defaultThemeOptions, getNode);

                    const thisFieldData = {
                        data: {
                            ...baseFieldsData,
                            ...menuItemData,
                            order: i + 1
                        }
                    };
        
                    createNode({
                        ...thisFieldData,
                        id: createNodeId(`link-${typeLink}-${node.language}-${item.column}-${i + 1}`),
                        parent: null,
                        children: [],
                        internal: {
                            type: 'Link',
                            content: JSON.stringify(thisFieldData),
                            contentDigest: createContentDigest(thisFieldData)
                        }
                    });
                });
            });
        });
}
