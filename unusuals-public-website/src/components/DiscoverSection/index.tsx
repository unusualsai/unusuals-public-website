import React from "react"
import { graphql } from "gatsby"

import { DiscoverSection as DSDiscoverSection } from "@solublestudio/unusuals-design-system"

import { useMemo } from "react"

interface DiscoverSectionProps {
  title: String
  description: String
  footer: String
  discoverCards: any[]
}

export default function DiscoverSection({
  discoverCards,
  ...props
}: DiscoverSectionProps): JSX.Element {
  const sections = useMemo(
    () =>
      discoverCards?.length > 0
        ? discoverCards.map((card) => ({
            ...card,
            contents: [{ text: card?.text }, { text: card?.text2 }],
          }))
        : [],
    [discoverCards]
  )

  return <DSDiscoverSection {...props} sections={sections} />
}

export const query = graphql`
  fragment DiscoverCard on DatoCmsDiscoverCard {
    number
    title
    slug
    description
    cta {
      ...Button
    }
    text
    text2
  }
  fragment DatoCmsDiscoverSection on DatoCmsDiscoverSection {
    title
    description
    footer
    discoverCards {
      ...DiscoverCard
    }
  }
`
