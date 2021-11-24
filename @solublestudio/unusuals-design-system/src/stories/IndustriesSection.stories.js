import React from 'react';

import IndustriesSection from '../components/IndustriesSection';

const defaultIndustriesSection = {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum',
    industries: [
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: {
                label: 'read more',
            },
            image: 'https://via.placeholder.com/155x298',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: {
                label: 'read more',
            },
            image: 'https://via.placeholder.com/253x494',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: {
                label: 'read more',
            },
            image: 'https://via.placeholder.com/594x253',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/IndustriesSection',
    component: IndustriesSection,
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
            <IndustriesSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultIndustriesSection,
};
