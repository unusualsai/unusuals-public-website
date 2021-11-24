import React, { useRef, useEffect } from 'react';

import CssClassNames from '../../scss/CssClassNames';
const { className } = new CssClassNames({}, ['utility', 'media']);

export default ({ sources, ...props }) => {
    const wrapperRef = useRef();

    useEffect(() => {
        if (!wrapperRef?.current || typeof window === 'undefined') {
            return;
        }

        const video = wrapperRef.current.querySelector('video[data-play]');
        if (!video) {
            return;
        }

        const onScroll = () => {
            const rect = video.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                video.play();
                window.removeEventListener('scroll', onScroll);
            }
        }
    
        setTimeout(onScroll, 1000);
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [wrapperRef]);

    return sources && sources.length ? (
        <div
            ref={wrapperRef}
            {...className(`img-fluid ${props.className ? props.className : ''}`)}
            dangerouslySetInnerHTML={{
                __html: `
            <video preload="auto" class="${className('img-fluid').className}" loop muted data-play="true" playsinline>
                ${sources.map(s => (`
                    <source
                        src="${s.src}"
                        type="video/${s.type}"
                    />
                `))}
            </video>`,
            }}
        />
    ) : null;
}