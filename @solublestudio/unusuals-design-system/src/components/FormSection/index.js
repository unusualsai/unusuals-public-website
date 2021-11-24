import React from 'react';
import imageBackground from '../../img/grid-cta.svg';
import {
    Container,
    Row,
    Col,
    Section,
    Heading,
    Text,
} from '@solublestudio/soluto-design-system';
import ImageComponent from '../ImageComponent';
import Wave from "../Wave";
import Form from "../Form";
import style from './style.module.scss';

export default function FormSection({ title, description, formId, video }) {
    return (
        <Section
            className={[
                style.formSection,
                'bg-basic-900',
                'text-basic-100',
            ].join(' ')}>
            <Container>
                <Row>
                    <Col col={{ xs: 12, lg: 5 }} className={style.colLeft}>
                        <Heading
                            tag="h1"
                            className="mb-4 mb-lg-5 display2"
                            data-sal="slide-up">
                            {title}
                        </Heading>
                    </Col>
                </Row>
                <Row>
                    <Col col={{ xs: 12, lg: 5 }} className={style.colLeft}>
                        <Text
                            tag="div"
                            className="medium" 
                            data-sal="slide-up"
                            data-sal="slide-up">
                            {description}
                        </Text>
                    </Col>
                    <Col
                        col={{ xs: 12, lg: 7 }}
                        mt={{ xs: 3, lg: 0 }}
                        className={[style.colRight].join(' ')}
                        data-sal="slide-up">
                        <Form
                            formId={formId}
                            hiddenFields={[
                                {
                                    key: 'resume',
                                    value: '',
                                },
                            ]}
                        />

                        {video ? 
                            <div className={style.backgroundWave}>
                                <Wave video={video} />
                            </div>
                            : null
                        }

                        {video ?
                            <div className={style.backgroundImage}>
                                <ImageComponent
                                    image={imageBackground} />
                            </div>
                            : null
                        }
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}
