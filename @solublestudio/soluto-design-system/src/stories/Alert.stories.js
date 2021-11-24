import React from 'react';

import { Alert } from '../../';

const defaultAlert = {
    color: 'primary',
    dismissible: false,
};

export default {
    title: '@solublestudio/soluto-design-system/Alert',
    component: Alert,
    argTypes: {
        color: {
            type: { name: 'string', required: false },
            defaultValue: defaultAlert.color,
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
        },
        mt: {
            type: { name: 'string', required: false },
        },
        mb: {
            type: { name: 'string', required: false },
        },
        children: {
            type: { name: 'string', required: true },
            defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nulla arcu. Nullam ultricies elit mauris, id porttitor enim posuere eu. Cras nisl leo, accumsan vel tincidunt ut, malesuada vel tellus. Nullam sed dolor tellus. Aenean vel placerat justo. In auctor odio est. Nullam a gravida ipsum. Proin et aliquet eros. Donec ultrices in urna a bibendum. Aliquam laoreet eros et ex semper dignissim. Etiam bibendum commodo egestas. Curabitur eleifend erat vitae nisi fermentum egestas. Proin aliquet justo quis dui commodo, sed consectetur velit vehicula. Curabitur ex ligula, vehicula a diam in, blandit iaculis magna. Phasellus nec urna maximus, sodales enim vel, tincidunt enim. In laoreet lorem nisl, a vehicula metus consectetur vulputate.',
        },
        dismissible: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultAlert.dismissible,
        },
        onClose: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultAlert.dismissible,
        },
    },
};

const Template = (args) => {
    return <Alert {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
    color: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    color: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
    color: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
    color: 'danger',
};

export const Warning = Template.bind({});
Warning.args = {
    color: 'warning',
};

export const Info = Template.bind({});
Info.args = {
    color: 'info',
};

export const Light = Template.bind({});
Light.args = {
    color: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
    color: 'dark',
};
