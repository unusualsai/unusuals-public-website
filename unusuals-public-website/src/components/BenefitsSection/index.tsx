import { BenefitsSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default BenefitsSection

export const query = graphql`
  fragment BenefitItem on DatoCmsBenefit {
    title
    description
    icon {
      file {
        publicURL
      }
    }
  }
  fragment DatoCmsBenefitsSection on DatoCmsBenefitsSection {
    title
    description
    titleTag
    benefits {
      ...BenefitItem
    }
  }
`
