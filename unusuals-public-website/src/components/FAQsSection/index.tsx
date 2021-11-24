import { FAQsSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default FAQsSection

export const query = graphql`
  fragment Faq on DatoCmsFaq {
    title
    description
  }
  fragment DatoCmsFaqsSection on DatoCmsFaqsSection {
    faqs {
      ...Faq
    }
  }
`
