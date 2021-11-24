import React from 'react';

import DiscoverSection from '../components/DiscoverSection';

const defaultDiscoverSection = {
    title: "Discover our process",
    description: "Big words explained easy. AI may sound challenging, but the deployment of our software is easy. There are three major stages illustrated hereafter.",
    footer: "Increase your operational efficiency, reduce maintenance costs and maximise the life span of your assets.",
    sections: [
        {
            number: "01",
            slug: "output-data-1",
            title: 'Output data',
            description: 'The insights of our AI will be accessible from our platform in multiple formats that are compatible with your existing processes. We know you are unique, and your challenges are ours.',
            cta: {
                label: 'Ask for a demo'
            },
            contents: [
                {
                    text: "Either you may need our software to produce results into a specific format, or to be integrated into your specific application. Our team of unusuals will love to have a look at your specific case and propose a solution that caters for your needs."
                },
                {
                    text: "Working iteratively with you, we will add your expert knowledge into our software, making it scalable and capable of processing millions of images for you."
                }
            ]
        },
        {
            number: "02",
            slug: "output-data-2",
            title: 'Output data',
            description: 'The insights of our AI will be accessible from our platform in multiple formats that are compatible with your existing processes. We know you are unique, and your challenges are ours.',
            cta: {
                label: 'Ask for a demo'
            },
            contents: [
                {
                    text: "Either you may need our software to produce results into a specific format, or to be integrated into your specific application. Our team of unusuals will love to have a look at your specific case and propose a solution that caters for your needs."
                },
                {
                    text: "Working iteratively with you, we will add your expert knowledge into our software, making it scalable and capable of processing millions of images for you."
                }
            ]
        },
        {
            number: "03",
            slug: "output-data-3",
            title: 'Output data',
            description: 'The insights of our AI will be accessible from our platform in multiple formats that are compatible with your existing processes. We know you are unique, and your challenges are ours.',
            cta: {
                label: 'Ask for a demo'
            },
            contents: [
                {
                    text: "Either you may need our software to produce results into a specific format, or to be integrated into your specific application. Our team of unusuals will love to have a look at your specific case and propose a solution that caters for your needs."
                },
                {
                    text: "Working iteratively with you, we will add your expert knowledge into our software, making it scalable and capable of processing millions of images for you."
                }
            ]
        }
    ]
};

export default {
    title: '@solublestudio/unusuals-design-system/DiscoverSection',
    component: DiscoverSection,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverSection.title,
        },
        description: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverSection.description,
        },
        footer: {
            type: { name: 'string', required: true },
            defaultValue: defaultDiscoverSection.footer,
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
            <DiscoverSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultDiscoverSection,
};
