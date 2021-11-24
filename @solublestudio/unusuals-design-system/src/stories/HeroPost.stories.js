import React from 'react';

import HeroPost from '../components/HeroPost';

const defaultHeroPost = {
    cta: {
        label: 'Blog',
    },
    title: 'Detecting the unusual to become exceptional',
    author: {
        name: 'Norberto Gonzalez',
        image: 'https://via.placeholder.com/40x40',
    },
    image: 'https://via.placeholder.com/448x229',
};

export default {
    title: '@solublestudio/unusuals-design-system/HeroPost',
    component: HeroPost,
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
            <HeroPost {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultHeroPost,
};
