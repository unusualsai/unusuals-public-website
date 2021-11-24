import React, { useMemo } from "react"
import { graphql } from "gatsby"

import { Layout, Link } from "@solublestudio/gatsby-theme-soluble-source"
import StructuredText from "@solublestudio/gatsby-theme-soluble-source/src/components/StructuredText"
import {
  HeroSectionAlt,
  HTMLSection,
} from "@solublestudio/unusuals-design-system"

export default function OpenPositionPage({ data }) {
  const applyCta = useMemo(() => {
    return data.datoCmsOption.openPositionApplyLink
      ? {
          ...data.datoCmsOption.openPositionApplyLink,
          Tag: Link,
        }
      : null
  }, [data.datoCmsOpenPosition, data.datoCmsOption])

  return (
    <Layout
      navbarFixed={true}
      navbarTransparent={true}
      headerExtraParams={{ withBorder: true }}
    >
      <HeroSectionAlt
        title={data.datoCmsOpenPosition.title}
        cta={applyCta}
      ></HeroSectionAlt>
      <HTMLSection pretitle={data.datoCmsOpenPosition.subtitle} cta={applyCta}>
        <StructuredText data={data.datoCmsOpenPosition.text}></StructuredText>
      </HTMLSection>
    </Layout>
  )
}

export const query = graphql`
  query OpenPosition($id: String, $language: String) {
    datoCmsOpenPosition(id: { eq: $id }, locale: { eq: $language }) {
      title
      subtitle
      tags
      text {
        value
      }
    }
    datoCmsOption(locale: { eq: $language }) {
      openPositionApplyLink {
        ...Button
      }
    }
  }
`
