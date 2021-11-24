import React from 'react';

import {
    Section,
    Container,
    Col,
    Row,
    className,
    Pagination,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

import BlogCard from '../BlogCard';

export default function BlogSection({
    LinkTag = 'a',
    categories,
    blogCards,
    numPages = 3,
    pageHref,
    pageNr = 1,
    firstPageHref,
    currentSlug,
    defaultCategory = 'All',
}) {
    return (
        <Section className={`${style.blogSection}`}>
            {categories?.length ? (
                <div {...className('bg-basic-900')}>
                    <Container>
                        <div
                            {...className(
                                `pt-3 pb-3 pt-lg-4 pb-lg-4 pt-xxl-5 pb-xxl-5 ${style.blogCategoriesWrapper}`,
                            )}>
                            <ul
                                {...className(
                                    `list-unstyled mb-0 ${style.blogCategories}`,
                                )}>
                                <li className={style.blogCategory}>
                                    <LinkTag
                                        href={`/${firstPageHref}`}
                                        {...className(
                                            `caption text-uppercase ${
                                                firstPageHref === currentSlug
                                                    ? 'text-primary-400'
                                                    : 'text-basic-100'
                                            }`,
                                        )}>
                                        {defaultCategory}
                                    </LinkTag>
                                </li>
                                {categories.map((category, index) => {
                                    return (
                                        <li
                                            key={`category-${index}`}
                                            className={style.blogCategory}>
                                            <LinkTag
                                                href={`/${category.slug}`}
                                                {...className(
                                                    `caption text-uppercase ${
                                                        category.slug ===
                                                        currentSlug
                                                            ? 'text-primary-400'
                                                            : 'text-basic-100'
                                                    }`,
                                                )}>
                                                {category.title}
                                            </LinkTag>
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* <button className={style.searcherButton}></button> */}
                        </div>
                    </Container>
                </div>
            ) : null}
            <Container>
                <Row className="pt-3 pt-lg-8 pt-xxl-9">
                    {blogCards?.map((blogCard, index) => {
                        return (
                            <Col
                                key={index}
                                col={{ md: 6, lg: 4 }}
                                mb={{ xs: 3 }}>
                                <BlogCard
                                    LinkTag={LinkTag}
                                    date={blogCard.meta.firstPublishedAt}
                                    {...blogCard}
                                />
                            </Col>
                        );
                    })}
                    {numPages > 1 ? (
                        <Col col={{ xs: 12 }}>
                            <Pagination
                                wrapperClassName={style.pagination}
                                pageClassName={style.page}
                                arrowClassName={style.arrow}
                                activeClassName={style.active}
                                pagesDepth={2}
                                pages={numPages}
                                firstPageHref={
                                    firstPageHref
                                        ? `/${firstPageHref}/`
                                        : '/blog'
                                }
                                pageHref={
                                    pageHref
                                        ? `${pageHref}/{page}`
                                        : 'blog/page/{page}'
                                }
                                activePage={pageNr || 1}
                                LinkTag={LinkTag}
                            />
                        </Col>
                    ) : null}
                </Row>
            </Container>
        </Section>
    );
}
