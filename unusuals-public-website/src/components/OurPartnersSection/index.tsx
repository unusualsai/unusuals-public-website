import React from "react"
import { graphql } from "gatsby"

import { OurPartnersSection as DsOurPartnersSection } from "@solublestudio/unusuals-design-system"

export default function OurPartnersSection({ partners }: any) {
  return <DsOurPartnersSection partners={partners} />
}

export const query = graphql`
  fragment DatoCmsPartnersSection on DatoCmsPartnersSection {
    partners {
      customData
      file {
        publicURL
        childImageSharp {
          resize(height: 80) {
            src
          }
        }
      }
    }
  }
`
