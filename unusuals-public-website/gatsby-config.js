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
      resolve: `gatsby-plugin-cookiehub`,
      options: {
        cookihubId: "e45a4bf3",
        head: false,
        anonymize: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        // Config -> https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/
        id: "GTM-PBB3STH",
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-always-route-change",
      },
    },
    "gatsby-plugin-netlify",
  ],
}
