import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Img from 'gatsby-image';

import CssClassNames from '../../../scss/CssClassNames';

const classNameFnc = new CssClassNames({}, ['utility', 'media'])
    .className;

export default function GatsbyImageComponent({
    image,
    alt = '',
    className,
    onLoad,
    aspectRatio = null,
    ...props
}) {
    const imageFile = useMemo(() => {
        if (image?.file) {
            return image.file;
        }

        return image;
    }, [ image ]);

    const [show, setShow] = useState(
        imageFile && imageFile.childImageSharp &&
            (typeof window === 'undefined' ||
                imageFile.childImageSharp.fixed ||
                imageFile.childImageSharp.fluid ||
                (imageFile.childImageSharp.resize && !onLoad)),
    );

    const onLoadImage = useCallback(() => {
        setShow(true);
        onLoad();
    }, [onLoad, setShow]);

    useEffect(() => {
        if (
            typeof window === 'undefined' ||
            !image ||
            !imageFile ||
            !imageFile.childImageSharp ||
            !onLoad
        ) {
            return;
        }

        if (imageFile.childImageSharp.resize) {
            const img = new Image();
            img.onload = onLoadImage;
            img.src = imageFile.childImageSharp.resize.src;
        }
    }, [imageFile, onLoad, onLoadImage]);

    const imageAlt = useMemo(() => {
        return alt ? alt : image?.alt ? image.alt : '';
    }, [ image, alt ]);
    
    return show && imageFile?.childImageSharp?.resize ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={imageFile.childImageSharp.resize.src}
            alt={imageAlt}
            {...props}
        />
    ) : imageFile?.childImageSharp &&
      (imageFile.childImageSharp.fixed || imageFile.childImageSharp.fluid) ? (
        <Img
            {...classNameFnc(className ? className : '')}
            fixed={imageFile.childImageSharp.fixed}
            fluid={
                aspectRatio && imageFile.childImageSharp.fluid
                    ? {
                          ...imageFile.childImageSharp.fluid,
                          aspectRatio,
                      }
                    : imageFile.childImageSharp.fluid
            }
            alt={imageAlt}
            onLoad={onLoad ? onLoad : null}
            {...props}
        />
    ) : imageFile?.publicURL ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={imageFile.publicURL}
            alt={imageAlt}
            {...props}
        />
    ) : typeof imageFile === 'string' ? (
        <img
            {...classNameFnc(`img-fluid ${className ? className : ''}`)}
            src={imageFile}
            alt={imageAlt}
            {...props}
        />
    ) : null;
}
