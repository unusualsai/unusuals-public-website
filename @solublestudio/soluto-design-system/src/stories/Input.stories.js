import React from 'react';

import { Input } from '../../';

const defaultInput = {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    value: '',
    defaultValue: '',
    name: 'input',
    error: '',
    succes: '',
    wrapperClassName: '',
    labelClassName: '',
    className: '',
    validatorClassName: '',
    size: '',
    disabled: false,
};

export default {
    title: '@solublestudio/soluto-design-system/Input',
    component: Input,
    argTypes: {
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.label,
        },
        placeholder: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.placeholder,
        },
        type: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.type,
            control: {
                type: 'select',
                options: ['text', 'email', 'date', 'tel', 'password'],
            },
        },
        value: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.value,
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.defaultValue,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.error,
        },
        success: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.succes,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.validatorClassName,
        },
        size: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.size,
            control: {
                type: 'select',
                options: ['sm', 'lg'],
            },
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultInput.disabled,
        },
    },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const WithError = Template.bind({});

WithError.args = {
    value: 'Manuel',
    error: 'Este nombre no es válido',
};

export const WithSuccess = Template.bind({});

WithSuccess.args = {
    value: 'Andrés',
    success: '¡Nombre válido!',
};

export const Disabled = Template.bind({});

Disabled.args = {
    disabled: true,
};
