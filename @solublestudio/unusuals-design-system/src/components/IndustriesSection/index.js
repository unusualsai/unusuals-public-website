import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
    Heading,
    Text,
    Section,
    Container,
    Row,
    Col,
    className,
    animateScroll,
    useIsMobile,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

import UnusualAccordion from '../UnusualAccordion';
import ImageComponent from '../ImageComponent';

export default function IndustriesSection({
    title,
    titleTag = 'h4',
    description,
    industries,
}) {
    const isMobile = useIsMobile();
    const [industryActive, setIndustryActive] = useState(0);

    const wrapper = useRef();

    function scrollToElement(item) {
        let scrollTop = item.getBoundingClientRect().top + window.scrollY;
        let scrollMargin = window.outerHeight / -5;

        animateScroll(scrollTop, scrollMargin);
    }

    const onOpenItem = useCallback(
        (index) => {
            if (
                !wrapper?.current ||
                typeof window === 'undefined' ||
                index === null
            ) {
                return;
            }

            setIndustryActive(index);

            if (isMobile) {
                setTimeout(function () {
                    scrollToElement(
                        wrapper.current.children[0].children[index],
                    );
                }, 150);
            }
        },
        [wrapper],
    );

    return (
        <Section className="bg-basic-900">
            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 7 }}>
                        <Heading
                            tag={titleTag}
                            className="display3 text-basic-000 mb-2 mb-lg-5 mb-xxl-6"
                            data-sal="slide-up">
                            {title}
                        </Heading>
                        {description && (
                            <Text
                                tag="div"
                                className="medium text-basic-100"
                                data-sal="slide-up">
                                {description}
                            </Text>
                        )}
                        <div ref={wrapper}>
                            <UnusualAccordion
                                wrapperClassName="mt-4 mt-lg-8 mt-xxl-10"
                                dark={true}
                                items={industries}
                                onOpenItemChange={(index) => {
                                    onOpenItem(index);
                                }}
                                afterContent={industries.map((industry, i) =>
                                    industryActive === i ? (
                                        <div
                                            key={`industy-active-${i}`}
                                            {...className(
                                                `d-flex justify-content-center align-items-end d-lg-none ${style.mobileImage}`,
                                            )}>
                                            <ImageComponent
                                                image={industry.image}
                                            />
                                        </div>
                                    ) : null,
                                )}
                            />
                        </div>
                    </Col>
                    <Col
                        col={{ lg: 5 }}
                        className="d-none d-lg-flex justify-content-lg-center align-items-lg-end">
                        {industries.map((industry, i) =>
                            industryActive === i ? (
                                <ImageComponent
                                    image={industry.image}
                                    key={`industy-image-${i}`}
                                />
                            ) : null,
                        )}
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

IndustriesSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    industries: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.any,
            title: PropTypes.string,
            description: PropTypes.string,
            cta: PropTypes.shape({
                label: PropTypes.string,
                slug: PropTypes.string,
            }),
        }),
    ),
};
