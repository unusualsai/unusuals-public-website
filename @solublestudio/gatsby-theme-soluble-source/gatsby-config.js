const path = require("path")
const withDefaults = require(`./utils/default-options`)
const { remarkOptions, remarkLocalOptions } = require("./data/options")

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)

  const {
    local = true,
    airtable = null,
    datocms = null,
    mdx,
    wordpressGraphql = null,
    hosting,
  } = themeOptions

  return {
    siteMetadata: {
      title: "Soluble Theme Source",
      author: "Soluble Studio",
      description: "Source built by Soluble Team",
      siteUrl: "",
      suffix: "",
    },
    plugins: [
      "gatsby-plugin-react-helmet",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: options.assetPath,
          name: "assets",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "src/img",
          name: "img",
        },
      },
      {
        resolve: "gatsby-plugin-robots-txt",
        options: {
          policy: [
            { userAgent: "*", disallow: process.env.NO_INDEX ? "/" : "" },
          ],
        },
      },
      ...(!!hosting
        ? [
            {
              resolve: `gatsby-plugin-${hosting}`,
              options: {
                headers: {},
              },
            },
          ]
        : []),
      ...(datocms
        ? [
            {
              resolve: `gatsby-source-datocms`,
              options: datocms,
            },
          ]
        : []),
      ...(airtable
        ? [
            {
              resolve: `gatsby-source-airtable`,
              options: airtable,
            },
          ]
        : []),
      /*
            ...(wordpress ? [{
                resolve: 'gatsby-source-wordpress',
                options: {
                    ...wordpress,
                    normalizer: function ({ entities }) {
                        // TODO: Add acf object in case acf doesn't exist? Here we can manipulate lots of things. IE Removing medias unused.

                        return entities.map(entity => {
                            if (entity.yoast_meta) {
                                entity.yoast_meta = entity.yoast_meta.map(meta => {
                                    if (meta.content) {
                                        meta.cont = meta.content;
                                        delete meta.content;
                                    }

                                    return meta;
                                });
                            }

                            return entity;
                        });
                    },
                }
            }] : []),
            */
      ...(wordpressGraphql
        ? [
            {
              resolve: "gatsby-source-wordpress",
              options: wordpressGraphql,
            },
          ]
        : []),
      ...(local
        ? [
            {
              resolve: "gatsby-source-filesystem",
              options: {
                path: options.contentPath,
                name: "content",
              },
            },
          ]
        : []),
      {
        resolve: "gatsby-plugin-sharp",
        options: {
          defaultQuality: 80,
          failOnError: false,
        },
      },
      "gatsby-transformer-sharp",
      ...(local && !mdx
        ? [
            {
              resolve: "gatsby-transformer-remark",
              options: {
                plugins: remarkLocalOptions,
              },
            },
          ]
        : []),
      ...(datocms
        ? [
            {
              resolve: "gatsby-transformer-remark",
              options: {
                plugins: remarkOptions,
              },
            },
          ]
        : []),
      ...(local && mdx
        ? [
            {
              resolve: `gatsby-plugin-mdx`,
              options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: remarkLocalOptions,
              },
            },
          ]
        : []),
    ].filter(Boolean),
  }
}
