import React from 'react';

import { Checkbox } from '../../';

const defaultCheckbox = {
    label: 'Estoy de acuerdo con Lorem Ipsum',
    checked: false,
    defaultChecked: false,
    name: 'checkbox',
    error: '',
    wrapperClassName: '',
    labelClassName: '',
    className: '',
    validatorClassName: '',
    size: '',
    disabled: false,
};

export default {
    title: '@solublestudio/soluto-design-system/Checkbox',
    component: Checkbox,
    argTypes: {
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.label,
        },
        checked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultCheckbox.checked,
        },
        defaultChecked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultCheckbox.defaultChecked,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.error,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCheckbox.validatorClassName,
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultCheckbox.disabled,
        },
    },
};

const Template = (args) => {
    return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    ...defaultCheckbox,
    onChange: (e) => {
        console.log('changed', e.target.checked);
    },
};
