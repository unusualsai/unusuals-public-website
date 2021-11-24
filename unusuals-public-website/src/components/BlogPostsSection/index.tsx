import React from "react"
import { graphql } from "gatsby"
import { Link, useTranslate } from "@solublestudio/gatsby-theme-soluble-source"

import { BlogSection } from "@solublestudio/unusuals-design-system"

export default function BlogPostsSection({
  blogPosts,
  categories,
  ...props
}: any) {
  const _ = useTranslate()

  return (
    <BlogSection
      {...props}
      LinkTag={Link}
      blogCards={blogPosts}
      categories={categories}
      pageHref={props?.pageHref}
      firstPageHref={props?.pageSlug || props?.firstPageHref}
      currentSlug={props?.pageSlug || props?.currentSlug}
      defaultCategory={_["blog.default.category"]?.text}
    />
  )
}

export const query = graphql`
  fragment DatoCmsBlogPostsSectionParentPage on DatoCmsPage {
    slug
    sections {
      ... on DatoCmsBlogPostsSection {
        blogPosts {
          ...BlogPostListItem
        }
        categories {
          title
          slug
        }
      }
      ... on DatoCmsHeroSection {
        ...DatoCmsHeroSection
      }
    }
  }
  fragment DatoCmsBlogPostsSection on DatoCmsBlogPostsSection {
    blogPosts {
      ...BlogPostListItem
    }
    categories {
      title
      slug
    }
    pageHref: pathChild
    numPages
  }
`
