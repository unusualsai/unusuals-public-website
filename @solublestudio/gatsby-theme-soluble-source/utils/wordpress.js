const { getTextWithoutWrapper, getTextWithoutBreaklinesAround } = require('./marked');
const { wordpresspages: wordpressPagesQuery } = require('../data/query');
const path = require('path');

exports.createWordpressTranslationNodes = function({ actions, getNodesByType, createNodeId, createContentDigest }) {
    const { createNode } = actions;

    const translations = getNodesByType('wordpress__wp_translation');

	if (!translations || !translations.length) {
		return;
	}
    
	translations.forEach(node => {
		const fieldsData = {
			data: {
				key: node.title,
				language: node.wpml_current_locale,
				text: getTextWithoutWrapper(node.content),
				md: getTextWithoutBreaklinesAround(node.content)
			}
        };
        
		createNode({
			...fieldsData,
			id: createNodeId(`translation-${node.wpml_current_locale}-${node.id}`),
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

exports.createWordpressPages = async function({ actions, graphql }, defaultThemeOptions, themeOptions, url, getTemplate) {
    const { createPage } = actions;
    const { templatesPath, primaryLanguage, language } = defaultThemeOptions;
    const { modelPages = [ 'Page' ] } = themeOptions.wordpress;

    const data = await graphql(wordpressPagesQuery(modelPages));

    let titleSuffix = data.data.wordpressSiteMetadata.name;
    let fallbackDescription = data.data.wordpressSiteMetadata.description;
    let fallbackSeoImage = null;

    if (data.data.allWordpressPage && data.data.allWordpressPage.edges) {
        data.data.allWordpressPage.edges.forEach(({ node }) => {
            if (!fallbackSeoImage && node.acf && node.acf.template_key && node.acf.template_key === '_options' && node.featured_media && node.featured_media.localFile) {
                fallbackSeoImage = node.featured_media.localFile;
            }
        });
    }

    modelPages.forEach(model => {
        const pages = data.data[`allWordpress${model}`].edges;

        let homePage = pages.find(p => p.node.path === '/');

        let homeIds = homePage ? [
            homePage.node.wordpress_id,
            ...homePage.node.wpml_translations.map(t => t.wordpress_id)
        ] : [];
        
        pages.filter(({ node }) => (model !== 'Page' || node.acf && node.acf.template_key !== '_options')).forEach(({ node }) => {
            let alternateLanguages = [];

            node._allSlugLocales.forEach(item => {
                if (typeof language[item.locale] !== 'undefined') {
                    alternateLanguages.push({
                        language: item.locale,
                        slug: item.value
                    });
                }
            });

            // TODO: removeSuffix right now is attached to home

            let seo = {
                title: node.yoast_title ? node.yoast_title : node.title,
                description: fallbackDescription,
                image: node.featured_media && node.featured_media.localFile ? node.featured_media.localFile : fallbackSeoImage,
                noIndex: false,
                removeSuffix: homeIds.indexOf(node.wordpress_id) === -1 ? false : true,
                alternateLanguages,
                ...titleSuffix && { titleSuffix }
            };

            node.yoast_meta.forEach(meta => {
                if (meta.name === 'description') {
                    seo.description = meta.cont;
                } else if (meta.name === 'robots' && meta.cont.indexOf('noindex') !== -1) {
                    seo.noIndex = true;
                }
            });

            // TODO
            const headerItems = [];
    
            createPage({
                path: `${node.slug}/`,
                component: getTemplate(path.resolve(`${templatesPath}/${node.acf && node.acf.template_key ? node.acf.template_key : model.toLowerCase()}.js`)),
                context: {
                    id: node.id,
                    url,
                    pageUrl: `${url}${node.slug}${node.slug ? '/' : ''}`,
                    language: node.wpml_current_locale ? node.wpml_current_locale : primaryLanguage,
                    seo,
                    headerItems
                }
            });
        });
    });
}

async function resolveWordpressSlug(language, pageNode, itemModel = '', homeIds) {
    let value = [];

	if (language[pageNode.wpml_current_locale]) {
		value.push(language[pageNode.wpml_current_locale]);
    }

    // TODO: Model trees
    
	if (itemModel) {
		const slugModel = typeof itemModel === 'object' ? itemModel[pageNode.wpml_current_locale] : itemModel;
		value.push(slugModel);
    }
    
	if (homeIds.indexOf(pageNode.wordpress_id) === -1) {
		value.push(pageNode.slug);
    }
    
	return value.join('/');
}

function getModelType(model) {
    if (
        model.indexOf('Wp') === 0 ||
        [
            'page',
            'post',
            'tag',
            'category'
        ].indexOf(model.toLowerCase()) === -1
    ) {
        return `wordpress__wp_${model.replace('Wp', '').toLowerCase()}`;
    }

    return `wordpress__${model.toUpperCase()}`;
}

async function getHomeIds(model, context) {
    if (model !== 'Page') {
        return [];
    }

    const home = await context.nodeModel.runQuery({
        query: {
            filter: { 
                path: { eq: '/' }
            }
        },
        type: getModelType('Page')
    });

    return home && home.length ? 
    [
        home[0].wordpress_id,
        ...home[0].wpml_translations.map(t => t.wordpress_id)
    ] : [];
}

exports.createWordpressResolvers = function(defaultThemeOptions, themeOptions) {
    const { modelPages = [ 'Page' ] } = themeOptions.wordpress;
	const { language, pathsByLanguage } = defaultThemeOptions;

    let resolvers = {};

    modelPages.forEach(model => {
        let slugModel = pathsByLanguage[model] ? pathsByLanguage[model] : (
            pathsByLanguage[model.toLowerCase()] ? pathsByLanguage[model.toLowerCase()] : ''
        );

        resolvers[getModelType(model)] = {
            slug: {
                type: "String",
                resolve: async (source, args, context, info) => {
                    if (source.slug) {
                        const homeIds = await getHomeIds(model, context);
                        
                        const slug = await resolveWordpressSlug(
                            language, 
                            source,
                            slugModel,
                            homeIds
                        );

                        return slug;
                    }

                    return null;
                },
            },
            _allSlugLocales: {
                type: "[SlugLocale]",
                resolve: async (source, args, context, info) => {
                    const otherIds = source.wpml_translations.map(t => t.wordpress_id);
                    if (!otherIds || !otherIds.length) {
                        return [];
                    }

                    const otherPages = await context.nodeModel.runQuery({
                        query: {
                            filter: { 
                                wordpress_id: { in: otherIds }
                            }
                        },
                        type: getModelType(model)
                    });

                    if (!otherPages || !otherPages.length) {
                        return [];
                    }

                    const homeIds = await getHomeIds(model, context);

                    return otherPages.map(page => ({
                        locale: page.wpml_current_locale,
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

async function getWordpressMenuItem(item, defaultThemeOptions, getNodesByType) {
    let slug = '#';

    if (item.type === 'custom') {
        slug = item.url;
    } else if (item.type === 'post_type') {
        // TODO: Esto es un desastre, se repite por ahí. Centralizar!
        const { language, pathsByLanguage } = defaultThemeOptions;
        const model = item.object;

        const pages = getNodesByType(getModelType(model));

        if (pages && pages.length) {
            let slugModel = pathsByLanguage[model] ? pathsByLanguage[model] : (
                pathsByLanguage[model.toLowerCase()] ? pathsByLanguage[model.toLowerCase()] : ''
            );
    
            // TODO: Hacer que esto vaya bien... normalmente no se añade la home en el menú pero...
            //const homeIds = await getHomeIds(model, context);
            const homeIds = [];
    
            slug = await resolveWordpressSlug(
                language, 
                pages.find(p => p.wordpress_id === item.object_id),
                slugModel,
                homeIds
            );
        }
    }

    return {
        slug,
        label: item.title,
        description: item.description
    }
}

exports.createWordpressMenu = async function({ actions, createNodeId, createContentDigest, getNodesByType, getNode }, defaultThemeOptions, themeOptions) {
    const { createNode, createNodeField } = actions;

    const nodes = getNodesByType('wordpress__wp_api_menus_menus_items');
    if (!nodes || !nodes.length) {
        return;
    }

    nodes.forEach(item => {
        if (!item.items || !item.items.length) {
            return;
        }

        // TODO: Encontrar una forma más limpia que usando el nombre del menú para el idioma y sabiendo de dónde es
        const typeLink = item.slug.indexOf('header') !== -1 ? 'header' : 'footer';
        let nameSplit = item.name.split(' - ');
        if (nameSplit.length === 1) {
            nameSplit = item.name.split('-');
        }

        const locale = nameSplit[nameSplit.length - 1].trim();

        const baseFieldsData = {
            templateKey: `_link-${typeLink}`,
            language: locale,
            // TODO: Type button? showInPages?
            type: '',
            showInPages: '-'
        };

        item.items.forEach(async (menuItem, i) => {
            const column = i + 1;

            const menuItemData = await getWordpressMenuItem(menuItem, defaultThemeOptions, getNodesByType);

            const parentFieldsData = {
                data: {
                    ...baseFieldsData,
                    ...menuItemData,
                    column,
                    order: 1
                }
            };

            createNode({
                ...parentFieldsData,
                id: createNodeId(`link-${typeLink}-${menuItem.object_id}-${column}-1`),
                parent: null,
                children: [],
                internal: {
                    type: 'Link',
                    content: JSON.stringify(parentFieldsData),
                    contentDigest: createContentDigest(parentFieldsData)
                }
            });

            if (menuItem.wordpress_children && menuItem.wordpress_children.length) {
                menuItem.wordpress_children.forEach(async (childMenuItem, ii) => {
                    const menuItemData = await getWordpressMenuItem(childMenuItem, defaultThemeOptions, getNodesByType);

                    const childFieldsData = {
                        data: {
                            ...baseFieldsData,
                            ...menuItemData,
                            column,
                            order: ii + 2
                        }
                    };

                    createNode({
                        ...childFieldsData,
                        id: createNodeId(`link-${typeLink}-${childMenuItem.object_id}-${column}-${ii + 2}`),
                        parent: null,
                        children: [],
                        internal: {
                            type: 'Link',
                            content: JSON.stringify(childFieldsData),
                            contentDigest: createContentDigest(childFieldsData)
                        }
                    });
                });
            }
        });
    });
}