import React from 'react';

import Button from '../ButtonComponent';
import GatsbyImageComponent from '../Gatsby/GatsbyImageComponent';
import Wave from '../Wave';

import {
    Heading,
    Text,
    Section,
    Container,
    Row,
    Col,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

export default function CtaBanner({ title, description, cta, video, image }) {
    return (
        <Section className={`bg-basic-900 ${style.ctaBannerSection}`}>
            <Container>
                <Row className={style.ctaContent}>
                    <Col col={{ xs: 12, lg: 8, xxl: 7 }}>
                        <Heading
                            data-sal="slide-up"
                            tag="h2"
                            className="display3 text-basic-000">
                            {title}
                        </Heading>
                        <Text
                            tag="div"
                            data-sal="slide-up"
                            className={[
                                'medium',
                                'text-basic-100',
                                'mt-3',
                                style.description,
                            ].join(' ')}>
                            {description}
                        </Text>
                    </Col>
                    <Col
                        col={{ xs: 12, lg: 3 }}
                        offset={{ lg: 1, xxl: 2 }}
                        data-sal="slide-up"
                        data-sal-delay="xs-none--lg-200"
                        className={[
                            'd-lg-flex',
                            'justify-content-lg-end',
                            'align-items-lg-end',
                        ].join(' ')}>
                        <Button
                            button={{
                                ...cta,
                                type: 'primaryButton',
                                className: 'mt-6 mt-lg-0',
                            }}
                        />
                    </Col>
                </Row>
                <div className={style.ctaBackground}>
                    <Wave video={video} />
                    <GatsbyImageComponent
                        image={image}
                        className={style.ctaImage}
                    />
                </div>
            </Container>
        </Section>
    );
}
