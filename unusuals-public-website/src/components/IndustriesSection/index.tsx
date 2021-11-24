import React, { useMemo } from "react"
import { IndustriesSection as DSIndustriesSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default function IndustriesSection(props) {
  const industries = useMemo(
    () =>
      props?.industries?.length > 0
        ? props.industries.map((industry: any) => ({
            ...industry,
            cta: industry?.readMoreCta,
          }))
        : [],
    [props]
  )

  return <DSIndustriesSection {...props} industries={industries} />
}

export const query = graphql`
  fragment IndustryItem on DatoCmsIndustry {
    title
    description
    slug
    dark
    image {
      file {
        publicURL
      }
    }
    imageDetail {
      file {
        publicURL
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    cta {
      ...Button
    }
    readMoreCta {
      ...Button
    }
    feature1Title
    feature1Description
    feature2Title
    feature2Description
  }
  fragment DatoCmsIndustriesSection on DatoCmsIndustriesSection {
    title
    description
    titleTag
    industries {
      ...IndustryItem
    }
  }
`
