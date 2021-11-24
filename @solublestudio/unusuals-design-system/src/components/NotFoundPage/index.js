import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import ImageComponent from '../ImageComponent';
import grid from '../../img/grid.svg';

import Wave from '../Wave';

import style from './style.module.scss';

export default function NotFoundPage({ title, description, cta, video }) {
    return (
        <Section className={`bg-basic-900 ${style.section}`}>
            <div
                className={style.wave}
                data-sal="fade"
                style={{
                    '--sal-delay': '800ms',
                }}>
                <Wave video={video} />
            </div>
            <ImageComponent
                image={grid}
                className={style.image}></ImageComponent>

            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 6 }}>
                        <Heading tag="h1" className="display2 text-basic-100">
                            {title}
                        </Heading>
                        <Heading
                            tag="h3"
                            className="medium text-basic-200 mt-4 mt-lg-5 mt-xxl-6">
                            {description}
                        </Heading>
                    </Col>
                    {cta ? (
                        <Col col={{ xs: 12 }}>
                            <ButtonComponent
                                button={{
                                    ...cta,
                                    type: 'primaryButton',
                                    className: 'mt-7 mt-lg-8 mt-xxl-10',
                                }}></ButtonComponent>
                        </Col>
                    ) : null}
                </Row>
            </Container>
        </Section>
    );
}

NotFoundPage.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
    video: PropTypes.any,
};
