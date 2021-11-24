import React from "react"
import { graphql } from "gatsby"

import { OurSolutionsSection as DSOurSolutionsSection } from "@solublestudio/unusuals-design-system"

export default DSOurSolutionsSection

export const query = graphql`
  fragment SolutionItem on DatoCmsSolution {
    name
    number
    title
    cta {
      ...Button
    }
    description
  }
  fragment DatoCmsOurSolutionsSection on DatoCmsOurSolutionsSection {
    title
    titleTag
    solutions {
      ...SolutionItem
    }
  }
`
