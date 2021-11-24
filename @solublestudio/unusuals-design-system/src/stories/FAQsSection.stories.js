import React from 'react';

import FAQsSection from '../components/FAQsSection';

const defaultFAQsSection = {
    faqs: [
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
        },
        {
            title: 'Lorem ipsum',
            description: 'Lorem ipsum',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/FAQsSection',
    component: FAQsSection,
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
            <FAQsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultFAQsSection,
};
