import React, { useMemo } from "react"
import { graphql } from "gatsby"

import {
  Layout,
  useTranslate,
} from "@solublestudio/gatsby-theme-soluble-source"
import {
  HeroPost,
  HTMLSection,
  Text,
  SummaryPostsSection,
} from "@solublestudio/unusuals-design-system"
import StructuredText from "@solublestudio/gatsby-theme-soluble-source/src/components/StructuredText"
import GatsbyImageComponent from "@solublestudio/unusuals-design-system/src/components/Gatsby/GatsbyImageComponent"

export default function Post({ data }) {
  const _ = useTranslate()

  const pageData = useMemo(() => data.datoCmsBlog, [data])

  return (
    <Layout
      navbarFixed={true}
      navbarTransparent={true}
      headerExtraParams={{ withBorder: true }}
    >
      {pageData ? (
        <HeroPost
          title={pageData.title}
          image={pageData.image}
          author={pageData.author}
          cta={{
            label: _["blog.back.label"]?.text,
            link: {
              slug: data?.parentPage?.slug,
            },
          }}
        />
      ) : null}
      {pageData ? (
        <HTMLSection className="bg-basic-light">
          <Text
            tag="span"
            className="caption text-basic-700 text-uppercase d-inline-block mb-3 mb-lg-4 mb-xxl-5"
          >{`${pageData.meta.firstPublishedAt} // ${pageData.categoriesString}`}</Text>
          <StructuredText
            data={pageData.content}
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case "DatoCmsTable":
                  return (
                    <div
                      data-table-wrapper
                      dangerouslySetInnerHTML={{ __html: record.table }}
                    />
                  )
                case "DatoCmsImage":
                  return (
                    <div
                      data-images={record.images.length}
                      data-images-full-width={record.desktopFullWidth}
                    >
                      {record.images.map((img, i) => (
                        <GatsbyImageComponent key={i} image={img} />
                      ))}
                    </div>
                  )
                default:
                  return null
              }
            }}
          />
        </HTMLSection>
      ) : null}
      {pageData?.related?.length ? (
        <SummaryPostsSection
          title={_["blog.related.title"].text}
          titleTag="h3"
          posts={pageData.related}
        />
      ) : null}
    </Layout>
  )
}

export const query = graphql`
  query Post($id: String, $language: String) {
    datoCmsBlog(id: { eq: $id }, locale: { eq: $language }) {
      title
      author {
        name
        role
        image {
          file {
            childImageSharp {
              resize(width: 80, height: 80, cropFocus: CENTER) {
                src
              }
            }
          }
        }
      }
      meta {
        firstPublishedAt(formatString: "D MMM. 'YY", locale: "en")
      }
      image {
        file {
          childImageSharp {
            fluid(maxWidth: 980) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      categories {
        title
      }
      categoriesString
      content {
        value
        blocks {
          ... on DatoCmsImage {
            id: originalId
            desktopFullWidth
            images {
              alt
              file {
                publicURL
                childImageSharp {
                  fluid(maxWidth: 980) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          ... on DatoCmsTable {
            id: originalId
            table
          }
        }
      }
      related {
        ...BlogPostListItem
      }
    }
    parentPage: getParentPage(
      locale: $language
      type: "DatoCmsBlogPostsSection"
    ) {
      ...DatoCmsBlogPostsSectionParentPage
    }
  }
`
