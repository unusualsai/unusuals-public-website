import React from "react"
import { graphql } from "gatsby"

import { PointsSection as DSPointsSection } from "@solublestudio/unusuals-design-system"

export default DSPointsSection

export const query = graphql`
  fragment DatoCmsPointsSection on DatoCmsPointsSection {
    points {
      number
      title
      description
    }
    cta {
      ...Button
    }
  }
`
