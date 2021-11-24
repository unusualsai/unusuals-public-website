const {
  resolversDatoCms,
} = require("@solublestudio/gatsby-theme-soluble-source/utils/datocms")

function compareDatoPositions(a, b) {
  if (
    a.entityPayload.attributes.position < b.entityPayload.attributes.position
  ) {
    return -1
  }
  if (
    a.entityPayload.attributes.position > b.entityPayload.attributes.position
  ) {
    return 1
  }

  return 0
}

function compareDatoFirstPublishedAt(a, b) {
  const aDate = new Date(a.entityPayload.meta.first_published_at)
  const bDate = new Date(b.entityPayload.meta.first_published_at)

  return aDate - bDate
}

function compareDatoTitle(a, b) {
  const aTitle = a.entityPayload.attributes.title[a.locale]
  const bTitle = b.entityPayload.attributes.title[b.locale]

  if (aTitle > bTitle) {
    return 1
  }

  if (aTitle < bTitle) {
    return -1
  }

  return 0
}

const getPostsResolver = (type, limit, order) => ({
  type: `[${type}]`,
  resolve: async (source, args, context, info) => {
    let posts = await context.nodeModel.runQuery({
      query: {
        filter: {
          locale: { eq: source.locale },
          slug: { ne: null },
        },
        // ...(order && {
        //   sort: {
        //     fields: ["meta__published_at"],
        //     order: [order],
        //   },
        // }),
      },
      type,
    })

    return posts?.length > 0 ? posts.slice(0, limit) : []
  },
})

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    DatoCmsIndustry: {
      readMoreCta: {
        type: `DatoCmsButton`,
        resolve: async (source, args, context, info) => {
          try {
            const page = await resolversDatoCms.getParentPage(
              source,
              {
                locale: source.locale,
                type: "DatoCmsIndustriesDetailedSection",
              },
              context,
              info
            )

            const label = await context.nodeModel.runQuery({
              query: {
                filter: {
                  locale: { eq: source.locale },
                  key: { eq: "read-more" },
                },
              },
              type: "DatoCmsTranslation",
              firstOnly: true,
            })

            const button = await context.nodeModel.runQuery({
              query: {
                filter: {
                  locale: { eq: source.locale },
                },
              },
              type: "DatoCmsButton",
              firstOnly: true,
            })

            return {
              ...button,
              entityPayload: {
                ...button.entityPayload,
                attributes: {
                  ...button.entityPayload.attributes,
                  external_link: {
                    [source.locale]: `/${
                      page?.entityPayload?.attributes?.slug[source.locale]
                    }/#${
                      source?.entityPayload?.attributes?.slug[source.locale]
                    }`,
                  },
                  label: {
                    [source.locale]:
                      label?.entityPayload?.attributes?.text[source.locale],
                  },
                },
              },
            }
          } catch (error) {
            console.log(error)
            return null
          }
        },
      },
    },
    DatoCmsOpenPositionSection: {
      openPositions: {
        type: `[DatoCmsOpenPosition]`,
        resolve: async (source, args, context, info) => {
          let openPositions = await context.nodeModel.runQuery({
            query: {
              filter: {
                locale: { eq: source.locale },
              },
            },
            type: "DatoCmsOpenPosition",
          })

          if (source.entityPayload.attributes.open_positions?.length) {
            return source.entityPayload.attributes.open_positions
              .map((id) => {
                return openPositions.find((cs) => cs.entityPayload.id === id)
              })
              .filter((cs) => !!cs)
          }

          return openPositions.sort(compareDatoPositions)
        },
      },
    },
    DatoCmsOpenPosition: {
      tags: {
        type: `[String]`,
        resolve: async (source, args, context, info) => {
          if (source.entityPayload.attributes.subtitle[source.locale]) {
            return source.entityPayload.attributes.subtitle[source.locale]
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => !!tag)
          }

          return []
        },
      },
    },
    DatoCmsBlogPostsSection: {
      categories: {
        type: `[DatoCmsCategory]`,
        resolve: async (source, args, context, info) => {
          try {
            const categories = await context.nodeModel.runQuery({
              query: {
                filter: {
                  locale: { eq: source.locale },
                },
              },
              type: "DatoCmsCategory",
            })

            return categories ? categories.sort(compareDatoTitle) : []
          } catch (e) {
            console.log(e)
          }

          return []
        },
      },
    },
    DatoCmsBlog: {
      categoriesString: {
        type: "String",
        resolve: async (source, args, context, info) => {
          try {
            const attributes = source?.entityPayload?.attributes

            const categories = await context.nodeModel.runQuery({
              query: {
                filter: {
                  originalId: { in: attributes?.categories },
                },
              },
              type: "DatoCmsCategory",
            })

            if (!categories?.length) {
              return ""
            }

            const categoriesString = categories
              .filter((category) => category?.locale === source?.locale)
              .sort(compareDatoTitle)
              .map(
                (category) =>
                  category.entityPayload?.attributes?.title[source?.locale]
              )

            return categoriesString?.length > 0
              ? categoriesString.join(", ")
              : ""
          } catch (e) {
            console.log(e)
            return ""
          }
        },
      },
      related: {
        type: `[DatoCmsBlog]`,
        resolve: async (source, args, context, info) => {
          try {
            const related = await context.nodeModel.runQuery({
              query: {
                filter: {
                  locale: { eq: source.locale },
                  id: { ne: source.id },
                },
              },
              type: "DatoCmsBlog",
            })

            return related
              ? related.sort(compareDatoFirstPublishedAt).reverse().slice(0, 3)
              : []
          } catch (e) {
            console.log(e)
          }

          return []
        },
      },
    },
    DatoCmsOurLatestPostsSection: {
      posts: getPostsResolver("DatoCmsBlog", 3, "DESC"),
    },
  }

  createResolvers(resolvers)
}
