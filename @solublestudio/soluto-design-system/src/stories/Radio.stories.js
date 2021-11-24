import React from 'react';

import { Radio } from '../../';

const defaultRadio = {
    label: 'Estoy de acuerdo con Lorem Ipsum',
    checked: false,
    defaultChecked: false,
    name: 'radio',
    error: '',
    wrapperClassName: '',
    labelClassName: '',
    className: '',
    validatorClassName: '',
    size: '',
    disabled: false,
};

export default {
    title: '@solublestudio/soluto-design-system/Radio',
    component: Radio,
    argTypes: {
        id: {
            type: { name: 'string', required: true },
            defaultValue: defaultRadio.id,
        },
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.label,
        },
        checked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultRadio.checked,
        },
        defaultChecked: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultRadio.defaultChecked,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.error,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultRadio.validatorClassName,
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultRadio.disabled,
        },
    },
};

const Template = (args) => {
    return (
        <>
            <Radio {...args} id="test-1" label="option 1" />
            <Radio {...args} id="test-2" label="option 2" />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultRadio,
    onChange: (e) => {
        console.log('changed', e.target.checked);
    },
};
