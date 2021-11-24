import React from 'react';

import Tabs from '../components/Tabs';

const defaultTabs = {
    links: [
        {
            title: 'Home',
        },
        {
            title: 'Detail',
        },
    ],
    wrapperClassName: '',
    liClassName: '',
    linkClassName: '',
    activeClassName: '',
};

export default {
    title: '@solublestudio/unusuals-design-system/Tabs',
    component: Tabs,
    argTypes: {
        links: {
            type: { name: 'object', required: false },
            defaultValue: defaultTabs.links,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTabs.wrapperClassName,
        },
        liClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTabs.liClassName,
        },
        linkClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTabs.linkClassName,
        },
        activeClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTabs.activeClassName,
        },
    },
};

const Template = (args) => {
    return <Tabs {...args} />;
};

export const Default = Template.bind({});

Default.args = defaultTabs;
