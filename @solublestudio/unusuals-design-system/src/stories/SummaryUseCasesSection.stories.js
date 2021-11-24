import React from 'react';

import SummaryUseCasesSection from '../components/SummaryUseCasesSection';

const defaultSummaryUseCasesSection = {
    title:
        'Unusuals AI-powered software is ready to <strong>detect the following features:</strong>',
    cta: {
        label: 'Learn about all use cases',
    },
    useCases: [
        {
            image: 'https://via.placeholder.com/510x510',
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
        {
            image: 'https://via.placeholder.com/510x510',
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
        {
            image: 'https://via.placeholder.com/510x510',
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/SummaryUseCasesSection',
    component: SummaryUseCasesSection,
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
            <SummaryUseCasesSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultSummaryUseCasesSection,
};
