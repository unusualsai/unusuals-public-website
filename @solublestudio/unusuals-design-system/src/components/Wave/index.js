import React, { Fragment } from 'react';

import VideoInline from '@solublestudio/soluto-design-system/src/components/VideoInline';

import style from './styles.module.scss';

export default function Wave({
    video,
    className = null
}) {
    return (
        <VideoInline
            className={
                [className, style.wave].join(" ")
            }
            sources={[{src: video.url, type: video.format}]}
        />
    );
}
