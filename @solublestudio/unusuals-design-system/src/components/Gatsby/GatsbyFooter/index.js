import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from '../../Footer';

export default function GatsbyFooter(props) {
    const socialIcons = useStaticQuery(graphql`
        {
            linkedin: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "social-linkedin" }
            ) {
                publicURL
            }
            twitter: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "social-twitter" }
            ) {
                publicURL
            }
            youtube: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "social-youtube" }
            ) {
                publicURL
            }
            feed: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "social-feed" }
            ) {
                publicURL
            }
        }
    `);

    return <Footer socialIcons={socialIcons} {...props} />;
}
