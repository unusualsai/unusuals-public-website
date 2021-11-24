import React from "react"
import { graphql } from "gatsby"

import { ImageTextSection as DSImageTextSection } from "@solublestudio/unusuals-design-system"

export default function ImageTextSection({ title, description, image }: any) {
  return (
    <DSImageTextSection title={title} description={description} image={image} />
  )
}

export const query = graphql`
  fragment DatoCmsImageTextSection on DatoCmsImageTextSection {
    title
    description
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
