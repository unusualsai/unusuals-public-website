import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    Heading,
    className,
    Card,
} from '@solublestudio/soluto-design-system';

import ImageComponent from '../ImageComponent';

import Link, { navigate } from 'Link';

import style from './style.module.scss';

function BlogCard({
    date,
    author,
    categories,
    title,
    slug,
    description,
    image,
    categoriesString,
}) {
    return (
        <Card
            wrapperClassName={`bg-basic-000 ${style.blogCard}`}
            bodyClassName={style.blogCardBody}
            onClick={() => navigate(`/${slug}`)}>
            <div {...className(`d-flex flex-wrap p-2 pr-lg-3 pl-lg-3`)}>
                <Text
                    tag="span"
                    {...className(`caption text-uppercase text-basic-700`)}>
                    {categoriesString}
                </Text>
            </div>
            <ImageComponent
                image={image}
                className={style.blogCardImage}></ImageComponent>
            <div {...className(`p-2 pr-lg-3 pl-lg-3 ${style.contentWrapper}`)}>
                <Text
                    tag="p"
                    className={`caption text-basic-700 text-uppercase`}>
                    {date}
                </Text>
                <Link href={slug} title={title}>
                    <Heading
                        tag="h4"
                        className="medium font-weight-bolder text-basic-800 mt-1 mb-1 mt-lg-2">
                        {title}
                    </Heading>
                </Link>
                <Text tag="div" className={`normal text-basic-700`}>
                    {description}
                </Text>
                <div
                    {...className(
                        `d-flex flex-column align-self-end ${style.footer}`,
                    )}>
                    <div
                        {...className(
                            'd-flex align-items-center pt-3 pt-lg-4 ',
                        )}>
                        <ImageComponent
                            image={author?.image}
                            className={style.authorImage}></ImageComponent>
                        <Text tag="p" className={`small text-basic-600 ml-1`}>
                            {author?.name}
                        </Text>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default memo(BlogCard);

BlogCard.propTypes = {
    image: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.shape({
        image: PropTypes.any,
        name: PropTypes.string,
        role: PropTypes.string,
    }),
    categories: PropTypes.array,
    LinkTag: PropTypes.string,
    slug: PropTypes.string,
};
