import React from "react"
import { graphql } from "gatsby"

import { HeroSection as DSHeroSection } from "@solublestudio/unusuals-design-system"

export default function HeroSection({ description, ...props }: any) {
  return <DSHeroSection subtitle={description} {...props} />
}

export const query = graphql`
  fragment DatoCmsHeroSection on DatoCmsHeroSection {
    title
    description
    clients {
      file {
        publicURL
        childImageSharp {
          resize(height: 80) {
            src
          }
        }
      }
    }
    images {
      file {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1044) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    coverImage {
      file {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1044) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
