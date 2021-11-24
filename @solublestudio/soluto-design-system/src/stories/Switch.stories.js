import React from 'react';

import { Switch } from '../../';

const defaultSwitch = {
    label: 'Estoy de acuerdo con Lorem Ipsum',
    checked: false,
    defaultChecked: false,
    name: 'switch',
    error: '',
    wrapperClassName: '',
    labelClassName: '',
    className: '',
    validatorClassName: '',
    size: '',
    disabled: false,
};

export default {
    title: '@solublestudio/soluto-design-system/Switch',
    component: Switch,
    argTypes: {
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.label,
        },
        checked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultSwitch.checked,
        },
        defaultChecked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultSwitch.defaultChecked,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.error,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSwitch.validatorClassName,
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultSwitch.disabled,
        },
    },
};

const Template = (args) => {
    return <Switch {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    ...defaultSwitch,
    onChange: (e) => {
        console.log('changed', e.target.checked);
    },
};
