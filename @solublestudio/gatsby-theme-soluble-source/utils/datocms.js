const path = require(`path`)
const { getTextWithoutAnyWrapper } = require("./marked")
const { asyncForEach } = require("./index")

const { datocmspages: datoPagesQuery } = require("../data/query")

const resolveDatoSlug = async (language, pageNode, itemModel = "", getNode) => {
  let value = []

  if (language[pageNode.locale]) {
    value.push(language[pageNode.locale])
  }

  if (pageNode.entityPayload.attributes.parent_id && getNode) {
    let parentSlugs = []

    let parentIdParts = pageNode.id.split("-")
    parentIdParts[1] = pageNode.entityPayload.attributes.parent_id

    let parentPage = await getNode(parentIdParts.join("-"))

    while (parentPage) {
      parentSlugs.push(
        parentPage.entityPayload.attributes.slug[parentPage.locale]
      )

      if (parentPage.entityPayload.attributes.parent_id && getNode) {
        parentIdParts[1] = parentPage.entityPayload.attributes.parent_id
        parentPage = await getNode(parentIdParts.join("-"))
      } else {
        parentPage = null
      }
    }

    if (parentSlugs.length) {
      value = [...value, ...parentSlugs.reverse()]
    }
  }

  if (itemModel) {
    const slugModel =
      typeof itemModel === "object" ? itemModel[pageNode.locale] : itemModel
    value.push(slugModel)
  }

  if (pageNode.entityPayload.attributes.slug[pageNode.locale] !== "_") {
    value.push(pageNode.entityPayload.attributes.slug[pageNode.locale])
  }

  return value.join("/")
}

function createDatoTranslationNodes({
  actions,
  getNodesByType,
  createNodeId,
  createContentDigest,
}) {
  const { createNode } = actions

  const translations = getNodesByType("DatoCmsTranslation")

  if (!translations || !translations.length) {
    return
  }

  translations.forEach((node) => {
    const html = node.entityPayload.attributes.text[node.locale] || ""

    const fieldsData = {
      key: node.entityPayload.attributes.key,
      language: node.locale,
      text: getTextWithoutAnyWrapper(html),
      html,
    }

    createNode({
      ...fieldsData,
      id: createNodeId(`translation-${node.locale}-${node.id}`),
      parent: null,
      children: [],
      internal: {
        type: "Translation",
        content: JSON.stringify(fieldsData),
        contentDigest: createContentDigest(fieldsData),
      },
    })
  })
}

const getDatoTranslatedItem = (node, field) => {
  if (
    !node?.entityPayload?.attributes ||
    !node?.entityPayload?.attributes[field]
  ) {
    return null
  }

  if (typeof node.entityPayload.attributes[field] === "object") {
    return node.entityPayload.attributes[field][node.locale]
  }

  return node.entityPayload.attributes[field]
}

const filterMenuNodes = (nodes, parent_id = null, locale = null) =>
  nodes
    .filter(
      (n) =>
        n.entityPayload.attributes.parent_id == parent_id &&
        (!locale || locale === n.locale)
    )
    .sort(
      (a, b) =>
        a.entityPayload.attributes.position -
        b.entityPayload.attributes.position
    )

