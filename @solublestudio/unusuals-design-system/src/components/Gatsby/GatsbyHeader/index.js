import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../../Header';

export default function GatsbyHeader(props) {
    const data = useStaticQuery(graphql`
        {
            logo: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "logo" }
            ) {
                publicURL
            }
        }
    `);

    return (
        <Header
            logo={data.logo.publicURL}
            scheme="gatsby"
            {...props}
        />
    );
}