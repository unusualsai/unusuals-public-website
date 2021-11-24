const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const Debug = require(`debug`)
const Entities = require("html-entities").AllHtmlEntities

const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem")

const {
  getMarkedText,
  getMarkedTextWithoutWrapper,
  getTextWithoutWrapper,
  getTextWithoutAnyWrapper,
} = require("./utils/marked")

const debug = Debug(`@solublestudio/gatsby-theme-soluble-source`)
const withDefaults = require(`./utils/default-options`)
const https = require("https")

/*
const {
  createWordpressTranslationNodes,
  createWordpressPages,
  createWordpressResolvers,
  createWordpressMenu,
} = require("./utils/wordpress")
*/
const {
  createWordpressGraphqlTranslationNodes,
  createWordpressGraphqlPages,
  createWordpressGraphqlResolvers,
  createWordpressGraphqlMenu,
} = require("./utils/wordpressGraphql")

const {
  createDatoTranslationNodes,
  createDatoMenu,
  resolversDatoCms,
  createDatoPages,
} = require("./utils/datocms")

const {
  createHubspotBlogNodes,
  createHubspotBlogPages,
  getHubspotBlogTypes,
  onHubspotBlogCreateNode,
  createHubspotBlogResolvers,
} = require("./utils/hubspotBlog")

const { asyncForEach, getTemplate } = require("./utils")

//Queries
const { local: localQuery, airtable: airtableQuery } = require("./data/query")

const entities = new Entities()

