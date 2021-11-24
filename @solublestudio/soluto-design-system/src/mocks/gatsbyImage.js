import React, { useEffect } from 'react';

export default function GatsbyImageComponent({
    fixed,
    fluid,
    onLoad,
    ...otherProps
}) {
    const imageSharp = fixed || fluid;

    useEffect(() => {
        if (!onLoad) {
            return;
        }
        onLoad();
    }, [onLoad]);

    return <img src={imageSharp?.src} {...otherProps} />;
}
