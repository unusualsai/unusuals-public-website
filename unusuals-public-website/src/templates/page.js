import React from "react"
import { graphql } from "gatsby"

import { Layout } from "@solublestudio/gatsby-theme-soluble-source"

import Section from "../sections"

export default function Page({ data }) {
  return (
    <Layout navbarFixed={true} navbarTransparent={true}>
      {data.datoCmsPage.sections.map((section, i) => (
        <Section
          key={i}
          order={i + 1}
          isLast={i + 1 === data.datoCmsPage.sections.length}
          pageSlug={data?.datoCmsPage?.slug}
          {...section}
        />
      ))}
    </Layout>
  )
}

export const query = graphql`
  fragment Button on DatoCmsButton {
    label
    detached
    externalLink
    link {
      ... on DatoCmsPage {
        slug
      }
      ... on DatoCmsBlog {
        slug
      }
    }
  }

  query Page($id: String, $language: String) {
    datoCmsPage(id: { eq: $id }, locale: { eq: $language }) {
      title
      sections {
        ... on DatoCmsValuesSection {
          ...DatoCmsValuesSection
        }
        ... on DatoCmsOpenPositionSection {
          ...DatoCmsOpenPositionSection
        }
        ... on DatoCmsCtaBanner {
          ...DatoCmsCtaBanner
        }
        ... on DatoCmsFormSection {
          ...DatoCmsFormSection
        }
        ... on DatoCmsPartnersSection {
          ...DatoCmsPartnersSection
        }
        ... on DatoCmsImageTextSection {
          ...DatoCmsImageTextSection
        }
        ... on DatoCmsBlogPostsSection {
          ...DatoCmsBlogPostsSection
        }
        ... on DatoCmsTextSection {
          ...DatoCmsTextSection
        }
        ... on DatoCmsHeroSection {
          ...DatoCmsHeroSection
        }
        ... on DatoCmsIndustriesSection {
          ...DatoCmsIndustriesSection
        }
        ... on DatoCmsSummaryUseCasesSection {
          ...DatoCmsSummaryUseCasesSection
        }
        ... on DatoCmsTestimonialSection {
          ...DatoCmsTestimonialSection
        }
        ... on DatoCmsCardsSection {
          ...DatoCmsCardsSection
        }
        ... on DatoCmsOurSolutionsSection {
          ...DatoCmsOurSolutionsSection
        }
        ... on DatoCmsOurLatestPostsSection {
          ...DatoCmsOurLatestPostsSection
        }
        ... on DatoCmsDiscoverSection {
          ...DatoCmsDiscoverSection
        }
        ... on DatoCmsIndustriesDetailedSection {
          ...DatoCmsIndustriesDetailedSection
        }
        ... on DatoCmsPointsSection {
          ...DatoCmsPointsSection
        }
        ... on DatoCmsBenefitsSection {
          ...DatoCmsBenefitsSection
        }
        ... on DatoCmsFaqsSection {
          ...DatoCmsFaqsSection
        }
      }
    }
  }
`
