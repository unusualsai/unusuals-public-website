import React from 'react';
import Form from '../components/Form';

const defaultForm = {
    formId: "161600000079897412",
    hiddenFields: [
        {
            key: "resume",
            value: "",
        },
    ]
};

export default {
    title: '@solublestudio/unusuals-design-system/Form',
    component: Form,
    argTypes: {
        formId: {
            type: { name: 'string', required: true },
            defaultValue: defaultForm.formId,
        },
        hiddenFields: {
            type: { name: 'array', required: false },
            defaultValue: defaultForm.hiddenFields,
        },
    },
};

const Template = (args) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .sb-show-main.sb-main-padded {
                    padding: 0 !important;
                }
            `,
                }}
            />
            <Form {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultForm,
};
