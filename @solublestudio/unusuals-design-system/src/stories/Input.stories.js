import React, { createRef, useEffect } from 'react';

import Input from '../components/Input';

export const defaultInput = {
    dark: false,
    transparent: false,
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    submit: false,
    type: 'text',
    name: 'input',
    required: false,
    error: '',
    className: '',
    wrapperClassName: '',
    defaultValue: '',
};

export default {
    title: '@solublestudio/unusuals-design-system/Input',
    component: Input,
    argTypes: {
        dark: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultInput.dark,
        },
        transparent: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultInput.transparent,
        },
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.label,
        },
        placeholder: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.placeholder,
        },
        submit: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultInput.submit,
        },
        type: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.type,
            control: {
                type: 'select',
                options: ['text', 'email', 'date', 'tel', 'password'],
            },
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.name,
        },
        required: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultInput.required,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.error,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.className,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.wrapperClassName,
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: defaultInput.defaultValue,
        },
    },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const DefaultWithError = Template.bind({});
DefaultWithError.args = {
    error: 'Error!',
};
