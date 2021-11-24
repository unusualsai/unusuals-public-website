exports.local = (mdx = false) => `
    {
    local: ${mdx ? "allMdx" : "allMarkdownRemark"}(
        filter: {
            frontmatter: {
                templateKey: {
                    regex: "/^[^_]/"
                }
            }
        }
    ) {
        edges {
            node {
                id
                fields {
                    slug
                    alternateLanguages {
                        fields {
                            slug
                        }
                        frontmatter {
                            language
                        }
                    }
                }
                frontmatter {
                    templateKey
                    language
                    seo {
                        title
                        description
                        image {
                            childImageSharp {
                                resize(width: 1200, height: 630) {
                                    src
                                }
                            }
                        }
                        noIndex
                        removeSuffix
                    }
                }
            }
        }
    }
    }`

exports.airtable = `
    {
        allAirtable(
            filter: {
                data: {
                    templateKey: {
                        regex: "/^[^_]/"
                    }
                }
            }
        ) {
            edges {
                node {
                    id
                    table
                    fields {
                        slug
                        alternateLanguages {
                            fields {
                                slug
                            }
                            data {
                                language
                            }
                        }
                    }
                    data {
                        templateKey
                        language
                        seoTitle
                        seoDescription
                        noIndex
                        removeSuffix
                        seoImage {
                            localFiles {
                                childImageSharp {
                                    resize(width: 1200, height: 630) {
                                        src
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

exports.airtableLinks = `
    {
        allAirtable(filter: {data: {templateKey: {regex: "/_link/"}}}) {
        edges {
            node {
            id
            table
            data {
                templateKey
                slug
                type
                label
                language
                Page {
                id
                data {
                    slug
                }
                table
                }
                external
                order
            }
            }
        }
        }
    }
`

exports.datocmspages = (
  modelPages = [],
  modelsPagination = [],
  redirects = false
) => `
    {
        datoCmsSite {
            globalSeo {
                titleSuffix
                fallbackSeo {
                    description
                    image {
                        file {
                            publicURL
                            childImageSharp {
                                resize(width: 1200, height: 630) {
                                    src
                                }
                            }
                        }
                    }
                    title
                }
            }
        }
        ${modelPages.map(
          (model) => `
            allDatoCms${model}(filter: {slug: {regex: ""}}) {
                edges {
                    node {
                        _otherSlugLocales {
                            locale
                            value
                        }
                        id
                        title
                        templateKey 
                        slug
                        locale
                        noindex
                        removesuffix
                        seo {
                            description
                            title
                            image {
                                file {
                                    publicURL
                                    childImageSharp {
                                        resize(width: 1200, height: 630) {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }        
        `
        )}
        ${modelsPagination.map(
          (modelKey) => `
            modelPagination${modelKey}: allDatoCms${modelKey}(sort: {fields: meta___firstPublishedAt, order: DESC}, filter: {slug: {regex: ""}}) {
                edges {
                    node {
                        id
                        locale
                    }
                }
            }        
        `
        )}
        ${
          redirects
            ? `
            allDatoCmsRedirect {
                edges {
                    node {
                        id
                        fromPath
                        toPath
                        permanent
                    }
                }
            }
        `
            : ``
        }
    }
`

exports.wordpresspages = (modelPages) => `
    {
        ${modelPages.map(
          (model) => `
            wordpressSiteMetadata {
                description
                name
            }
            allWordpress${model} {
                edges {
                    node {
                        id
                        title
                        slug
                        path
                        wpml_current_locale
                        wpml_translations {
                            wordpress_id
                        }
                        acf {
                            template_key
                        }
                        yoast_title
                        yoast_meta {
                            name
                            property
                            cont
                        }
                        wordpress_id
                        featured_media {
                            localFile {
                                publicURL
                                childImageSharp {
                                    resize(width: 1200, height: 630) {
                                        src
                                    }
                                }
                            }
                        }
                        _allSlugLocales {
                            locale
                            value
                        }
                    }
                }
            }
        `
        )}
    }
`

exports.wordpressgraphqlpages = (modelPages, supports) => `
    {
        wp {
            generalSettings {
                title
                url
            }
        }
        ${modelPages.map(
          (model) => `
            allWp${model} {
                edges {
                    node {
                        ${
                          supports.acf
                            ? `
                            templateKey {
                                templateKey
                            }
                        `
                            : ""
                        }
                        slug
                        id
                        title
                        link
                        ${
                          supports.wpml
                            ? `
                            language
                            translations {
                                id
                                slug
                                language
                            }
                        `
                            : ""
                        }
                        ${
                          supports.yoast || supports.rankmath
                            ? `
                            seo {
                                title
                                metaDesc
                                metaRobotsNoindex
                            }
                        `
                            : ""
                        }
                        featuredImage {
                            node {
                                localFile {
                                    publicURL
                                    childImageSharp {
                                        resize(width: 1200, height: 630) {
                                            src
                                        }
                                    }
                                }
                            }
                        }
                        _allSlugLocales {
                            locale
                            value
                        }
                    }
                }
            }
        `
        )}
    }
`

exports.hubspotblogpages = () => `
    {
        allHubspotBlogPost(sort: {fields: date, order: DESC}) {
            edges {
                node {
                    slug
                    id
                    title
                    language
                    description
                    noIndex
                    featuredImage {
                        file {
                            publicURL
                            childImageSharp {
                                resize(width: 1200, height: 630) {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
        allHubspotBlogAuthor {
            edges {
                node {
                    hubspotId
                    slug
                    id
                    name
                    avatar {
                        publicURL
                        childImageSharp {
                            resize(width: 1200, height: 630) {
                                src
                            }
                        }
                    }
                }
            }
        }
        allHubspotBlogTopic {
            edges {
                node {
                    hubspotId
                    slug
                    id
                    name
                }
            }
        }
    }
`