exports.onPreBootstrap = async ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath, assetPath } = withDefaults(themeOptions)
  const { local = true } = themeOptions

  const dirs = [path.join(program.directory, assetPath)]

  if (local) {
    dirs.push(path.join(program.directory, contentPath))
  }

  dirs.forEach((dir) => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

exports.createPages = async (props, themeOptions) => {
  const { actions, graphql } = props
  const { createPage } = actions

  const defaultThemeOptions = withDefaults(themeOptions)
  const { templatesPath, primaryLanguage, language } = defaultThemeOptions

  let mainFallbackSeo = {}

  const dataUrl = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      header: allLink(
        filter: {
          templateKey: { eq: "_link-header" }
          showInPages: { ne: "-" }
        }
        sort: { fields: order, order: ASC }
      ) {
        group(field: column) {
          edges {
            node {
              slug
              type
              order
              label
              language
              column
              showInPages
              openInNewWindow
            }
          }
        }
      }
    }
  `)

  let url = dataUrl.data.site.siteMetadata.siteUrl
    ? dataUrl.data.site.siteMetadata.siteUrl.trim()
    : ""

  if (url.slice(-1) !== "/") {
    url += "/"
  }

  if (themeOptions.local) {
    const dataLocal = await graphql(localQuery(themeOptions.mdx))

    const pages = dataLocal.data.local.edges

    const getPageSlug = (slug, defaultValue = "") =>
      !!slug ? `${slug}/` : defaultValue

    pages.forEach((edge) => {
      let alternateLanguages = []

      if (edge.node.fields && edge.node.fields.alternateLanguages) {
        alternateLanguages = edge.node.fields.alternateLanguages.map(
          (lang) => ({
            language: lang.frontmatter.language,
            slug: getPageSlug(lang.fields.slug),
          })
        )
      }

      const seo = {
        ...edge.node.frontmatter.seo,
        alternateLanguages,
      }

      createPage({
        path: getPageSlug(edge.node.fields.slug, "/"),
        component: getTemplate(
          path.resolve(
            `${templatesPath}/${edge.node.frontmatter.templateKey}.js`
          )
        ),
        context: {
          id: edge.node.id,
          url,
          pageUrl: `${url}${getPageSlug(edge.node.fields.slug)}`,
          language: edge.node.frontmatter.language || primaryLanguage,
          name: edge.node.frontmatter.templateKey,
          seo,
        },
      })
    })
  }

  if (themeOptions.airtable) {
    const dataAirtable = await graphql(airtableQuery)

    const pages = dataAirtable.data.allAirtable.edges

    const getPageSlug = (slug, defaultValue = "") =>
      !!slug && slug !== "_" && slug !== "-" ? `${slug}/` : defaultValue

    pages.forEach((edge) => {
      let alternateLanguages = []

      if (edge.node.fields && edge.node.fields.alternateLanguages) {
        alternateLanguages = edge.node.fields.alternateLanguages.map(
          (lang) => ({
            language: lang.data.language,
            slug: getPageSlug(lang.fields.slug),
          })
        )
      }

      const seo = {
        title: edge.node.data.seoTitle,
        description: edge.node.data.seoDescription,
        image: edge.node.data.seoImage
          ? edge.node.data.seoImage.localFiles[0]
          : null,
        noIndex: edge.node.data.noIndex,
        removeSuffix: edge.node.data.removeSuffix,
        alternateLanguages,
      }

      createPage({
        path: getPageSlug(edge.node.fields.slug, "/"),
        component: getTemplate(
          path.resolve(`${templatesPath}/${edge.node.data.templateKey}.js`)
        ),
        context: {
          id: edge.node.id,
          url,
          pageUrl: `${url}${getPageSlug(edge.node.fields.slug)}`,
          language: edge.node.data.language || primaryLanguage,
          seo,
        },
      })
    })
  }

  if (themeOptions.datocms) {
    await createDatoPages(
      props,
      defaultThemeOptions,
      themeOptions,
      url,
      getTemplate,
      mainFallbackSeo,
      dataUrl
    )
  }
  /*
  if (themeOptions.wordpress) {
    await createWordpressPages(
      props,
      defaultThemeOptions,
      themeOptions,
      url,
      getTemplate
    )
  }
*/
  if (themeOptions.wordpressGraphql) {
    await createWordpressGraphqlPages(
      props,
      defaultThemeOptions,
      themeOptions,
      url,
      getTemplate
    )
  }

  if (themeOptions.hubspotBlog) {
    try {
      await createHubspotBlogPages(
        props,
        defaultThemeOptions,
        themeOptions,
        url,
        getTemplate,
        mainFallbackSeo
      )
    } catch (e) {
      console.log("ERROR", e)
    }
  }
}

const translationFields = (content, language) => {
  return {
    data: {
      key: content.key,
      language: language,
      text: content[language],
      md: getMarkedText(content[language]),
    },
  }
}

const markdownLinkFields = (node, link, iLink, iCol = 0) => {
  return {
    data: {
      templateKey: node.frontmatter.templateKey,
      language: node.frontmatter.language,
      order: iLink + 1,
      slug: link.slug || "/",
      label: link.label,
      type: link.type === "normal" ? "" : link.type,
      ...(iCol && { column: iCol }),
    },
  }
}

exports.onCreateNode = async (
  { node, actions, store, cache, createNodeId, createContentDigest, getNode },
  themeOptions
) => {
  const { createNode, createNodeField } = actions
  const { primaryLanguage, language, pathsByLanguage } = withDefaults(
    themeOptions
  )

  if (themeOptions.local && node.internal.type === `MarkdownRemark`) {
    // Create Translate Nodes local
    if (node.frontmatter.templateKey === "_translation") {
      Object.keys(language).forEach((language) => {
        if (node.frontmatter[language]) {
          const fieldsData = translationFields(node.frontmatter, language)

          createNode({
            ...fieldsData,
            id: createNodeId(`translation-${language}-${node.frontmatter.key}`),
            parent: null,
            children: [],
            internal: {
              type: "Translation",
              content: JSON.stringify(fieldsData),
              contentDigest: createContentDigest(fieldsData),
            },
          })
        }
      })
    } else if (node.frontmatter.templateKey === "_link-header") {
      Object.values(node.frontmatter.links).forEach((link, i) => {
        const fieldsData = markdownLinkFields(node, link, i)

        createNode({
          ...fieldsData,
          id: createNodeId(`link-${node.id}-${i}`),
          parent: null,
          children: [],
          internal: {
            type: "Link",
            content: JSON.stringify(fieldsData),
            contentDigest: createContentDigest(fieldsData),
          },
        })
      })
    } else if (node.frontmatter.templateKey === "_link-footer") {
      Object.values(node.frontmatter.cols).forEach((col, iCol) => {
        Object.values(col.links).forEach((link, iLink) => {
          const fieldsData = markdownLinkFields(node, link, iLink, iCol + 1)

          createNode({
            ...fieldsData,
            id: createNodeId(`link-${node.id}-${iCol + 1}-${iLink}`),
            parent: null,
            children: [],
            internal: {
              type: "Link",
              content: JSON.stringify(fieldsData),
              contentDigest: createContentDigest(fieldsData),
            },
          })
        })
      })
    } else {
      // Add Slug Field Markdown Remark
      if (node.frontmatter.slug) {
        let path = createFilePath({ node, getNode })

        const route = path.split("/")
        if (route.length > 3 && pathsByLanguage[route[1]]) {
          route[1] = pathsByLanguage[route[1]][node.frontmatter.language]
        }
        route[0] =
          language[node.frontmatter.language] || language[primaryLanguage] || ""
        if (!route[0]) {
          route.shift()
        }
        route[route.length - 2] = node.frontmatter.slug

        route.pop()
        const value = route.join("/")

        createNodeField({
          name: `slug`,
          node,
          value,
        })
      }
    }
  } else if (themeOptions.airtable && node.internal.type === `Airtable`) {
    // Create Translate Nodes Airtable
    if (node.data.templateKey === "_translation") {
      Object.keys(language).forEach((language) => {
        if (node.data[language]) {
          const fieldsData = translationFields(node.data, language)

          createNode({
            ...fieldsData,
            id: createNodeId(`translation-${language}-${node.data.key}`),
            parent: null,
            children: [],
            internal: {
              type: "Translation",
              content: JSON.stringify(fieldsData),
              contentDigest: createContentDigest(fieldsData),
            },
          })
        }
      })
    }

    // Add Slug Field Airtable
    if (node.data.slug) {
      const nodeTablePath = pathsByLanguage[node.table]
        ? [pathsByLanguage[node.table][node.data.language]]
        : []

      const route = [
        language[primaryLanguage],
        ...nodeTablePath,
        node.data.slug,
      ]

      if (node.data.language) {
        route[0] = language[node.data.language]
      }
      if (!route[0]) {
        route.shift()
      }
      const value = route.join("/")

      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }

    // Create alternates from Airtable
    if (node.data.alternateLanguages___NODE) {
      const alternates = [node.id, ...node.data["alternateLanguages___NODE"]]
      alternates.forEach((nodeId) => {
        let value = []
        let finalNode = node
        if (nodeId === node.id) {
          value = node.data["alternateLanguages___NODE"]
        } else {
          finalNode = getNode(nodeId)
          value = alternates.filter((element) => element !== nodeId)
        }

        createNodeField({
          name: `alternateLanguages`,
          node: finalNode,
          value,
        })
      })
    }
  } else if (themeOptions.datocms && node.internal.type === `DatoCmsAsset`) {
    let fileNode = await createRemoteFileNode({
      url: node.entityPayload.attributes.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })

    if (fileNode) {
      node.file = fileNode.id
    }
  }

  if (themeOptions.hubspotBlog) {
    await onHubspotBlogCreateNode(node, (url) =>
      createRemoteFileNode({
        url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      })
    )
  }
}

exports.sourceNodes = async (props, themeOptions) => {
  const defaultThemeOptions = withDefaults(themeOptions)

  /*
  if (themeOptions.wordpress) {
    createWordpressTranslationNodes(props)
  }
  */

  if (themeOptions.wordpressGraphql) {
    createWordpressGraphqlTranslationNodes(props)
    createWordpressGraphqlMenu(props, defaultThemeOptions, themeOptions)
  }

  if (themeOptions.datocms) {
    createDatoTranslationNodes(props)
    createDatoMenu(props, defaultThemeOptions, themeOptions.datocms.modelPages)
  }

  if (themeOptions.hubspotBlog) {
    await createHubspotBlogNodes(props, themeOptions)
  }
}

exports.resolvableExtensions = (props, themeOptions) => {
  const {
    actions,
    createNodeId,
    createContentDigest,
    getNodesByType,
    getNode,
  } = props
  const { createNode, createNodeField } = actions
  const defaultThemeOptions = withDefaults(themeOptions)

  if (themeOptions.local) {
    // Create alternateLanguages local
    const relationLabels = {}
    const localType = themeOptions.mdx ? "Mdx" : "MarkdownRemark"
    const mdNodes = getNodesByType(localType)
    const alternateNodes = mdNodes.filter(
      (node) => node.frontmatter.alternateLanguages
    )
    alternateNodes.forEach((node) => {
      relationLabels[node.frontmatter.templateKey] = [
        node.frontmatter.label,
        ...node.frontmatter.alternateLanguages,
      ]
    })

    Object.keys(relationLabels).forEach((templateKey) => {
      const templateNodes = mdNodes.filter(
        (node) => node.frontmatter.templateKey === templateKey
      )
      const alternateValuesNodes = templateNodes.filter((node) =>
        relationLabels[templateKey].includes(node.frontmatter.label)
      )

      alternateValuesNodes.forEach((altNode) => {
        const value = alternateValuesNodes.filter(
          (node) => node.id !== altNode.id
        )
        createNodeField({
          name: `alternateLanguages`,
          node: altNode,
          value,
        })
      })
    })
  }

  if (themeOptions.airtable) {
    // Create Links from Airtable
    const airtableNodes = getNodesByType("Airtable")
    const links = airtableNodes.filter(
      (item) =>
        item.data.templateKey && item.data.templateKey.startsWith("_link")
    )
    links.forEach(async (link) => {
      let pageNode = null
      if (link.data.Page___NODE) {
        pageNode = await getNode(link.data.Page___NODE[0])
      }

      const fieldsData = {
        data: {
          templateKey: link.data.templateKey,
          language: link.data.language,
          order: link.data.order,
          slug: pageNode ? pageNode.data.slug : link.data.external,
          label: link.data.label,
          type: link.data.type,
          ...(link.data.column && { column: link.data.column }),
        },
      }

      createNode({
        ...fieldsData,
        id: createNodeId(`link-${link.id}`),
        parent: null,
        children: [],
        internal: {
          type: "Link",
          content: JSON.stringify(fieldsData),
          contentDigest: createContentDigest(fieldsData),
        },
      })
    })
  }
  /*
  if (themeOptions.wordpress) {
    createWordpressMenu(props, defaultThemeOptions, themeOptions)
  }
*/
}

exports.createResolvers = ({ createResolvers }, themeOptions) => {
  const defaultThemeOptions = withDefaults(themeOptions)
  const { language, pathsByLanguage } = defaultThemeOptions
  const {
    airtable,
    datocms,
    // wordpress,
    wordpressGraphql,
    hubspotBlog,
  } = themeOptions

  let airtableResolvers = {}
  let datocmsResolvers = {}

  let query = {
    getTranslation: {
      type: `String`,
      args: {
        key: `String`,
        language: `String`,
        param: `String`,
      },
      resolve: async (source, args, context, info) => {
        if (!args.key && !args.language) {
          return ""
        }

        const translation = await context.nodeModel.runQuery({
          query: {
            filter: {
              language: {
                eq: args.language,
              },
              key: {
                eq: args.key,
              },
            },
          },
          type: "Translation",
        })

        const param = args.param || ""
        return translation?.length && translation[0].text
          ? translation[0].text.replace(/{.+}/g, param)
          : param
      },
    },
  }
  /*
  let wordpressResolvers = wordpress
    ? createWordpressResolvers(defaultThemeOptions, themeOptions)
    : {}
  */
  let wordpressGraphqlResolvers = wordpressGraphql
    ? createWordpressGraphqlResolvers(defaultThemeOptions, themeOptions)
    : {}
  let hubspotBlogResolvers = hubspotBlog
    ? createHubspotBlogResolvers(defaultThemeOptions)
    : {}

  if (airtable) {
    // Create alternateLanguages airtable
    airtableResolvers = {
      AirtableFields: {
        alternateLanguages: {
          type: ["Airtable"],
          resolve(source, args, context, info) {
            if (source.alternateLanguages) {
              return context.nodeModel.getNodesByIds({
                ids: source.alternateLanguages,
                type: "Airtable",
              })
            } else {
              return null
            }
          },
        },
      },
    }
  }

  if (datocms) {
    const { modelPages = ["Page"], modelsPagination = {} } = datocms

    const keyModelsPagination = Object.keys(modelsPagination) ?? []

    // Create slug and alternateLanguages DatoCms

    datocmsResolvers.DatoCmsTextNode = {
      contentWithoutWrapper: {
        type: `String`,
        resolve: (source) => {
          return source.internal.content
            ? getTextWithoutWrapper(source.internal.content)
            : ""
        },
      },
    }

    modelPages.forEach((model) => {
      let slugModel = pathsByLanguage[model]
        ? pathsByLanguage[model]
        : pathsByLanguage[model.toLowerCase()]
        ? pathsByLanguage[model.toLowerCase()]
        : ""

      datocmsResolvers[`DatoCms${model}`] = {
        slug: {
          type: "String",
          resolve: async (source, args, context, info) => {
            if (source?.entityPayload?.attributes?.slug) {
              if (source.entityPayload.attributes.slug[source.locale]) {
                const getNode = async (id) =>
                  context.nodeModel.getNodeById({
                    type: source.internal.type,
                    id,
                  })

                const slug = await resolversDatoCms.resolveDatoSlug(
                  language,
                  source,
                  slugModel,
                  getNode
                )

                return slug
              }
            }

            return null
          },
        },
        _otherSlugLocales: {
          type: `[SlugLocale]`,
          resolve: async (source, args, context, info) => {
            let values = []

            const getNode = async (id) =>
              context.nodeModel.getNodeById({
                type: source.internal.type,
                id,
              })

            if (
              source?.entityPayload?.attributes?.slug &&
              Object.keys(source.entityPayload.attributes.slug).length > 1
            ) {
              await asyncForEach(
                Object.keys(source.entityPayload.attributes.slug).filter(
                  (locale) => locale !== source.locale
                ),
                async (locale) => {
                  let thisItemPageId = source.id.replace(
                    `-${source.locale}`,
                    `-${locale}`
                  )

                  let thisPage = await getNode(thisItemPageId)

                  if (
                    thisPage &&
                    thisPage.entityPayload.attributes.slug[locale]
                  ) {
                    const value = await resolversDatoCms.resolveDatoSlug(
                      language,
                      thisPage,
                      slugModel,
                      getNode
                    )

                    values.push({
                      locale,
                      value,
                    })
                  }
                }
              )
            }

            return values
          },
        },
      }
    })

    if (keyModelsPagination?.length) {
      keyModelsPagination.forEach((model) => {
        const resolversModel =
          resolversDatoCms.getResolversByModelPagination(
            model,
            modelsPagination[model]
          ) ?? {}

        datocmsResolvers = {
          ...datocmsResolvers,
          ...resolversModel,
        }
      })
    }

    query.getParentPage = {
      type: `DatoCmsPage`,
      args: {
        locale: "String",
        type: "String",
      },
      resolve: resolversDatoCms.getParentPage,
    }

    const resolvesFile = (models) => {
      models.forEach((model) => {
        datocmsResolvers[model] = {
          file: {
            type: "File",
            resolve(source, args, context, info) {
              const file = context.nodeModel.getNodeById({
                type: "File",
                id: source.file,
              })
              return file
            },
          },
        }
      })
    }

    resolvesFile(["DatoCmsAsset", "DatoCmsFileField"])
  }

  const resolvers = {
    ...airtableResolvers,
    ...datocmsResolvers,
    ...wordpressGraphqlResolvers,
    ...hubspotBlogResolvers,
    MarkdownRemark: {
      html: {
        type: `String`,
        resolve: (source) =>
          getMarkedText(entities.decode(source.rawMarkdownBody)),
      },
      htmlWithoutWrapper: {
        type: `String`,
        resolve: (source) =>
          getMarkedTextWithoutWrapper(entities.decode(source.rawMarkdownBody)),
      },
    },
    Query: {
      ...query,
    },
    Link: {
      childLinks: {
        type: `[Link]`,
        resolve: async (source, args, context, info) => {
          const children = await context.nodeModel.runQuery({
            query: {
              filter: {
                language: {
                  eq: source.language,
                },
                parentId: {
                  eq: source.id,
                },
              },
              sort: {
                fields: ["order"],
                order: ["ASC"],
              },
            },
            type: "Link",
          })

          return children?.length ? children : []
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions }, themeOptions) => {
  const { createTypes, createFieldExtension } = actions
  const { local, airtable, datocms, hubspotBlog } = themeOptions

  if (local) {
    createFieldExtension({
      name: "md",
      args: {
        animate: {
          type: "Boolean!",
          defaultValue: false,
        },
      },
      extend: (options) => ({
        resolve(source, args, context, info) {
          if (source[info.fieldName]) {
            return getMarkedText(source[info.fieldName])
          }
          return null
        },
      }),
    })
  }

  if (datocms) {
    createFieldExtension({
      name: "textPlain",
      extend(options) {
        return {
          resolve(source, args, context, info) {
            if (source[info.fieldName]) {
              return getTextWithoutAnyWrapper(source[info.fieldName])
            }
            return null
          },
        }
      },
    })

    createFieldExtension({
      name: "textWithOutWrapper",
      extend(options) {
        return {
          resolve(source, args, context, info) {
            const payload = source.entityPayload.attributes

            if (payload && payload[info.fieldName]) {
              return getTextWithoutWrapper(
                payload[info.fieldName][source.locale]
              )
            }

            return "Not found field"
          },
        }
      },
    })
  }

  const typeDefs = `
    type Translation implements Node {
      key: String
      language: String
      text: String
      html: String
    }
    
    type Link implements Node {
      templateKey: String
      language: String
      order: Int
      column: Int
      type: String
      label: String
      description: String
      slug: String
      showInPages: String
      openInNewWindow: Boolean
      parentId: String
    }
	
    type SlugLocale implements Node {
      locale: String
      value: String
    }

    ${
      local
        ? `
      type MarkdownRemarkFields @infer {
        slug: String
        alternateLanguages: [MarkdownRemark]
      }

      type MarkdownRemarkFrontmatter @infer {
        templateKey: String
        seo: SeoMarkdown
        alternateLanguages: [String]
      }
  
      type SeoMarkdown {
        title: String,
        description: String,
        image: File @fileByRelativePath,
        noindex: Boolean,
        removeSuffix: Boolean,
      }
    `
        : ""
    }

    ${
      airtable
        ? `
      type AirtableFields {
        slug: String
        alternateLanguages: [Airtable]
      }
    `
        : ""
    }

    ${
      !datocms
        ? `
      type DatoCmsFluid {
        fix: String
      }
      type DatoCmsFixed {
        fix: String
      }
      type DatoCmsFaviconMetaTags {
        fix: String
      }
      type DatoCmsSeoMetaTags {
        fix: String
      }
    `
        : ""
    }

    ${hubspotBlog ? getHubspotBlogTypes() : ""}
  `

  createTypes(typeDefs)
}

exports.onPreExtractQueries = () => {
  if (process.env.DATOCMS_PREVIEW_NOTIFICATION_URL) {
    const options = new URL(process.env.DATOCMS_PREVIEW_NOTIFICATION_URL)
    const data = JSON.stringify({
      status: "success",
    })

    setTimeout(() => {
      const req = https.request({
        hostname: options.hostname,
        port: 443,
        path: options.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      })

      req.on("error", (error) => {
        console.log("Error notification to DatoCMS")
        console.log(error)
      })

      req.write(data)
      req.end()
    }, 20000)
  }
}
