import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
    Text,
    className,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import ImageComponent from '../ImageComponent';

import style from './style.module.scss';

export default function SummaryUseCasesSection({
    title,
    titleTag,
    useCases,
    cta,
}) {
    return (
        <Section>
            <Container>
                <Row>
                    <Col
                        col={{ xs: 12, lg: 10, xxl: 8 }}
                        offset={{ lg: 1, xxl: 2 }}>
                        <Heading
                            tag={titleTag}
                            data-sal="slide-up"
                            className={`display3 text-basic-900 mb-5 mb-lg-8 mb-xxl-11 text-center ${style.summaryUseCasesTitle}`}>
                            {title}
                        </Heading>
                    </Col>
                    {useCases.map((useCase, index) => {
                        return (
                            <Col
                                key={index}
                                col={{ xs: 12, lg: 4 }}
                                className="mb-5 mb-lg-0"
                                data-sal="slide-up"
                                data-sal-delay={`xs-none--lg-${index * 200}`}>
                                <ImageComponent
                                    className={style.useCaseImage}
                                    image={useCase.image}></ImageComponent>
                                <Heading
                                    tag="h4"
                                    className={`medium text-basic-800 font-weight-bolder mt-2 mb-1`}>
                                    {useCase.title}
                                </Heading>
                                <Text
                                    tag="div"
                                    className={`normal text-basic-700`}>
                                    {useCase.description}
                                </Text>
                            </Col>
                        );
                    })}
                    <Col data-sal="slide-up" className="text-center">
                        <ButtonComponent
                            button={{
                                ...cta,
                                type: 'primaryButton',
                                className: 'mt-1 mt-lg-7 mt-xxl-10',
                            }}></ButtonComponent>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

SummaryUseCasesSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    useCases: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.any,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
};
