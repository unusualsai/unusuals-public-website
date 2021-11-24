import { SummaryUseCasesSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default SummaryUseCasesSection

export const query = graphql`
  fragment SummaryUseCase on DatoCmsSummaryUseCase {
    title
    description
    image {
      file {
        publicURL
      }
    }
  }
  fragment DatoCmsSummaryUseCasesSection on DatoCmsSummaryUseCasesSection {
    title
    titleTag
    useCases {
      ...SummaryUseCase
    }
    cta {
      ...Button
    }
  }
`
