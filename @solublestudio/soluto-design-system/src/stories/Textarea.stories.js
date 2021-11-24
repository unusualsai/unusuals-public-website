import React from 'react';

import { Textarea } from '../../';

const defaultTextarea = {
    label: 'Texto',
    placeholder: 'Escribe algún texto',
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
    title: '@solublestudio/soluto-design-system/Textarea',
    component: Textarea,
    argTypes: {
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.label,
        },
        placeholder: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.placeholder,
        },
        value: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.value,
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.defaultValue,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.error,
        },
        success: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.succes,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.validatorClassName,
        },
        size: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.size,
            control: {
                type: 'select',
                options: ['sm', 'lg'],
            },
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultTextarea.disabled,
        },
    },
};

const Template = (args) => <Textarea {...args} />;

export const Default = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
    value: '',
    error: 'Este campo es obligatorio',
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
    value: 'Lorem ipsum',
    success: '¡Longitud válida!',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};
