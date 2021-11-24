import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
    Text,
    Card,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import ImageComponent from '../ImageComponent';

import bgImage from '../../img/job-offers-image.svg';

import style from './style.module.scss';

export default function OpenPositionSection({
    title,
    titleTag,
    description,
    openPositions,
    cta,
}) {
    return (
        <Section
            className={`${style.openPositionSection} ${
                openPositions.length > 3 ? style.lessPaddingBottom : ''
            }`}>
            <ImageComponent
                image={bgImage}
                className={style.image}></ImageComponent>
            <Container>
                <Row>
                    <Col className="text-center">
                        <Heading
                            tag={titleTag}
                            className="display2 text-basic-800 mb-2 mb-lg-3 mb-xxl-4"
                            data-sal="slide-up">
                            {title}
                        </Heading>
                        <Text
                            tag="div"
                            className="large text-basic-800 mb-5 mb-lg-7 mb-xxl-10"
                            data-sal="slide-up">
                            {description}
                        </Text>
                    </Col>
                    {openPositions.map((openPosition, index) => {
                        return (
                            <Col
                                key={index}
                                data-sal="slide-up"
                                data-sal-delay={`xs-none--lg-${200 * index}`}
                                col={{
                                    xs: 12,
                                    lg:
                                        openPositions.length < 3 ||
                                        openPositions.length === 4
                                            ? 6
                                            : 4,
                                }}
                                offset={{
                                    lg: openPositions.length < 2 ? 3 : 0,
                                }}
                                className={`${
                                    style.openPositionCardContainer
                                } ${openPositions.length > 3 ? 'mb-2' : ''}`}>
                                <Card
                                    wrapperClassName={style.openPositionCard}
                                    bodyClassName={style.openPositionBodyCard}>
                                    <Heading
                                        tag="h4"
                                        className="large font-weight-bolder text-secondary-400">
                                        {openPosition.title}
                                    </Heading>
                                    {openPosition.subtitle ? (
                                        <Text
                                            tag="p"
                                            className="small font-weight-bolder text-basic-800 mt-1 mb-1">
                                            {openPosition.subtitle}
                                        </Text>
                                    ) : null}
                                    <Text
                                        tag="p"
                                        className={`normal text-basic-700`}>
                                        {openPosition.description}
                                    </Text>
                                    <ButtonComponent
                                        button={{
                                            ...openPosition.cta,
                                            type: 'tertiaryColorSecondary',
                                            className: 'mt-4',
                                        }}></ButtonComponent>
                                </Card>
                            </Col>
                        );
                    })}
                    {openPositions.length < 1 ? (
                        <Col>
                            <ButtonComponent
                                button={{
                                    ...cta,
                                    type: 'primaryButton',
                                }}></ButtonComponent>
                        </Col>
                    ) : null}
                </Row>
            </Container>
        </Section>
    );
}

OpenPositionSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    openPositions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            subtitle: PropTypes.string,
            description: PropTypes.string,
            cta: PropTypes.shape({
                label: PropTypes.string,
                slug: PropTypes.string,
            }),
        }),
    ),
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
};
