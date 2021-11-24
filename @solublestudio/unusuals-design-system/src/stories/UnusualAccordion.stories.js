import React from 'react';

import UnusualAccordion from '../components/UnusualAccordion';

const defaultUnusualAccordion = {
    items: [
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: '',
            image: '',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: {
                label: 'read more',
            },
            image: '',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
            cta: {
                label: 'read more',
            },
            image: '',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/UnusualAccordion',
    component: UnusualAccordion,
};

const Template = (args) => {
    return (
        <>
            <UnusualAccordion {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultUnusualAccordion,
};
