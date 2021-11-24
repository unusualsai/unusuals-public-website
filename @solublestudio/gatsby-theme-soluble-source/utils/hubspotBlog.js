const {
    getTextWithoutAnyWrapper,
    getTextWithoutBreaklines,
    changeFontStyleItalicWithITag,
    removeStyleTags,
    changeFontWeightBoldWithBTag,
    changePaddingLeftWithPDataDetached
} = require('./marked');
const fetch = require('node-fetch');
const path = require('path');
const { hubspotblogpages } = require('../data/query');
const { asyncForEach } = require('./index');
const slugify = require('slugify');


// TODO: These labels are project-specific
const formatHubspotHtml = html => {
    if (!html) {
        return '';
    }

    return removeStyleTags(
        changePaddingLeftWithPDataDetached(
            changeFontStyleItalicWithITag(
                changeFontWeightBoldWithBTag(
                    html
                )
            )
        )
    );
}

exports.createHubspotBlogPages = async function({ actions, graphql }, defaultThemeOptions, themeOptions, url, getTemplate, fallbackSeo) {
    const { createPage } = actions;
    const { templatesPath, primaryLanguage, language, pathsByLanguage } = defaultThemeOptions;
    const { templateKey, pagination } = themeOptions.hubspotBlog;
    const { HubspotBlogPost, HubspotBlogAuthor, HubspotBlogTopic, HubspotBlogPage } = templateKey;

    const { data } = await graphql(hubspotblogpages());
    
    if (HubspotBlogPost) {
        data.allHubspotBlogPost.edges.forEach(({ node }) => {
            let seo = {
                title: node.title,
                description: node.description ? node.description : (fallbackSeo.description ? fallbackSeo.description : ''),
                image: node.featuredImage?.file ? node.featuredImage.file : (fallbackSeo?.image?.file ? fallbackSeo.image.file : null),
                noIndex: node.noIndex || false,
                removeSuffix: false,
                alternateLanguages: [],
                ...fallbackSeo.titleSuffix && { titleSuffix: fallbackSeo.titleSuffix }
            };
        
            createPage({
                path: `${node.slug}/`,
                component: getTemplate(path.resolve(`${templatesPath}/${HubspotBlogPost}.js`)),
                context: {
                    id: node.id,
                    url,
                    pageUrl: `${url}${node.slug}${node.slug ? '/' : ''}`,
                    language: node.language ? node.language : primaryLanguage,
                    seo,
                    headerItems: []
                }
            });
        });
    }

    if (HubspotBlogAuthor) {
        data.allHubspotBlogAuthor.edges.forEach(({ node }) => {
            let seo = {
                title: node.name,
                description: fallbackSeo.description ? fallbackSeo.description : '',
                image: node.avatar?.file ? node.avatar.file : (fallbackSeo?.image?.file ? fallbackSeo.image.file : null),
                noIndex: false,
                removeSuffix: false,
                alternateLanguages: [],
                ...fallbackSeo.titleSuffix && { titleSuffix: fallbackSeo.titleSuffix }
            };
        
            createPage({
                path: `${node.slug}/`,
                component: getTemplate(path.resolve(`${templatesPath}/${HubspotBlogAuthor}.js`)),
                context: {
                    id: node.id,
                    url,
                    pageUrl: `${url}${node.slug}${node.slug ? '/' : ''}`,
                    language: node.language ? node.language : primaryLanguage,
                    seo,
                    headerItems: [],
                    hubspotId: node.hubspotId,
                    author: node.name
                }
            });
        });
    }

    if (HubspotBlogTopic) {
        data.allHubspotBlogTopic.edges.forEach(({ node }) => {
            let seo = {
                title: node.name,
                description: fallbackSeo.description ? fallbackSeo.description : '',
                image: fallbackSeo?.image?.file ? fallbackSeo.image.file : null,
                noIndex: false,
                removeSuffix: false,
                alternateLanguages: [],
                ...fallbackSeo.titleSuffix && { titleSuffix: fallbackSeo.titleSuffix }
            };
        
            createPage({
                path: `${node.slug}/`,
                component: getTemplate(path.resolve(`${templatesPath}/${HubspotBlogTopic}.js`)),
                context: {
                    id: node.id,
                    url,
                    pageUrl: `${url}${node.slug}${node.slug ? '/' : ''}`,
                    language: node.language ? node.language : primaryLanguage,
                    seo,
                    headerItems: [],
                    hubspotId: node.hubspotId,
                    topic: node.name
                }
            });
        });
    }

    if (HubspotBlogPage) {
        const perPage = pagination.perPage || 6;
        const firstPageItems = pagination.firstPageItems || perPage;
        
        Object.keys(language).forEach(lang => {
            const posts = data.allHubspotBlogPost.edges.filter(edge => edge.node.language === lang);
            const slugBase = pathsByLanguage.HubspotBlogPage && pathsByLanguage.HubspotBlogPage[lang] ? pathsByLanguage.HubspotBlogPage[lang] : 'blog/page';
            let pageNr = Math.ceil((posts.length - firstPageItems) / perPage) + 1;
            let isLastPage = true;

            while (pageNr > 1) {
                const pageSlug = `${slugBase}/${pageNr}/`;
                const skip = (pageNr - 2) * perPage + firstPageItems;
                const thesePosts = posts.slice(skip, skip + perPage);

                const seo = {
                    title: `${pageNr}`,
                    description: fallbackSeo.description ? fallbackSeo.description : '',
                    image: fallbackSeo?.image?.file ? fallbackSeo.image.file : null,
                    noIndex: false,
                    removeSuffix: false,
                    alternateLanguages: [],
                    ...fallbackSeo.titleSuffix && { titleSuffix: fallbackSeo.titleSuffix }
                };

                createPage({
                    path: pageSlug,
                    component: getTemplate(path.resolve(`${templatesPath}/${HubspotBlogPage}.js`)),
                    context: {
                        url,
                        pageUrl: `${url}${pageSlug}`,
                        language: lang,
                        postIds: thesePosts.map(edge => edge.node.id),
                        pageNr,
                        pageNrString: `${pageNr}`,
                        isLastPage,
                        seo
                    }
                });

                isLastPage = false;
                pageNr--;
            }
        });
    }
}

