import React from "react"
import { graphql } from "gatsby"

import { SummaryPostsSection as DSSummaryPostsSection } from "@solublestudio/unusuals-design-system"

export default DSSummaryPostsSection

export const query = graphql`
  fragment BlogPostListItem on DatoCmsBlog {
    title
    meta {
      firstPublishedAt(formatString: "D MMM. 'YY", locale: "en")
    }
    categories {
      title
      slug
    }
    categoriesString
    author {
      ...AuthorItem
    }
    extract
    slug
    image {
      file {
        childImageSharp {
          fluid(maxWidth: 980) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
  fragment DatoCmsOurLatestPostsSection on DatoCmsOurLatestPostsSection {
    title
    description
    cta {
      ...Button
    }
    posts {
      ...BlogPostListItem
    }
  }
`
