import React from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
    Heading,
    Text,
    className,
} from '@solublestudio/soluto-design-system';

import BlogCard from '../BlogCard';
import TitleTextSection from '../TitleTextSection';
import ButtonComponent from '../ButtonComponent';

import style from './style.module.scss';

export default function SummaryPostsSection({
    title,
    titleTag,
    description,
    posts,
    cta,
}) {
    return (
        <>
            {!!description && (
                <TitleTextSection
                    title={title}
                    titleTag={titleTag}
                    description={description}
                    className={style.summaryPostsTitle}></TitleTextSection>
            )}
            <Section
                className={
                    !!description
                        ? style.summaryPostsSectionWithDescription
                        : style.summaryPostsSection
                }>
                <Container>
                    <Row>
                        {!!description ? null : (
                            <Col col={{ xs: 12, lg: 6 }} offset={{ lg: 3 }}>
                                <Heading
                                    tag={titleTag}
                                    className={`heading1 text-basic-900 mb-6 mb-lg-7 mb-xxl-8 text-center`}>
                                    {title}
                                </Heading>
                            </Col>
                        )}
                    </Row>
                    <Row className={!!description ? '' : style.postsContainer}>
                        {posts?.length > 0
                            ? posts.map((post, index) => {
                                  return (
                                      <Col
                                          data-sal="slide-up"
                                          data-sal-delay={`xs-none--lg-${
                                              index * 200
                                          }`}
                                          key={index}
                                          col={{ xs: 12, lg: 4 }}
                                          className={style.blogCardContainer}>
                                          <BlogCard
                                              date={post.meta.firstPublishedAt}
                                              {...post}></BlogCard>
                                      </Col>
                                  );
                              })
                            : null}
                        {!!cta && (
                            <Col data-sal="slide-up" className="text-center">
                                <ButtonComponent
                                    button={{
                                        ...cta,
                                        type: 'primaryButton',
                                        className: 'mt-6 mt-lg-5 mt-xxl-6',
                                    }}></ButtonComponent>
                            </Col>
                        )}
                    </Row>
                </Container>
            </Section>
        </>
    );
}

SummaryPostsSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.shape(BlogCard.propTypes)),
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
};