exports.getHubspotBlogTypes = () => (`
    type HubspotBlogPostImage implements Node {
        file: File @link(by: "url", from: "url")
        alt: String
        url: String
    }

    type HubspotBlogPostContent implements Node {
        img: HubspotBlogPostImage @link(by: "url", from: "imgUrl")
        html: String
    }

    type HubspotBlogTopic implements Node {
        hubspotId: String
        name: String
        slug: String
    }

    type HubspotBlogAuthor implements Node {
        hubspotId: String
        name: String
        bio: String
        slug: String
        avatar: File @link(by: "url", from: "avatarUrl")
        linkedin: String
        facebook: String
        twitter: String
        email: String
    }

    type HubspotBlogPost implements Node {
        hubspotId: String
        title: String
        titleDetail: String
        slug: String
        description: String
        language: String
        date: Date @dateformat(formatString: "YYYY-MM-DD")
        featuredImage: HubspotBlogPostImage @link(by: "url", from: "featuredImageUrl")
        summary: String
        content: [HubspotBlogPostContent] @link(by: "id", from: "content___NODE")
        author: HubspotBlogAuthor @link(by: "hubspotId", from: "authorHubspotId")
        topics: [HubspotBlogTopic] @link(by: "hubspotId", from: "topicsHubspotId")
        noIndex: Boolean
        tableOfContents: [HubspotBlogPostTableOfContent]
    }

    type HubspotBlogPostTableOfContent implements Node {
        title: String
        slug: String
    }
`);

exports.onHubspotBlogCreateNode = async function (node, createRemoteFileNode) {
    if (node.internal.type === 'HubspotBlogAuthor' && node.avatarUrl) {
        await createRemoteFileNode(node.avatarUrl);
    } else if (node.internal.type === 'HubspotBlogPostImage' && node.url) {
        await createRemoteFileNode(node.url);
    }
}

