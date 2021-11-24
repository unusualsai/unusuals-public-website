import React from 'react';

import ButtonComponent from '../components/ButtonComponent';

const defaultButton = {
    type: 'primaryButton',
    block: false,
    className: '',
    link: { slug: '' },
    externalLink: '',
    target: '',
    label: 'Button',
    isSubmit: false,
    size: '',
};

export default {
    title: '@solublestudio/unusuals-design-system/ButtonComponent',
    component: ButtonComponent,
    argTypes: {
        button: {
            type: { name: 'object', required: false },
            defaultValue: defaultButton,
        },
        buttons: {
            type: { name: 'array', required: false },
        },
        dark: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
        },
        Tag: {
            type: { name: 'string', required: false },
            defaultValue: 'a',
        },
    },
};

const Template = (args) => <ButtonComponent {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
    button: {
        ...defaultButton,
        type: 'secondaryButton',
    },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    button: {
        ...defaultButton,
        type: 'tertiaryColorBasic',
    },
};

export const TertiaryColorSecondary = Template.bind({});
TertiaryColorSecondary.args = {
    button: {
        ...defaultButton,
        type: 'tertiaryColorSecondary',
    },
};

export const Block = Template.bind({});
Block.args = {
    button: {
        ...defaultButton,
        block: true,
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    button: {
        ...defaultButton,
        disabled: true,
        Tag: 'button',
    },
};
