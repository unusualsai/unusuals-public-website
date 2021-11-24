import React from "react"
import { graphql } from "gatsby"

import { Heading, HTMLSection } from "@solublestudio/unusuals-design-system"
import StructuredText from "@solublestudio/gatsby-theme-soluble-source/src/components/StructuredText"

export default function TextSection({ title, content }: any) {
  return (
    <HTMLSection>
      {title && (
        <Heading tag="h1" className="display2 mb-3 mb-lg-4 mb-xxl-5">
          {title}
        </Heading>
      )}
      <StructuredText data={content} />
    </HTMLSection>
  )
}

export const query = graphql`
  fragment DatoCmsTextSection on DatoCmsTextSection {
    title
    content {
      value
    }
  }
`
