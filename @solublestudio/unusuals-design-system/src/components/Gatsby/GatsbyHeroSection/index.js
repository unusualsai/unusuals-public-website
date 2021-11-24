import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import HeroSection from '../../HeroSection';

export default function GatsbyHeroSection(props) {
    const data = useStaticQuery(graphql`
        {
            video: file(
                sourceInstanceName: { eq: "video-ds" }
                name: { eq: "isotipo-low" }
            ) {
                publicURL
                extension
            }
        }
    `);

    return (
        <HeroSection
            {...props}
            video={{ url: data.video.publicURL, format: data.video.extension }}
        />
    );
}
