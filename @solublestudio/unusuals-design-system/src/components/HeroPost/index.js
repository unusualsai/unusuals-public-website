import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
    Text,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import ImageComponent from '../ImageComponent';

import style from './style.module.scss';

export default function HeroPost({ cta, title, image, author }) {
    return (
        <Section className="bg-basic-900">
            <Container>
                <Row>
                    <Col col={{ xs: 12 }} className="d-block d-lg-none">
                        <ButtonComponent
                            button={{
                                ...cta,
                                type: 'returnButton',
                                className: 'mb-4',
                            }}></ButtonComponent>
                    </Col>
                    <Col
                        col={{ xs: 12, lg: 5 }}
                        order={{ lg: 2 }}
                        offset={{ lg: 1 }}>
                        {image && (
                            <ImageComponent
                                className={style.image}
                                image={image}
                            />
                        )}
                    </Col>
                    <Col col={{ xs: 12, lg: 6 }} order={{ lg: 1 }}>
                        <ButtonComponent
                            button={{
                                ...cta,
                                type: 'returnButton',
                                className: 'd-none d-lg-inline-block',
                            }}></ButtonComponent>
                        <Heading
                            tag="h1"
                            className="display3 text-basic-000 mt-4 mb-4 mt-lg-2 mb-lg-8">
                            {title}
                        </Heading>
                        <div className={style.author}>
                            <ImageComponent
                                className={style.authorImage}
                                image={author?.image}
                                alt={author?.name}
                            />
                            <Text
                                tag="p"
                                className="medium font-weight-bolder text-basic-000">
                                {author?.name}
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

HeroPost.propTypes = {
    title: PropTypes.string,
    image: PropTypes.any,
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
    author: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.any,
    }),
};
