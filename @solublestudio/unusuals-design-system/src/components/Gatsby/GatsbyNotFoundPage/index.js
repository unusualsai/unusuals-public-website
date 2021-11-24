import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import NotFoundPage from '../../NotFoundPage';

export default function GatsbyNotFoundPage(props) {
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
        <NotFoundPage
            {...props}
            video={{ url: data.video.publicURL, format: data.video.extension }}
        />
    );
}
