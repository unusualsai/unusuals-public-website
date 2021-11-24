import React from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    Section,
    Container,
    Row,
    Col,
    className,
} from '@solublestudio/soluto-design-system';

import ImageComponent from '../ImageComponent';

import testimonialBg from '../../img/testimonial-bg.svg';
import style from './style.module.scss';

export default function TestimonialSection({ testimonial, author }) {
    return (
        <Section className={`${style.testimonialSection}`}>
            <ImageComponent
                image={testimonialBg}
                className={style.image}></ImageComponent>
            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 10 }} offset={{ lg: 1 }}>
                        <Text
                            tag="blockquote"
                            className={`heading2 text-basic-100 mb-6`}
                            data-sal="slide-up">
                            {testimonial}
                        </Text>
                        <div
                            data-sal="slide-up"
                            {...className('d-flex align-items-center')}>
                            <ImageComponent
                                className={style.authorImage}
                                image={author.image}></ImageComponent>
                            <div {...className('d-flex flex-column')}>
                                <Text
                                    tag="span"
                                    className={`medium font-weight-bolder text-basic-000`}>
                                    {author.name}
                                </Text>
                                <Text
                                    tag="span"
                                    className={`normal text-basic-200`}>
                                    {author.role}
                                </Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

TestimonialSection.propTypes = {
    testimonial: PropTypes.string,
    author: PropTypes.shape({
        image: PropTypes.any,
        name: PropTypes.string,
        role: PropTypes.string,
    }),
};
