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
    Card,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

export default function CardsSection({ cards }) {
    return (
        <Section>
            <Container>
                <Row>
                    {cards.map((card, index) => {
                        return (
                            <Col
                                key={index}
                                col={{ xs: 12, lg: 4 }}
                                className={`mb-3 mb-lg-0 ${style.solutionsCardContainer}`}
                                data-sal="slide-up"
                                data-sal-delay={`xs-none--lg-${index * 200}`}>
                                <Card
                                    wrapperClassName={`${style.solutionsCard} p-2 p-xxl-3`}
                                    bodyClassName={style.solutionsCardBody}>
                                    <Heading
                                        tag="h4"
                                        className={`large text-primary-600 font-weight-bolder mb-1`}>
                                        {card.title}
                                    </Heading>
                                    <Text
                                        tag="div"
                                        className={`normal text-basic-700`}>
                                        {card.description}
                                    </Text>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </Section>
    );
}

CardsSection.propTypes = {
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
