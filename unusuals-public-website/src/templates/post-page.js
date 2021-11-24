import React from "react"
import { graphql } from "gatsby"
import { Layout } from "@solublestudio/gatsby-theme-soluble-source"

import Section from "../sections"

export default function PostPage({ data, pageContext }) {
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
                blogPosts: data.blogPosts.edges.map(({ node }) => node),
                pageNr: pageContext?.pageNr,
                numPages: pageContext?.numPages,
              }
            : section)}
        />
      ))}
    </Layout>
  )
}

export const query = graphql`
  query PostPage($modelIds: [String], $language: String) {
    parentPage: getParentPage(
      locale: $language
      type: "DatoCmsBlogPostsSection"
    ) {
      ...DatoCmsBlogPostsSectionParentPage
    }
    blogPosts: allDatoCmsBlog(filter: { id: { in: $modelIds } }) {
      edges {
        node {
          ...BlogPostListItem
        }
      }
    }
  }
`
