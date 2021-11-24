import React from 'react';
import PropTypes from 'prop-types';

import {
    Heading,
    Text,
    Section,
    Container,
    Row,
    Col,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

export default function TitleTextSection({
    title,
    titleTag = 'h4',
    description,
    dark,
    className,
    tag = "section"
}) {
    return (
        <Section
            Tag={tag}
            className={`${style.titleTextSection} ${
                dark ? 'bg-basic-900' : ''
            } ${className ? className : ''}`}>
            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 6 }}>
                        <Heading
                            tag={titleTag}
                            className={`display2 mb-2 mb-lg-0 ${
                                dark ? 'text-basic-000' : 'text-basic-900'
                            }`}
                            data-sal="slide-up">
                            {title}
                        </Heading>
                    </Col>
                    <Col col={{ xs: 12, lg: 6 }}>
                        <Text
                            tag="div"
                            className={`large ${
                                dark ? 'text-basic-100' : 'text-basic-700'
                            }`}
                            data-sal="slide-up"
                            data-sal-delay="xs-none--lg-200">
                            {description}
                        </Text>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

TitleTextSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    dark: PropTypes.bool,
};
