import React from "react"

const PREFIX = "DatoCms"

export default function Section({ __typename: type, ...props }) {
  let SectionComponent = () => <div> -- Section {type} not found -- </div>

  switch (type) {
    case `${PREFIX}BenefitsSection`:
      SectionComponent = require("./components/BenefitsSection").default
      break
    case `${PREFIX}IndustriesSection`:
      SectionComponent = require("./components/IndustriesSection").default
      break
    case `${PREFIX}SummaryUseCasesSection`:
      SectionComponent = require("./components/SummaryUseCasesSection").default
      break
    case `${PREFIX}TestimonialSection`:
      SectionComponent = require("./components/TestimonialSection").default
      break
    case `${PREFIX}CardsSection`:
      SectionComponent = require("./components/CardsSection").default
      break
    case `${PREFIX}DiscoverSection`:
      SectionComponent = require("./components/DiscoverSection").default
      break
    case `${PREFIX}OurSolutionsSection`:
      SectionComponent = require("./components/OurSolutionsSection").default
      break
    case `${PREFIX}CtaBanner`:
      SectionComponent = require("./components/CtaBanner").default
      break
    case `${PREFIX}HeroSection`:
      SectionComponent = require("./components/HeroSection").default
      break
    case `${PREFIX}OurLatestPostsSection`:
      SectionComponent = require("./components/OurLatestPostsSection").default
      break
    case `${PREFIX}IndustriesDetailedSection`:
      SectionComponent =
        require("./components/IndustriesDetailedSection").default
      break
    case `${PREFIX}PointsSection`:
      SectionComponent = require("./components/PointsSection").default
      break
    case `${PREFIX}ImageTextSection`:
      SectionComponent = require("./components/ImageTextSection").default
      break
    case `${PREFIX}ValuesSection`:
      SectionComponent = require("./components/ValuesSection").default
      break
    case `${PREFIX}OpenPositionSection`:
      SectionComponent = require("./components/OpenPositionSection").default
      break
    case `${PREFIX}FormSection`:
      SectionComponent = require("./components/FormSection").default
      break
    case `${PREFIX}PartnersSection`:
      SectionComponent = require("./components/OurPartnersSection").default
      break
    case `${PREFIX}TextSection`:
      SectionComponent = require("./components/TextSection").default
      break
    case `${PREFIX}BlogPostsSection`:
      SectionComponent = require("./components/BlogPostsSection").default
      break
    case `${PREFIX}FaqsSection`:
      SectionComponent = require("./components/FAQsSection").default
      break
  }

  return <SectionComponent {...props} />
}
