import React from 'react';
import FormSection from '../components/FormSection';
import video from '../video/isotipo-low.mp4';

const defaultFormSection = {
    title: 'Let\'s Talk',
    description:
        "If you have any questions, you want more information about one of our services, or you want a free demo of our product; fill in the form or send us an email to: </br> </br> <a href='hello@unusuals.com'> hello@unusuals.com </a>",
    formId: "161600000079897412",
    video: {
        url: video,
        format: "mp4"
    }
};

export default {
    title: '@solublestudio/unusuals-design-system/FormSection',
    component: FormSection,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultFormSection.title,
        },
        description: {
            type: { name: 'string', required: true },
            defaultValue: defaultFormSection.description,
        },
        formId: {
            type: { name: 'string', required: true },
            defaultValue: defaultFormSection.formId,
        },
        video: {
            type: { name: 'object', required: false },
            defaultValue: defaultFormSection.video,
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
            <FormSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultFormSection,
};
