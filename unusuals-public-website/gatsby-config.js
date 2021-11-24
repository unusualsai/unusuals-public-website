const dotenv = require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Soluble`,
    description: `Source built by Soluble Team`,
    author: `@solublestudio`,
    siteUrl: process.env.GATSBY_URL
      ? process.env.GATSBY_URL
      : "https://solublestudio.com/",
    suffix: "- Soluble",
  },
  plugins: [
    {
      resolve: "@solublestudio/unusuals-design-system",
      options: {
        components: [],
      },
    },
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.2,
        once: true,
        rootMargin: "0% 100%",
      },
    },
    {
      resolve: "@solublestudio/gatsby-theme-soluble-source",
      options: {
        primaryLanguage: "en",
        language: {
          en: "",
        },
        pathsByLanguage: {
          openposition: {
            en: "open-positions",
          },
          Blog: {
            en: "blog",
          },
          Category: {
            en: "blog",
          },
        },
        datocms: {
          apiToken: process.env.DATOCMS_API_KEY,
          previewMode: !!process.env.DATOCMS_PREVIEW_MODE,
          modelPages: ["Page", "OpenPosition", "Blog", "Category"],
          modelsPagination: {
            Blog: {
              pagination: {
                firstPageItems: 9,
                perPage: 9,
              },
              templateKey: "post-page",
              sectionKey: "BlogPostsSection",
              itemsKey: "blogPosts",
            },
          },
        },
        local: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `unusuals`,
        short_name: `unusuals`,
        start_url: `/`,
        background_color: `#101010`,
        theme_color: `#ec37e1`,
        display: `minimal-ui`,
        icon: `src/img/favicon.png`,
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `@solublestudio/gatsby-plugin-cookiehub`,
      options: {
        cookiehubID: "46fdba02",
        isDev: process.env.COOKIEHUB_DEV === "true",
        head: false,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        // Config -> https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/
        id: "GTM-N4798R",
        includeInDevelopment: false,
        defaultDataLayer: {},
        routeChangeEventName: "routechange",
      },
    },
  ],
}
