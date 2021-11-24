import React from 'react';

import IndustriesDetailSection from '../components/IndustriesDetailSection';
import Header from '../components/Header';

const defaultIndustriesDetailSection = {
    industries: [
        {
            title: 'Electric power transmission',
            titleTag: 'h3',
            description:
                'More than 5.5 million Circuit kilometers worldwide, covering one of the most remote areas in the planet.',
            image: 'https://via.placeholder.com/465x367',
            cta: {
                label: 'Ask for a demo',
            },
            features: [
                {
                    title: 'Regular maintenance',
                    description:
                        'Regular maintenance includes video analysis of the lines and thermographic inspections scanning for rust, broken isolators, bended bars, hot spots, broken mechanical fixations, etc.',
                },
                {
                    title: 'Game changer software',
                    description:
                        'Traditionally, the files coming out from these inspections were analyzed by the different subject matter experts in each area. Unusuals software will allow your experts to boost their productivity by analyzing millions of files.',
                },
            ],
            dark: true,
            slug: 'electricpowertransmission',
        },
        {
            title: 'Railways',
            titleTag: 'h3',
            description:
                'More than 5.5 million Circuit kilometers worldwide, covering one of the most remote areas in the planet.',
            image: 'https://via.placeholder.com/465x367',
            cta: {
                label: 'Ask for a demo',
            },
            features: [
                {
                    title: 'Regular maintenance',
                    description:
                        'Regular maintenance includes video analysis of the lines and thermographic inspections scanning for rust, broken isolators, bended bars, hot spots, broken mechanical fixations, etc.',
                },
                {
                    title: 'Game changer software',
                    description:
                        'Traditionally, the files coming out from these inspections were analyzed by the different subject matter experts in each area. Unusuals software will allow your experts to boost their productivity by analyzing millions of files.',
                },
            ],
            dark: false,
            slug: 'railways',
        },
        {
            title: 'Telecommunications',
            titleTag: 'h3',
            description:
                'More than 5.5 million Circuit kilometers worldwide, covering one of the most remote areas in the planet.',
            image: 'https://via.placeholder.com/465x367',
            cta: {
                label: 'Ask for a demo',
            },
            features: [
                {
                    title: 'Regular maintenance',
                    description:
                        'Regular maintenance includes video analysis of the lines and thermographic inspections scanning for rust, broken isolators, bended bars, hot spots, broken mechanical fixations, etc.',
                },
                {
                    title: 'Game changer software',
                    description:
                        'Traditionally, the files coming out from these inspections were analyzed by the different subject matter experts in each area. Unusuals software will allow your experts to boost their productivity by analyzing millions of files.',
                },
            ],
            dark: true,
            slug: 'telecommunications',
        },
        {
            title: 'Wind power generation parks',
            titleTag: 'h3',
            description:
                'More than 5.5 million Circuit kilometers worldwide, covering one of the most remote areas in the planet.',
            image: 'https://via.placeholder.com/465x367',
            cta: {
                label: 'Ask for a demo',
            },
            features: [
                {
                    title: 'Regular maintenance',
                    description:
                        'Regular maintenance includes video analysis of the lines and thermographic inspections scanning for rust, broken isolators, bended bars, hot spots, broken mechanical fixations, etc.',
                },
                {
                    title: 'Game changer software',
                    description:
                        'Traditionally, the files coming out from these inspections were analyzed by the different subject matter experts in each area. Unusuals software will allow your experts to boost their productivity by analyzing millions of files.',
                },
            ],
            dark: false,
            slug: 'windpowergenerationparks',
        },
        {
            title: 'Solar power generation parks',
            titleTag: 'h3',
            description:
                'More than 5.5 million Circuit kilometers worldwide, covering one of the most remote areas in the planet.',
            image: 'https://via.placeholder.com/465x367',
            cta: {
                label: 'Ask for a demo',
            },
            features: [
                {
                    title: 'Regular maintenance',
                    description:
                        'Regular maintenance includes video analysis of the lines and thermographic inspections scanning for rust, broken isolators, bended bars, hot spots, broken mechanical fixations, etc.',
                },
                {
                    title: 'Game changer software',
                    description:
                        'Traditionally, the files coming out from these inspections were analyzed by the different subject matter experts in each area. Unusuals software will allow your experts to boost their productivity by analyzing millions of files.',
                },
            ],
            dark: true,
            slug: 'solarpowergenerationparks',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/IndustriesDetailSection',
    component: IndustriesDetailSection,
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
            <Header></Header>
            <main data-navbar-child-height="true">
                <IndustriesDetailSection {...args} />
            </main>
        </>
    );
};

export const Default = Template.bind({});

Default.args = defaultIndustriesDetailSection;
