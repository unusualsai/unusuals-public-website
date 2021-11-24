import React from "react"
import { graphql } from "gatsby"
import { Link, useTranslate } from "@solublestudio/gatsby-theme-soluble-source"

import { OpenPositionSection as DSOpenPositionSection } from "@solublestudio/unusuals-design-system"

export default function OpenPositionSection({
  title,
  titleTag,
  description,
  cta,
  openPositions,
}) {
  const _ = useTranslate()

  return openPositions?.length ? (
    <DSOpenPositionSection
      title={title}
      titleTag={titleTag}
      description={description}
      cta={cta}
      openPositions={openPositions.map((op) => ({
        ...op,
        subtitle: op.tags?.length ? op.tags[0] : null,
        cta: {
          label: _["read-more"].text,
          Tag: Link,
          target: "_blank",
          link: {
            slug: op.slug,
          },
        },
      }))}
    />
  ) : null
}
export const query = graphql`
  fragment DatoCmsOpenPositionSection on DatoCmsOpenPositionSection {
    title
    titleTag
    description
    openPositions {
      title
      subtitle
      description
      slug
    }
    cta {
      ...Button
    }
  }
`
