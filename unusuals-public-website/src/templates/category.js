import React from "react"
import { graphql } from "gatsby"
import { Layout } from "@solublestudio/gatsby-theme-soluble-source"

import Section from "../sections"

export default function CategoryPage({ data, pageContext }) {
  console.log("DATA ->", data)
  console.log(pageContext)

  return (
    <Layout navbarFixed={true} navbarTransparent={true}>
      {data.parentPage?.sections.map((section, i) => (
        <Section
          key={i}
          order={i + 1}
          isLast={i + 1 === data.parentPage.sections.length}
          {...(section.__typename === "DatoCmsBlogPostsSection"
            ? {
                ...section,
                currentSlug: data?.page?.slug,
                blogPosts: data.blogPosts.edges.map(({ node }) => node),
                pageNr: pageContext?.pageNr,
                firstPageHref: data?.parentPage?.slug,
                numPages: 0,
              }
            : section)}
        />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query CategoryPage($id: String, $language: String) {
    page: datoCmsCategory(id: { eq: $id }, locale: { eq: $language }) {
      title
      slug
      seo {
        title
        description
      }
    }
    parentPage: getParentPage(
      locale: $language
      type: "DatoCmsBlogPostsSection"
    ) {
      ...DatoCmsBlogPostsSectionParentPage
    }
    blogPosts: allDatoCmsBlog(
      filter: {
        categories: { elemMatch: { id: { eq: $id } } }
        locale: { eq: $language }
      }
    ) {
      edges {
        node {
          ...BlogPostListItem
        }
      }
    }
  }
`