exports.createHubspotBlogNodes = async function({ actions, createNodeId, createContentDigest }, themeOptions) {
    const { createNode } = actions;
    const { apiToken, blogPostsParams = {} } = themeOptions.hubspotBlog;

    const POST_PARAMS = [
        `hapikey=${apiToken}`,
        `state=${blogPostsParams.state || 'PUBLISHED'}`,
        blogPostsParams.contentGroupId ? `content_group_id=${blogPostsParams.contentGroupId}` : null,
        'limit=300'
    ];
    
    const API_ENDPOINT_POST = `https://api.hubapi.com/content/api/v2/blog-posts?${POST_PARAMS.filter(i => !!i).join('&')}`;
    const API_ENDPOINT_TOPIC = `https://api.hubapi.com/blogs/v3/topics?hapikey=${apiToken}&limit=1000`;
    const API_ENDPOINT_AUTHOR = `https://api.hubapi.com/blogs/v3/blog-authors?hapikey=${apiToken}&limit=1000`;

    const [ posts, topics, authors ] = await Promise.all([
        fetch(API_ENDPOINT_POST).then(res => res.json()),
        fetch(API_ENDPOINT_TOPIC).then(res => res.json()),
        fetch(API_ENDPOINT_AUTHOR).then(res => res.json())
    ]);

    const authorsWithPosts = {};
    posts.objects.filter(p => !!p.blog_post_author).forEach(({ blog_post_author }) => {
        authorsWithPosts[blog_post_author.id] = 1;
    });

    const topicsWithPosts = {};
    posts.objects.filter(p => !!p.topic_ids.length).forEach(({ topic_ids }) => {
        topic_ids.forEach(id => {
            topicsWithPosts[id] = 1;
        });
    });

    await asyncForEach(authors.objects, async a => {
        if (!authorsWithPosts[a.id]) {
            return;
        }

        const authorData = {
            hubspotId: `${a.id}`,
            name: a.displayName,
            bio: a.bio || null,
            slug: a.slug,
            avatarUrl: a.avatar ? a.avatar : (a.gravatarUrl ? a.gravatarUrl : null),
            linkedin: a.linkedin || null,
            facebook: a.facebook || null,
            twitter: a.twitter || null,
            email: a.email || null
        };

        await createNode({
			...authorData,
			id: createNodeId(`hubspotBlogAuthor-${a.id}`),
			parent: null,
			children: [],
			internal: {
				type: 'HubspotBlogAuthor',
				content: JSON.stringify(authorData),
				contentDigest: createContentDigest(authorData)
			}
		});
    });

    await asyncForEach(topics.objects, async t => {
        if (!topicsWithPosts[t.id]) {
            return;
        }

        const topicData = {
            hubspotId: `${t.id}`,
            name: t.name,
            slug: t.slug,
        };

        await createNode({
			...topicData,
			id: createNodeId(`hubspotBlogTopic-${t.id}`),
			parent: null,
			children: [],
			internal: {
				type: 'HubspotBlogTopic',
				content: JSON.stringify(topicData),
				contentDigest: createContentDigest(topicData)
			}
		});
    });

    const createHubspotBlogPostContentImage = async (url, alt = '') => {
        const imageData = {
            url,
            alt
        };

        await createNode({
			...imageData,
			id: createNodeId(`HubspotBlogPostImage-${url}`),
			parent: null,
			children: [],
			internal: {
				type: 'HubspotBlogPostImage',
				content: JSON.stringify(imageData),
				contentDigest: createContentDigest(imageData)
			}
		});
    }
    
    await asyncForEach(posts.objects, async p => {
        if (p.featured_image) {
            await createHubspotBlogPostContentImage(p.featured_image, p.featured_image_alt_text);
        }

        let content___NODE = [];

        let widgetOrders = {};
        let summary = null;
        let postDetailTitle = null;

        Object.keys(p.widgets).forEach(widgetId => {
            const widget = p.widgets[widgetId];
            if (!widget || widget.deleted_at) {
                return;
            }

            if (widget.body?.value) {
                // This should be the title
                postDetailTitle = widget.body.value;
                return;
            } else if (widget.body?.summary_text) {
                summary = widget.body.summary_text;
                return;
            }

            widgetOrders[widget.order || 99] = widgetId;
        });

        widgetOrders = Object.values(widgetOrders);

        let contents = [];
        let tableOfContents = [];

        await asyncForEach(widgetOrders, async (widgetId, i) => {
            const widget = p.widgets[widgetId];

            if (widget.body.img?.src) {
                const nextWidgetId = widgetOrders[i+1];
                const next = nextWidgetId ? p.widgets[nextWidgetId] : null;

                await createHubspotBlogPostContentImage(widget.body.img.src, widget.body.img.alt);
                contents.push({
                    imgUrl: widget.body.img.src,
                    html: next && next.body?.value ? formatHubspotHtml(next.body.value) : null
                });
            } else if (widget.body.html) {
                let imageParagraphs = [];
                let bodyParts = [];

                [ ...widget.body.html.matchAll(/<p(.*?)>.*?<\/p>/gms) ].forEach(match => {
                    if (match[0].indexOf('<img') !== -1) {
                        let thisBodyParts = widget.body.html.split(match[0]);
                        let thisPart = null;
                        if (imageParagraphs.length) {
                            thisPart = thisBodyParts[0].split(imageParagraphs[imageParagraphs.length - 1])[1];
                        } else {
                            thisPart = thisBodyParts[0];
                        }
                        
                        bodyParts.push(thisPart);
                        bodyParts.push(match[0]);
                        imageParagraphs.push(match[0]);
                    }
                });

                let finalPart = imageParagraphs.length ? widget.body.html.split(imageParagraphs[imageParagraphs.length - 1])[1] : widget.body.html;
                bodyParts.push(finalPart);

                await asyncForEach(bodyParts, async part => {
                    if (part.indexOf('<img') !== -1) {
                        let src = part.match(/src=\"([^\"]+)\"/gm);
                        if (src?.length) {
                            src = src[0].replace('src="','').replace('"','');
                        }
                
                        if (src) {
                            let alt = part.match(/alt=\"([^\"]+)\"/gm);
                            if (alt?.length) {
                                alt = alt[0].replace('alt="','').replace('"','');
                            }

                            await createHubspotBlogPostContentImage(src, alt ? alt : '');
                            let caption = getTextWithoutAnyWrapper(formatHubspotHtml(part.replace(/<img[^>]+>/gm, '')));

                            contents.push({
                                imgUrl: src,
                                html: caption ? caption : null
                            });

                            return;
                        }
                    }

                    let html = formatHubspotHtml(part);

                    [ ...html.matchAll(/<h2([^>]*)>(.*)<\/h2>/g) ].forEach(match => {
                        let dataAnchor = match[1] && match[1].indexOf('data-anchor') !== -1 ? match[1] : ` data-anchor="${slugify(match[2], { lower: true })}"`;
                        tableOfContents.push({
                            title: match[2],
                            slug: slugify(match[2], { lower: true })
                        });
                        html = html.replace(match[0], `<h2 ${dataAnchor}>${match[2]}</h2>`);
                    });

                    contents.push({ html });
                });
            }
        });

        await asyncForEach(contents, async (contentData, i) => {
            if (!contentData) {
                return;
            }

            let id = createNodeId(`HubspotBlogPostContent-${p.id}-${i}`);

            await createNode({
                ...contentData,
                id,
                parent: null,
                children: [],
                internal: {
                    type: 'HubspotBlogPostContent',
                    content: JSON.stringify(contentData),
                    contentDigest: createContentDigest(contentData)
                }
            });

            content___NODE.push(id);
        });

        if (!summary && p.post_summary) {
            summary = getTextWithoutAnyWrapper(p.post_summary);
        }
        
        let description = getTextWithoutBreaklines(p.meta_description);
        if (!description) {
            description = summary ? summary : null;
        } else if (!summary) {
            summary = description;
        }

        const publishDate = new Date(p.publish_date || p.updated);
        const slugParts = p.slug.split('/').filter(i => !!i);
        
        const postData = {
            hubspotId: `${p.id}`,
            title: p.title,
            titleDetail: postDetailTitle ? postDetailTitle : p.title,
            slug: slugParts?.length ? slugParts[slugParts.length - 1] : p.slug,
            description,
            language: p.parent_blog.language,
            date: `${publishDate.getFullYear()}-${("0" + (publishDate.getMonth() + 1)).slice(-2)}-${("0" + publishDate.getDate()).slice(-2)}`,
            featuredImageUrl: p.featured_image || null,
            summary,
            content___NODE,
            authorHubspotId: p.blog_post_author?.id ? `${p.blog_post_author.id}` : null,
            topicsHubspotId: p.topic_ids?.length ? p.topic_ids.map(t => `${t}`) : [],
            noIndex: p.head_html && p.head_html.indexOf('noindex') !== -1 ? true : false,
            tableOfContents
        }

        await createNode({
			...postData,
			id: createNodeId(`HubspotBlogPost-${p.id}`),
			parent: null,
			children: [],
			internal: {
				type: 'HubspotBlogPost',
				content: JSON.stringify(postData),
				contentDigest: createContentDigest(postData)
			}
		});
    });
}

exports.createHubspotBlogResolvers = function(defaultThemeOptions) {
    const { language, pathsByLanguage, primaryLanguage } = defaultThemeOptions;
    const { HubspotBlogPost, HubspotBlogAuthor, HubspotBlogTopic } = pathsByLanguage;
    
    return {
        HubspotBlogPost: {
            slug: {
                type: 'String',
                resolve: (source, args, context, info) => {
                    return [
                        source.language && language[source.language] ? language[source.language] : null,
                        source.language && HubspotBlogPost && HubspotBlogPost[source.language] ? HubspotBlogPost[source.language] : null,
                        source.slug
                    ].filter(i => !!i).join('/');
                }
            }
        },
        HubspotBlogAuthor: {
            slug: {
                type: 'String',
                resolve: (source, args, context, info) => {
                    return [
                        language[primaryLanguage] ? language[primaryLanguage] : null,
                        HubspotBlogAuthor && HubspotBlogAuthor[primaryLanguage] ? HubspotBlogAuthor[primaryLanguage] : null,
                        source.slug
                    ].filter(i => !!i).join('/');
                }
            }
        },
        HubspotBlogTopic: {
            slug: {
                type: 'String',
                resolve: (source, args, context, info) => {
                    return [
                        language[primaryLanguage] ? language[primaryLanguage] : null,
                        HubspotBlogTopic && HubspotBlogTopic[primaryLanguage] ? HubspotBlogTopic[primaryLanguage] : null,
                        source.slug
                    ].filter(i => !!i).join('/');
                }
            }
        }
    }
}