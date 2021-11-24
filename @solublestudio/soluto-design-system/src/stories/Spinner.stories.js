import React from 'react';

import { Spinner } from '../components/Spinner';

const defaultSpinner = {
    animation: 'border',
    variant: 'primary',
    size: null,
};

export default {
    title: '@solublestudio/soluto-design-system/Spinner',
    component: Spinner,
    argTypes: {
        animation: {
            type: { name: 'string', required: true },
            control: {
                type: 'select',
                options: ['border', 'grow'],
            },
            defaultValue: defaultSpinner.animation,
        },
        variant: {
            type: { name: 'string', required: false },
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
                ],
            },
            defaultValue: defaultSpinner.variant,
        },
        size: {
            type: { name: 'string', required: false },
            defaultValue: defaultSpinner.size,
        },
    },
};

const Template = (args) => {
    return <Spinner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
    ...defaultSpinner,
};

export const Small = Template.bind({});

Small.args = {
    ...defaultSpinner,
    size: 'sm',
};
