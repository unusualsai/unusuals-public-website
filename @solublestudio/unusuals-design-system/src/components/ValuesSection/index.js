import React from 'react';

import {
    Container,
    Col,
    Row,
    Heading,
    Text,
    Section,
} from '@solublestudio/soluto-design-system';

import TitleTextSection from '../TitleTextSection';
import ImageComponent from 'ImageComponent';

import styles from './styles.module.scss';

export default function ValuesSection({
    title,
    description,
    image,
    values = [],
}) {
    return (
        <Section className={[styles.valuesSection, 'bg-basic-900'].join(' ')}>
            <TitleTextSection
                titleTag="h2"
                title={title}
                description={description}
                titleWidth={5}
                tag="div"
                dark={true}
            />

            {values?.length ? (
                <div className={[styles.lineTop, styles.lineBottom].join(' ')}>
                    <Container pt={{ xs: 3, lg: 10 }} pb={{ xs: 5, lg: 10 }}>
                        <Row
                            className={[
                                'align-items-center',
                                'pt-2',
                                'pt-lg-4',
                            ].join(' ')}>
                            <Col
                                col={{ xs: 12, lg: 6, xxl: 5 }}
                                mt={{ xs: 4, xxl: 0 }}
                                order={{ xs: 2, lg: 1 }}>
                                <ImageComponent image={image} />
                            </Col>
                            <Col
                                col={{ xs: 12, lg: 6, xxl: 6 }}
                                offset={{ xs: 0, xxl: 1 }}
                                order={{ xs: 1, lg: 2 }}>
                                {values?.length
                                    ? values.map((value, index) => {
                                          return (
                                              <div
                                                  key={index}
                                                  className={[
                                                      styles.valuesItem,
                                                  ].join(' ')}
                                                  data-sal="slide-up"
                                                  data-sal-delay={`xs-none--lg-${200 * index}`}>
                                                  <Heading
                                                      tag="h3"
                                                      className={[
                                                          'large',
                                                          'text-primary-500',
                                                          'mb-1',
                                                      ].join(' ')}>
                                                      {value.title}
                                                  </Heading>
                                                  <Text
                                                      className={[
                                                          'medium',
                                                          'text-basic-100',
                                                      ].join(' ')}>
                                                      {value.description}
                                                  </Text>
                                              </div>
                                          );
                                      })
                                    : null}
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : null}
        </Section>
    );
}
