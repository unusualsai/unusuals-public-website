import React from "react"
import { graphql } from "gatsby"
import { Link } from '@solublestudio/gatsby-theme-soluble-source';

import { CtaBanner as DSCtaBanner } from "@solublestudio/unusuals-design-system"

export default function CtaBanner({ title, pretitle, description, cta }: any) {
  return (
    <DSCtaBanner
      title={title}
      pretitle={pretitle}
      description={description}
      cta={{
        ...cta,
        Tag: Link
      }}
    />
  );
}

export const query = graphql`
  fragment DatoCmsCtaBanner on DatoCmsCtaBanner {
    title
    pretitle
    description
    cta {
      ...Button
    }
  }
`
