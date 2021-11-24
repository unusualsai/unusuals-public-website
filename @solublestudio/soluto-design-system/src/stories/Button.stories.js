import React from 'react';

import { Button } from '../../';

export default {
    title: '@solublestudio/soluto-design-system/Button',
    component: Button,
    argTypes: {
        type: {
            type: { name: 'string', required: true },
            defaultValue: 'primary',
            control: {
                type: 'select',
                options: [
                    'primary',
                    'secondary',
                    'success',
                    'danger',
                    'warning',
                    'info',
                    'light',
                    'dark',
                    'link',
                ],
            },
        },
        size: {
            type: { name: 'string', required: false },
            defaultValue: null,
            control: {
                type: 'select',
                options: ['sm', 'lg'],
            },
        },
        block: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
        },
        children: {
            type: { name: 'string', required: true },
            defaultValue: 'Button',
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
        },
        Tag: {
            type: { name: 'string', required: false },
            defaultValue: 'a',
        },
        href: {
            type: { name: 'string', required: false },
            defaultValue: '#',
        },
        target: {
            type: { name: 'string', required: false },
            defaultValue: '_self',
            control: {
                type: 'select',
                options: ['_self', '_blank'],
            },
        },
        isGatsby: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
        },
        className: {
            type: { name: 'string', required: false },
        },
        onClick: {
            action: 'onClick',
        },
        onFocus: {
            action: 'onFocus',
        },
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
    type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
    type: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
    type: 'danger',
};

export const Warning = Template.bind({});
Warning.args = {
    type: 'warning',
};

export const Info = Template.bind({});
Info.args = {
    type: 'info',
};

export const Light = Template.bind({});
Light.args = {
    type: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
    type: 'dark',
};

export const Link = Template.bind({});
Link.args = {
    type: 'link',
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
    size: 'sm',
};

export const Block = Template.bind({});
Block.args = {
    block: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    Tag: 'button',
};
