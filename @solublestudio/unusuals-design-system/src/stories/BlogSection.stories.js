import React from 'react';

import BlogSection from '../components/BlogSection';

const defaultBlogSection = {
    pretitle: 'blog',
    title: 'Quirks',
    description:
        'The most unusual and interesting news and reflections related with AI, innovation and technology.',
    categories: [
        { title: 'all' },
        { title: 'category1' },
        { title: 'category2' },
        { title: 'category3' },
        { title: 'category4' },
        { title: 'category5' },
        { title: 'category6' },
    ],
    blogCards: [
        {
            date: '12 Feb. ‘21',
            author: {
                name: 'Norberto Gonzalez',
                image: 'https://via.placeholder.com/72x72',
            },
            categories: ['Category1,', 'Category2,', 'Category2', 'Category2'],
            title: 'dolor sit amet dolor sit amet',
            link: 'google.com',
            extract:
                'Sí, sabemos lo que estás pensando, el título es un poco click bait. Pero aunque parezca mentira, según nuestra… Sí, sabemos lo que estás pensando, el título es un poco click bait. Pero aunque parezca mentira, según nuestra…',
            image: 'https://via.placeholder.com/719x524',
            cta: {
                label: 'Read more',
            },
        },
        {
            date: '12 Feb. ‘21',
            author: {
                name: 'Norberto Gonzalez',
                image: 'https://via.placeholder.com/72x72',
            },
            categories: ['Category1,', 'Category2,', 'Category2', 'Category2'],
            title: 'dolor sit amet dolor sit amet dolor sit amet',
            link: 'google.com',
            extract: 'consecteur aspdicing',
            image: 'https://via.placeholder.com/719x524',
            cta: {
                label: 'Read more',
            },
        },
        {
            date: '12 Feb. ‘21',
            author: {
                name: 'Norberto Gonzalez',
                image: 'https://via.placeholder.com/72x72',
            },
            categories: ['Category1,', 'Category2,', 'Category2', 'Category2'],
            title: 'dolor sit amet',
            link: 'google.com',
            extract: 'consecteur aspdicing',
            image: 'https://via.placeholder.com/719x524',
            cta: {
                label: 'Read more',
            },
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/BlogSection',
    component: BlogSection,
    argTypes: {
        blogCards: {
            type: { name: 'array', required: false },
            defaultValue: defaultBlogSection.blogCards,
        },
    },
};

const Template = (args) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .sb-show-main.sb-main-padded {
                    padding: 0 !important;
                }
            `,
                }}
            />
            <BlogSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultBlogSection,
};
