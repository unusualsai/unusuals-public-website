import React from 'react';

import BlogCard from '../components/BlogCard';

const defaultBlogCard = {
    date: '12 Feb. ‘21',
    author: {
        image: 'https://via.placeholder.com/64x64',
        name: 'Norberto Gonzalez',
        role: '',
    },
    categories: ['Category1', 'Category2', 'Category2', 'Category2'],
    title: 'dolor sit amet',
    slug: 'http//:google.com',
    description: 'consecteur aspdicing',
    image: 'https://via.placeholder.com/719x524',
};

export default {
    title: '@solublestudio/unusuals-design-system/BlogCard',
    component: BlogCard,
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
            <BlogCard {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultBlogCard,
};
