import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
    HTMLComponent,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';

import style from './style.module.scss';

export default function HTMLSection({
    pretitle,
    title,
    text,
    cta,
    children,
    className,
}) {
    return (
        <Section className={className ? className : ''}>
            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 8 }} offset={{ lg: 2 }}>
                        {pretitle && (
                            <Heading
                                tag="h4"
                                className="caption text-basic-700 text-uppercase mb-3 mb-lg-4 mb-xxl-5">
                                {pretitle}
                            </Heading>
                        )}
                        {title && (
                            <Heading
                                tag="h2"
                                className="heading1 text-basic-900">
                                {title}
                            </Heading>
                        )}
                        <HTMLComponent text={text} className={style.text}>
                            {children}
                        </HTMLComponent>
                        {cta ? (
                            <ButtonComponent
                                button={{
                                    ...cta,
                                    type: 'primaryButton',
                                    className: 'mt-3 mt-lg-4 mt-xxl-5',
                                }}></ButtonComponent>
                        ) : null}
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

HTMLSection.propTypes = {
    pretitle: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
};
