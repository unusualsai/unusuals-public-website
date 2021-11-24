import React from 'react';

import BenefitsSection from '../components/BenefitsSection';

const defaultBenefitsSection = {
    title: 'Benefits',
    titleTag: 'h2',
    description:
        'At Unusuals we aim to provide you with customized cutting-edge AI technology which will process vast amount of data for you using the knowledge of your experts. The insights of our software will help you maintain your infrastructure in a more efficient way.',
    benefits: [
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
        {
            icon: 'https://via.placeholder.com/48x48',
            title: 'Savings and safety',
            titleTag: 'h4',
            description:
                'Remote condition monitoring of your infrastructure will save your co-workers travelling to remote areas, reducing associated time and costs, and also their exposure to hazardous situations.',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/BenefitsSection',
    component: BenefitsSection,
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
            <BenefitsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = defaultBenefitsSection;
