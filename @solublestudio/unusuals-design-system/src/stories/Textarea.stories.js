import React from 'react';

import Textarea from '../components/Textarea';

const defaultTextarea = {
    dark: false,
    transparent: false,
    label: 'Mensaje',
    placeholder: 'Escribe tu mensaje',
    name: 'input',
    required: false,
    error: '',
    className: '',
    wrapperClassName: '',
    defaultValue: '',
};

export default {
    title: '@solublestudio/unusuals-design-system/Textarea',
    component: Textarea,
    argTypes: {
        dark: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultTextarea.dark,
        },
        transparent: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultTextarea.transparent,
        },
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.label,
        },
        placeholder: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.placeholder,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.name,
        },
        required: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultTextarea.required,
        },
        error: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.error,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.className,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.wrapperClassName,
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: defaultTextarea.defaultValue,
        },
    },
};

const Template = (args) => <Textarea {...args} />;

export const Default = Template.bind({});

export const DefaultWithError = Template.bind({});
DefaultWithError.args = {
    error: 'Error!',
};