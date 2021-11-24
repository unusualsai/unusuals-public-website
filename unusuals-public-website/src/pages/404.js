import React from "react"
import { graphql } from "gatsby"
import {
  Layout,
  useTranslate,
  Link,
} from "@solublestudio/gatsby-theme-soluble-source"
import { NotFoundPage as DSNotFoundPage } from "@solublestudio/unusuals-design-system"

export default function NotFoundPage({ data }) {
  const _ = useTranslate()

  return (
    <Layout navbarFixed={true} navbarTransparent={true}>
      <DSNotFoundPage
        title={_["404.title"].text}
        description={_["404.description"].text}
        cta={
          data.datoCmsOption?.notFoundPageLink
            ? {
                ...data.datoCmsOption.notFoundPageLink,
                Tag: Link,
              }
            : null
        }
      />
    </Layout>
  )
}

export const query = graphql`
  query NotFoundData {
    datoCmsOption(locale: { eq: "en" }) {
      notFoundPageLink {
        ...Button
      }
    }
  }
`
