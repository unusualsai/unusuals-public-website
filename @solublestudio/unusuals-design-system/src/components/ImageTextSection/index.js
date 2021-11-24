import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Text,
} from '@solublestudio/soluto-design-system';

import ImageComponent from '../ImageComponent';

export default function ImageTextSection({ title, description, image }) {
    return (
        <Section className="bg-basic-light">
            <Container>
                <Row>
                    <Col
                        col={{ xs: 12, lg: 6 }}
                        offset={{ lg: 1 }}
                        order={{ lg: 1 }}
                        className="pt-lg-4">
                        <Text
                            tag="div"
                            className="heading2 text-basic-900 mb-4"
                            data-sal="slide-up">
                            {title}
                        </Text>
                        <Text
                            tag="div"
                            className="medium text-basic-800 mb-5 mb-lg-0"
                            data-sal="slide-up">
                            {description}
                        </Text>
                    </Col>
                    <Col
                        col={{ xs: 12, lg: 5 }} 
                        data-sal="slide-up">
                        <ImageComponent image={image}></ImageComponent>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

ImageTextSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    image: PropTypes.any,
};
