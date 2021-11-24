import React from 'react';

import Logo from '../components/Logo';

const defaultLogo = {
    maxWidth: null,
    light: false
};

export default {
	title: '@solublestudio/unusuals-design-system/Logo',
    component: Logo,
    argTypes: {
        maxWidth: {
            type: { name: 'string', required: true },
            defaultValue: defaultLogo.maxWidth
        },
        light: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultLogo.light
        },
    }
};

const Template = (args) => {
    return (
        <Logo {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    ...defaultLogo
}