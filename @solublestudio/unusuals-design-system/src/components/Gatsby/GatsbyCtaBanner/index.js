import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import CtaBanner from '../../CtaBanner';

export default function GatsbyCtaBanner(props) {
    const data = useStaticQuery(graphql`
        {
            video: file(
                sourceInstanceName: { eq: "video-ds" }
                name: { eq: "isotipo-low" }
            ) {
                publicURL
                extension
            }
            image: file(
                sourceInstanceName: { eq: "img-ds" }
                name: { eq: "transparent-2D" }
            ) {
                publicURL
            }
        }
    `);

    return (
        <CtaBanner
            {...props}
            image={data.image.publicURL}
            video={{ url: data.video.publicURL, format: data.video.extension }}
        />
    );
}
