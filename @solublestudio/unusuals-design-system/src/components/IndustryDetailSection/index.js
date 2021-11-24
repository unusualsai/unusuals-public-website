import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Text,
    Heading,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import ImageComponent from '../ImageComponent';

import style from './style.module.scss';

export default function IndustryDetailSection({
    title,
    description,
    cta,
    image,
    features,
    dark,
    slug,
}) {
    return (
        <div>
            <div id={slug} className={style.anchor}></div>
            <Section
                className={`${dark ? 'bg-basic-light' : 'bg-basic-000'} ${
                    style.section
                }`}>
                <Container>
                    <Row className={style.row}>
                        <Col col={{ xs: 12, lg: 6 }}>
                            <Heading
                                tag="h2"
                                className={`display3 text-basic-900 mb-2 mb-lg-3 ${style.title}`}
                                data-sal="slide-up"
                                data-sal-delay="xs-none--lg-100">
                                {title}
                            </Heading>
                            <Text
                                tag="div"
                                className="medium text-basic-800 mb-6 mb-lg-8"
                                data-sal="slide-up"
                                data-sal-delay="xs-none--lg-200">
                                {description}
                            </Text>
                            <ButtonComponent
                                button={{
                                    ...cta,
                                    type: 'primaryButton',
                                    className: 'mb-7',
                                }}></ButtonComponent>
                        </Col>
                        <Col
                            col={{ xs: 12, lg: 6 }}
                            data-sal="fade-in"
                            data-sal-delay="xs-none--lg-300">
                            <ImageComponent
                                image={image}
                                className={style.image}></ImageComponent>
                        </Col>
                    </Row>
                    <Row>
                        {features?.map((feature, index) => {
                            return (
                                <Col
                                    key={index}
                                    col={{ xs: 12, lg: 5 }}
                                    offset={{ lg: index % 2 !== 0 ? 1 : 0 }}
                                    className="mt-4 mt-lg-7">
                                    <Heading
                                        tag="h4"
                                        className="large font-weight-bolder text-basic-700 mb-1"
                                        data-sal="slide-up"
                                        data-sal-delay="xs-none--lg-100">
                                        {feature.title}
                                    </Heading>
                                    <Text
                                        tag="div"
                                        className="normal text-basic-700"
                                        data-sal="slide-up"
                                        data-sal-delay="xs-none--lg-200">
                                        {feature.description}
                                    </Text>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </Section>
        </div>
    );
}

IndustryDetailSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    image: PropTypes.any,
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
    dark: PropTypes.bool,
    slug: PropTypes.string,
    features: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
};
