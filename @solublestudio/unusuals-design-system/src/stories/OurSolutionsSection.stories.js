import React from 'react';

import OurSolutionsSection from '../components/OurSolutionsSection';

const defaultOurSolutionsSection = {
    title: 'Our Solution',
    titleTag: 'h2',
    solutions: [
        {
            name: 'Data',
            number: '01',
            title: 'Input Data',
            description:
                'Whether you need to capture data, assess the quality of the one you have or think out of the box; we can help you with your Project.',
            cta: {
                label: 'Read more',
            },
        },
        {
            name: 'Software',
            number: '02',
            title: 'AI post-processing',
            description:
                'Once one of our experts has assessed the input data, the next phase is the AI post-processing. We have spent the last five years developing specific AI algorithms tailored for infrastructure inspection and will need your contribution for training them in your specific user case.',
            cta: {
                label: 'Read more',
            },
        },
        {
            name: 'Output',
            number: '03',
            title: 'Output data',
            description:
                'The insights of our AI will be accessible from our platform in multiple formats that are compatible with your existing processes. We know you are unique, and your challenges are ours.',
            cta: {
                label: 'Read more',
            },
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/OurSolutionsSection',
    component: OurSolutionsSection,
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
            <OurSolutionsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = defaultOurSolutionsSection;
