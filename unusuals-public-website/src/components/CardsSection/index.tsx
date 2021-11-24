import { graphql } from "gatsby"

import { CardsSection as DSCardsSection } from "@solublestudio/unusuals-design-system"

export default DSCardsSection

export const query = graphql`
  fragment DatoCmsCardsSection on DatoCmsCardsSection {
    cards {
      title
      description
    }
  }
`
