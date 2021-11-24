import React from 'react';

import {
    Container,
    Row,
    Col,
    className,
} from '@solublestudio/soluto-design-system';
import ImageComponent from '../ImageComponent';

import style from './style.module.scss';

export default function OurPartnersSection({ partners }) {
    return (
        <div
            {...className(
                `${style.OurPartnersSection} bg-basic-900 pt-4 pt-lg-6 pb-4 pb-lg-6`,
            )}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <div className={style.logos}>
                            {partners.map((partner, index) => {
                                return (
                                    <ImageComponent
                                        key={`values-section-logo-${index}`}
                                        data-sal="slide-up"
                                        data-sal-delay={`xs-none--lg-${
                                            200 * index
                                        }`}
                                        image={partner}
                                        className={`d-block d-lg-inline-block ${style.logo}`}
                                    />
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
