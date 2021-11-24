import React from 'react';

import DiscoverCardSection from '../components/DiscoverCardSection';

const defaultDiscoverCardSection = {
    number: "03",
    slug: "output-data",
    title: 'Output data',
    description: 'The insights of our AI will be accessible from our platform in multiple formats that are compatible with your existing processes. We know you are unique, and your challenges are ours.',
    cta: {
        label: `Ask for a demo`
    },
    contents: [
        {
            text: "Either you may need our software to produce results into a specific format, or to be integrated into your specific application. Our team of unusuals will love to have a look at your specific case and propose a solution that caters for your needs."
        },
        {
            text: "Working iteratively with you, we will add your expert knowledge into our software, making it scalable and capable of processing millions of images for you."
        },
        {
            text: "Working together with your subject matter experts, we will fine tune our pre-trained models so they can operate in your environment."
        }
    ]
};

export default {
    title: '@solublestudio/unusuals-design-system/DiscoverCardSection',
    component: DiscoverCardSection,
    argTypes: {
        number: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverCardSection.number,
        },
        slug: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverCardSection.slug,
        },
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverCardSection.title,
        },
        description: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverCardSection.description,
        }
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
            <DiscoverCardSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultDiscoverCardSection,
};