function createDatoMenu(
  {
    actions,
    createNodeId,
    createContentDigest,
    getNodesByType,
    getAllNodes,
    getNode,
  },
  defaultThemeOptions,
  modelPages
) {
  const { createNode } = actions
  const { language, pathsByLanguage, ...props } = defaultThemeOptions

  const generateLinks = (typeDato, typeLink) => {
    let nodes = getNodesByType(typeDato)

    const createSingleLink = async (item, parentId = null) => {
      let page = null
      let slug = null

      if (item.entityPayload.attributes.link) {
        await asyncForEach(modelPages, async (model) => {
          if (page) {
            return
          }

          page = await getNode(
            `DatoCms${model}-${item.entityPayload.attributes.link}-${item.locale}`
          )
        })

        if (page) {
          let model = page.internal.type.replace("DatoCms", "")
          let slugModel = pathsByLanguage[model]
            ? pathsByLanguage[model]
            : pathsByLanguage[model.toLowerCase()]
            ? pathsByLanguage[model.toLowerCase()]
            : ""

          slug = await resolveDatoSlug(language, page, slugModel, getNode)
        }
      } else {
        slug = getDatoTranslatedItem(item, "external_link")
      }

      const fieldsData = {
        templateKey: `_link-${typeLink}`,
        language: item.locale,
        order: item.entityPayload.attributes.position,
        slug,
        label: getDatoTranslatedItem(item, "label"),
        description: getDatoTranslatedItem(item, "description"),
        type: item.entityPayload.attributes.is_button ? "button" : "",
        column:
          typeof item.entityPayload.attributes.column === "undefined"
            ? null
            : item.entityPayload.attributes.column,
        openInNewWindow: getDatoTranslatedItem(item, "open_in_new_window"),
        showInPages: "-",
        parentId,
        //showInPages: item.showInPages___NODE && item.showInPages___NODE.length ? item.showInPages___NODE.join(',') : '-',
      }

      await createNode({
        ...fieldsData,
        id: item.id,
        parent: null,
        children: [],
        internal: {
          type: "Link",
          content: JSON.stringify(fieldsData),
          contentDigest: createContentDigest(fieldsData),
        },
      })
    }

    filterMenuNodes(nodes).forEach((item) => {
      let id = createNodeId(`link-${typeLink}-${item.id}`)
      createSingleLink({ ...item, id })

      filterMenuNodes(nodes, item.entityPayload.id, item.locale).forEach(
        (subitem) => {
          createSingleLink(
            {
              ...subitem,
              id: createNodeId(`link-${typeLink}-${subitem.id}`),
            },
            id
          )
        }
      )
    })
  }

  generateLinks("DatoCmsHeader", "header")
  generateLinks("DatoCmsFooter", "footer")
}

