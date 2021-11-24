import React, { useEffect, useState, useRef, useCallback, memo } from 'react';

import {
    Slider,
    Text,
    className,
    GridBox,
} from '@solublestudio/soluto-design-system';

import GatsbyImageComponent from '../Gatsby/GatsbyImageComponent';

const sliderSettings = {
    loop: true,
    nav: false,
    mouseDrag: true,
    arrowKeys: true,
    controls: false,
};

import style from './style.module.scss';

const ArrowIcon = (props) => (
    <svg
        width={13}
        height={8}
        viewBox="0 0 13 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <path
            d="M5.425 7.144V6.136l-4.14-2.412v-.096l4.14-2.412V.208L.385 3.196v.96l5.04 2.988zm7.195 0V6.136L8.48 3.724v-.096l4.14-2.412V.208L7.58 3.196v.96l5.04 2.988z"
            fill="#FAFAFA"
        />
    </svg>
);

const Image = memo(({ image, legend }) => {
    return (
        <>
            <GatsbyImageComponent
                image={image}
                alt={image?.alt}
                className={style.image}
            />
            <Text tag="p" className={`text-basic-100 small ${style.legend}`}>
                {legend}
            </Text>
        </>
    );
});

const Control = ({ dir = 'prev', onClick = () => {}, label = 'prev' }) => (
    <GridBox className={[style.wrapperButton, style[dir]].join(' ')}>
        <button
            {...className(['caption', style.button, style[dir]].join(' '))}
            onClick={onClick}>
            <div className={[style.control, style[dir]].join(' ')}>
                <Text tag="div" className={[style.label, style[dir]].join(' ')}>
                    {label}
                </Text>
                <span {...className([style.arrow, style[dir]].join(' '))}>
                    <ArrowIcon />
                </span>
            </div>
        </button>
    </GridBox>
);

export default function Carousel({
    images,
    prevLabel = 'prev',
    nextLabel = 'next',
}) {
    const isCarousel = images?.length > 1;
    const [sliderImages, setSliderImages] = useState(null);
    let sliderRef = useRef(null);

    const goTo = useCallback(
        (dir) => {
            sliderRef?.current?.slider.goTo(dir);
        },
        [sliderRef],
    );

    useEffect(() => {
        setSliderImages(null);
    }, [images]);

    useEffect(() => {
        if (sliderImages === null && images?.length) {
            setSliderImages(images);
        }
    }, [images, sliderImages]);

    return sliderImages ? (
        <>
            {isCarousel && (
                <Control
                    dir="prev"
                    onClick={() => goTo('prev')}
                    label={prevLabel}
                />
            )}
            <div className={style.container}>
                {isCarousel ? (
                    <Slider settings={sliderSettings} parentRef={sliderRef}>
                        {images.map(({ image, legend }, i) => (
                            <div key={`slider-image-${i}`}>
                                <Image image={image} legend={legend} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className={style.wrapperImage}>
                        <Image
                            image={images[0].image}
                            legend={images[0].legend}
                        />
                    </div>
                )}
            </div>
            {isCarousel && (
                <Control
                    dir="next"
                    onClick={() => goTo('next')}
                    label={nextLabel}
                />
            )}
        </>
    ) : null;
}
