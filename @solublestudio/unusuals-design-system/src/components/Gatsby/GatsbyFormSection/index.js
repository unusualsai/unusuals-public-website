import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import FormSection from '../../FormSection';

export default function GatsbyFormSection(props) {
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
        <FormSection
            {...props}
            video={{ url: data.video.publicURL, format: data.video.extension }}
        />
    );
}