const createDatoPages = async (
  { actions, graphql },
  defaultThemeOptions,
  themeOptions,
  url,
  getTemplate,
  mainFallbackSeo,
  dataUrl
) => {
  const {
    templatesPath,
    primaryLanguage,
    language,
    pathsByLanguage,
  } = defaultThemeOptions
  const {
    modelPages = ["Page"],
    modelsPagination = {},
    redirects = false,
  } = themeOptions.datocms
  const { createPage, createRedirect } = actions

  const modelsPaginationKeys = Object.keys(modelsPagination)

  const dataDatoCms = await graphql(
    datoPagesQuery(modelPages, modelsPaginationKeys, redirects)
  )

  const fallbackSeo =
    dataDatoCms.data.datoCmsSite.globalSeo &&
    dataDatoCms.data.datoCmsSite.globalSeo.fallbackSeo

  const titleSuffix =
    dataDatoCms.data.datoCmsSite.globalSeo &&
    dataDatoCms.data.datoCmsSite.globalSeo.titleSuffix

  if (fallbackSeo) {
    mainFallbackSeo = {
      ...fallbackSeo,
      titleSuffix,
    }
  }

  const generatePage = (model) => {
    const pages = dataDatoCms.data[`allDatoCms${model}`].edges

    const getPageSlug = (slug, defaultValue = "") =>
      !!slug && slug !== "/" ? `${slug}/` : defaultValue

    pages.forEach((edge) => {
      let alternateLanguages = []

      edge.node._otherSlugLocales.forEach((item) => {
        if (typeof language[item.locale] !== "undefined") {
          alternateLanguages.push({
            language: item.locale,
            slug: getPageSlug(item.value),
          })
        }
      })

      if (alternateLanguages?.length) {
        alternateLanguages.push({
          language: edge.node.locale,
          slug: getPageSlug(edge.node.slug),
        })
      }

      const seo = {
        title: edge?.node?.seo?.title || fallbackSeo?.title || "",
        description:
          edge?.node?.seo?.description || fallbackSeo?.description || "",
        image: edge?.node?.seo?.image?.file || fallbackSeo?.image?.file || null,
        noIndex: edge.node.noindex,
        removeSuffix: edge.node.removesuffix,
        alternateLanguages,
        ...(titleSuffix && { titleSuffix }),
      }

      const headerItems = dataUrl.data.header.group
        .map((group) =>
          group.edges
            .filter(
              ({ node }) =>
                node.language === (edge.node.locale || primaryLanguage) &&
                node.showInPages &&
                node.showInPages.includes(edge.node.id)
            )
            .map(({ node }) => {
              let data = {
                ...node,
              }

              delete data.language
              delete data.showInPages

              return data
            })
        )
        .filter((group) => !!group.length)

      createPage({
        path: getPageSlug(edge.node.slug, "/"),
        component: getTemplate(
          path.resolve(`${templatesPath}/${edge.node.templateKey}.js`)
        ),
        context: {
          id: edge.node.id,
          url,
          pageUrl: `${url}${getPageSlug(edge.node.slug)}`,
          language: edge.node.locale || primaryLanguage,
          seo,
          headerItems,
        },
      })
    })
  }

  modelPages.forEach((model) => {
    generatePage(model)
  })

  if (modelsPaginationKeys.length) {
    modelsPaginationKeys.forEach((model) => {
      const { templateKey, pagination } = themeOptions.datocms.modelsPagination[
        model
      ]

      const pathLanguageKey = `${model}PaginationPage`

      const perPage = pagination.perPage || 6
      const firstPageItems = pagination.firstPageItems || perPage

      Object.keys(language).forEach((lang) => {
        const items = dataDatoCms.data[`modelPagination${model}`].edges.filter(
          (edge) => edge.node.locale === lang
        )

        if (items?.length > firstPageItems) {
          let slugBase = `${language[lang]}${language[lang] ? "/" : ""}`

          slugBase = slugBase.concat(
            pathsByLanguage[pathLanguageKey]?.[lang] ??
              `${model.toLowerCase()}/page`
          )

          let pageNr = Math.ceil((items.length - firstPageItems) / perPage) + 1

          const numPages = pageNr

          let isLastPage = true

          while (pageNr > 1) {
            const pageSlug = `${slugBase}/${pageNr}/`
            const skip = (pageNr - 2) * perPage + firstPageItems
            const itemsByPage = items.slice(skip, skip + perPage)

            const seo = {
              title: `${pageNr}`,
              description: fallbackSeo.description
                ? fallbackSeo.description
                : "",
              image: fallbackSeo?.image?.file ? fallbackSeo.image.file : null,
              noIndex: false,
              removeSuffix: false,
              ...(fallbackSeo.titleSuffix && {
                titleSuffix: fallbackSeo.titleSuffix,
              }),
            }

            createPage({
              path: pageSlug,
              component: getTemplate(
                path.resolve(`${templatesPath}/${templateKey}.js`)
              ),
              context: {
                url,
                slugBase,
                pageUrl: `${url}${pageSlug}`,
                language: lang,
                perPage,
                firstPageItems,
                modelIds: itemsByPage.map((edge) => edge.node.id),
                numPages,
                pageNr,
                pageNrString: `${pageNr}`,
                isLastPage,
                seo,
              },
            })

            isLastPage = false
            pageNr--
          }
        }
      })
    })
  }

  const redirectsNodes = dataDatoCms.data["allDatoCmsRedirect"]?.edges ?? []

  if (redirectsNodes?.length > 0) {
    let redirectItems = {}
    redirectsNodes
      .filter(({ node }) => node?.fromPath && node?.toPath)
      .forEach(({ node }) => {
        redirectItems[node.fromPath] = {
          ...node,
        }
      })

    Object.values(redirectItems).forEach((item) => {
      createRedirect({
        fromPath: item.fromPath,
        toPath: item.toPath,
        isPermanent: item?.permanent ?? true,
      })
    })
  }
}

