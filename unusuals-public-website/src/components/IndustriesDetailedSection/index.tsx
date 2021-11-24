import React, { useMemo } from "react"
import { IndustriesDetailSection as DSIndustriesDetailSection } from "@solublestudio/unusuals-design-system"
import { graphql } from "gatsby"

export default function IndustriesDetailedSection(props: any) {
  const industries = useMemo(
    () =>
      props?.industries?.length > 0
        ? props.industries.map((industry: any) => ({
            ...industry,
            image: industry.imageDetail,
            features: [
              {
                title: industry.feature1Title,
                description: industry.feature1Description,
              },
              {
                title: industry.feature2Title,
                description: industry.feature2Description,
              },
            ],
          }))
        : [],
    [props]
  )

  return <DSIndustriesDetailSection industries={industries} />
}

export const query = graphql`
  fragment DatoCmsIndustriesDetailedSection on DatoCmsIndustriesDetailedSection {
    industries {
      ...IndustryItem
    }
  }
`
