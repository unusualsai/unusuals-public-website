import React, { useEffect, useState, useCallback } from 'react';
import Img from 'gatsby-image';

import { className as classNameFnc } from '@solublestudio/soluto-design-system';

export default function ImageComponent({
    image,
    alt = '',
    className,
    onLoad,
    aspectRatio = null,
    ...props
}) {
    const [show, setShow] = useState(
        image &&
            image.file &&
            image.file.childImageSharp &&
            (typeof window === 'undefined' ||
                image.file.childImageSharp.fixed ||
                image.file.childImageSharp.fluid ||
                (image.file.childImageSharp.resize && !onLoad)),
    );

    const onLoadImage = useCallback(() => {
        setShow(true);
        onLoad();
    }, [onLoad, setShow]);

    useEffect(() => {
        if (
            typeof window === 'undefined' ||
            !image ||
            !image.file ||
            !image.file.childImageSharp ||
            !onLoad
        ) {
            return;
        }

        if (image.file.childImageSharp.resize) {
            const img = new Image();
            img.onload = onLoadImage;
            img.src = image.file.childImageSharp.resize.src;
        }
    }, [image, onLoad, onLoadImage]);

    if (!alt && image && image.alt) {
        alt = image.alt;
    }

    return show && image && image.file && image.file.childImageSharp.resize ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={image.file.childImageSharp.resize.src}
            alt={alt}
            {...props}
        />
    ) : image &&
      image.file &&
      image.file.childImageSharp &&
      (image.file.childImageSharp.fixed || image.file.childImageSharp.fluid) ? (
        <Img
            {...classNameFnc(className ? className : '')}
            fixed={image.file.childImageSharp.fixed}
            fluid={
                aspectRatio && image.file.childImageSharp.fluid
                    ? {
                          ...image.file.childImageSharp.fluid,
                          aspectRatio,
                      }
                    : image.file.childImageSharp.fluid
            }
            alt={alt}
            onLoad={onLoad ? onLoad : null}
            {...props}
        />
    ) : image && image.file && image.file.publicURL ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={image.file.publicURL}
            alt={alt}
            {...props}
        />
    ) : typeof image === 'string' ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={image}
            alt={alt}
        />
    ) : null;
}
