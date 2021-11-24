import React, { useMemo } from 'react';

import ImageComponent from 'ImageComponent';
import Wave from '../Wave';

import {
    Text,
    Container,
    Row,
    Col,
    Section,
    Heading,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

export default function HeroSection({
    title,
    titleDisplay = null,
    subtitle,
    clients,
    image,
    images,
    coverImage,
    video,
}) {
    const theImage = useMemo(
        () =>
            images?.length
                ? images[Math.floor(Math.random() * images.length)]
                : image
                ? image
                : null,
        [image, images],
    );
    return (
        <Section
            className={[
                'bg-basic-900',
                style.hero,
                coverImage ? style.heroCoverImage : null,
            ].join(' ')}>
            <div className={style.wave}>
                <Wave video={video} />
            </div>

            {theImage ? (
                <ImageComponent image={theImage} className={style.heroImage} />
            ) : null}

            {coverImage ? (
                <div
                    className={style.coverImage}
                    data-sal="slide-up"
                    style={{
                        '--sal-delay': '300ms',
                    }}>
                    <ImageComponent image={coverImage} />
                </div>
            ) : null}

            <Container>
                <Row className="align-items-center position-relative">
                    <Col
                        pt={{ xs: 3, lg: 9, xxl: 10 }}
                        col={{ xs: 12, md: 10, lg: 8 }}>
                        <Heading
                            tag="h1"
                            className={[
                                titleDisplay ? titleDisplay : 'display2',
                                'text-basic-100',
                                'mb-4 mb-lg-5',
                                style.title,
                            ].join(' ')}
                            data-sal="slide-up">
                            {title}
                        </Heading>
                    </Col>
                    <Col col={{ xs: 12, md: 10, lg: 6, xxl: 5 }}>
                        <Text
                            tag="div"
                            className={[
                                'medium',
                                'text-basic-200',
                                'mb-4 mb-lg-7',
                            ].join(' ')}
                            data-sal="slide-up"
                            style={{
                                '--sal-delay': '200ms',
                            }}>
                            {subtitle}
                        </Text>
                    </Col>
                </Row>
                {clients?.length > 0 && (
                    <Row>
                        <Col
                            col={{ xs: 12, md: 10, lg: 6 }}
                            pb={{ xs: 6, lg: 10 }}>
                            <div className={style.logos}>
                                {clients.map((logo, i) => (
                                    <ImageComponent
                                        image={logo}
                                        className={style.logo}
                                        key={`hero-section-logo-${i}`}
                                        data-sal="slide-up"
                                        style={{
                                            '--sal-delay': `${300 + 100 * i}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </Section>
    );
}
