import React from "react"
import { graphql } from "gatsby"

import { ValuesSection as DSValuesSection } from "@solublestudio/unusuals-design-system"

export default DSValuesSection

export const query = graphql`
  fragment DatoCmsValuesSection on DatoCmsValuesSection {
    title
    description
    values {
      title
      description
    }
    image {
      file {
        childImageSharp {
          fluid(maxWidth: 448) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
