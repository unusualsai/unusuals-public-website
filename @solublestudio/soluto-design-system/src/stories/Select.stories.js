import React, { useRef, useEffect } from 'react';

import { Select } from '../../';

const defaultSelect = {
    label: 'Cargo',
    placeholder: 'Cuál es tu cargo',
    name: 'select',
    error: '',
    success: '',
    wrapperClassName: '',
    labelClassName: '',
    className: '',
    validatorClassName: '',
    size: '',
    disabled: false,
    options: {
        ceo: 'CEO',
        cto: 'CTO',
        cmo: 'CMO',
        cso: 'CSO',
    },
};

export default {
    title: '@solublestudio/soluto-design-system/Select',
    component: Select,
    argTypes: {
        label: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.label,
        },
        placeholder: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.placeholder,
        },
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.name,
        },
        error: {
            type: { name: 'string', required: false },
            defaultSelect: defaultSelect.error,
        },
        success: {
            type: { name: 'string', required: false },
            defaultSelect: defaultSelect.success,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.wrapperClassName,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.className,
        },
        labelClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.labelClassName,
        },
        validatorClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.validatorClassName,
        },
        size: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.size,
            control: {
                type: 'select',
                options: ['sm', 'lg'],
            },
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultSelect.disabled,
        },
        value: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.value,
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: defaultSelect.defaultValue,
        },
    },
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = defaultSelect;

const TemplateSelectingAfter = (args) => {
    const ref = useRef();

    useEffect(() => {
        setTimeout(() => {
            ref.current.changeValue('cmo');
        }, 1000);
    }, [ref]);

    return <Select ref={ref} {...args} />;
};

export const DefaultSelectingAfter = TemplateSelectingAfter.bind({});
DefaultSelectingAfter.args = defaultSelect;