const getContextByTemplate = async (context, language = "en", template) => {
  try {
    const sitePages = await context.nodeModel.runQuery({
      query: {
        filter: {
          component: { regex: `/(.*)\\/${template}/` },
          context: {
            language: { eq: language },
          },
        },
      },
      type: "SitePage",
    })

    if (!sitePages?.length) {
      return ""
    }

    return sitePages[0]?.context
  } catch (error) {
    console.log(error)
  }
}

const getParentPage = async (source, args, context, info) => {
  if (args.type) {
    const sections = await context.nodeModel.runQuery({
      query: {
        filter: {
          locale: { eq: args.locale },
        },
      },
      type: args.type,
    })

    if (!sections?.length) {
      return null
    }

    const sectionsIds = sections.map((s) => s.entityPayload.id)

    const pages = await context.nodeModel.runQuery({
      query: {
        filter: {
          locale: { eq: args.locale },
        },
      },
      type: "DatoCmsPage",
    })

    const parentPage = pages.find((p) => {
      const sectionsAttribute =
        p?.entityPayload?.attributes?.sections[args.locale] ?? []

      return sectionsAttribute?.length
        ? !!sectionsAttribute.find(
            (sectionId) => sectionsIds.indexOf(sectionId) !== -1
          )
        : false
    })

    return parentPage ? parentPage : null
  }
  return null
}

const getResolversByModelPagination = (
  model,
  { sectionKey, templateKey, pagination, itemsKey }
) => {
  const { firstPageItems } = pagination

  const PREFIX = "DatoCms"

  const MODEL_KEY = `${PREFIX}${model}`

  const MODEL_SECTION_KEY = sectionKey
    ? `${PREFIX}${sectionKey}`
    : `${MODEL_KEY}Section`

  const ITEMS_KEY = itemsKey ?? "items"

  return {
    [MODEL_SECTION_KEY]: {
      [ITEMS_KEY]: {
        type: [MODEL_KEY],
        resolve: async (source, args, context, info) => {
          try {
            const items = await context.nodeModel.runQuery({
              query: {
                filter: {
                  locale: { eq: source.locale },
                },
              },
              type: MODEL_KEY,
            })

            let itemsOrdered = items
              .filter((i) => {
                if (typeof i.entityPayload.attributes.slug === "undefined") {
                  return true
                }
                return !!i.entityPayload.attributes.slug[source.locale]
              })
              .map((item) => ({
                date: Date.parse(item.entityPayload.meta.first_published_at),
                item,
              }))

            itemsOrdered.sort((a, b) =>
              a.date < b.date ? -1 : a.date > b.date ? 1 : 0
            )

            return itemsOrdered?.length
              ? itemsOrdered
                  .reverse()
                  .splice(0, firstPageItems)
                  .map((item) => item.item)
              : []
          } catch (error) {
            return []
          }
        },
      },
      numPages: {
        type: "Int",
        resolve: async (source, args, context, info) => {
          try {
            const contextPage = await getContextByTemplate(
              context,
              source.locale,
              templateKey
            )

            if (!contextPage) {
              return 0
            }

            return contextPage?.numPages
          } catch (error) {
            return 0
          }
        },
      },
      pathChild: {
        type: "String",
        resolve: async (source, args, context, info) => {
          try {
            const contextPage = await getContextByTemplate(
              context,
              source.locale,
              templateKey
            )

            if (!contextPage) {
              return ""
            }

            return contextPage?.slugBase
          } catch (error) {
            return ""
          }
        },
      },
    },
  }
}

const resolversDatoCms = {
  getParentPage,
  resolveDatoSlug,
  getContextByTemplate,
  getResolversByModelPagination,
}

module.exports = {
  createDatoPages,
  createDatoTranslationNodes,
  createDatoMenu,
  resolversDatoCms,
}
