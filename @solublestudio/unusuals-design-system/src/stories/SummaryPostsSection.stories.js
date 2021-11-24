import React from 'react';

import SummaryPostsSection from '../components/SummaryPostsSection';

const defaultSummaryPostsSection = {
    title: 'Our latest posts',
    titleTag: 'h2',
    description:
        'The most unusual and interesting news and reflections related with AI, innovation and technology. ',
    posts: [
        {
            date: '12 Feb. ‘21',
            author: {
                image: 'https://via.placeholder.com/64x64',
                name: 'Norberto Gonzalez',
                role: '',
            },
            categories: ['Category1'],
            title: 'dolor sit amet',
            link: 'http//:google.com',
            description: 'consecteur aspdicing',
            image: 'https://via.placeholder.com/719x524',
        },
        {
            date: '12 Feb. ‘21',
            author: {
                image: 'https://via.placeholder.com/64x64',
                name: 'Norberto Gonzalez',
                role: '',
            },
            categories: ['Category1', 'Category2', 'Category2', 'Category2'],
            title: 'dolor sit amet',
            link: 'http//:google.com',
            description: 'consecteur aspdicing',
            image: 'https://via.placeholder.com/719x524',
        },
        {
            date: '12 Feb. ‘21',
            author: {
                image: 'https://via.placeholder.com/64x64',
                name: 'Norberto Gonzalez',
                role: '',
            },
            categories: ['Category1', 'Category2'],
            title: 'dolor sit amet',
            link: 'http//:google.com',
            description: 'consecteur aspdicing',
            image: 'https://via.placeholder.com/719x524',
        },
    ],
    cta: { label: 'view all' },
};

export default {
    title: '@solublestudio/unusuals-design-system/SummaryPostsSection',
    component: SummaryPostsSection,
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
            <SummaryPostsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultSummaryPostsSection,
};
