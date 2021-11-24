import React from 'react';

import { Breadcrumb } from '../../';

const defaultBreadcrumb = {
    links: [
        {
            title: 'Home',
        },
        {
            title: 'Detail',
        },
        {
            title: '1',
        },
    ],
};

export default {
    title: '@solublestudio/soluto-design-system/Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        links: {
            type: { name: 'object', required: false },
            defaultValue: defaultBreadcrumb.links,
        },
    },
};

const Template = (args) => {
    return <Breadcrumb {...args} />;
};

export const Default = Template.bind({});

Default.args = defaultBreadcrumb;
