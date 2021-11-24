import { TestimonialSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default TestimonialSection

export const query = graphql`
  fragment AuthorItem on DatoCmsAuthor {
    name
    role
    image {
      file {
        childImageSharp {
          fixed(width: 72) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  }
  fragment DatoCmsTestimonialSection on DatoCmsTestimonialSection {
    testimonial
    author {
      ...AuthorItem
    }
  }
`
