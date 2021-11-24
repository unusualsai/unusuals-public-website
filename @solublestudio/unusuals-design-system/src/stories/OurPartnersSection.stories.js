import React from 'react';

import OurPartnersSection from '../components/OurPartnersSection';

const defaultOurPartnersSection = {
    title: 'Our partners',
    partners: [
        'https://via.placeholder.com/64x32',
        'https://via.placeholder.com/64x32',
        'https://via.placeholder.com/64x32',
        'https://via.placeholder.com/64x32',
        'https://via.placeholder.com/64x32',
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/OurPartnersSection',
    component: OurPartnersSection,
    argTypes: {
        title: {
            type: { name: 'string', required: false },
            defaultValue: defaultOurPartnersSection.title,
        },
        partners: {
            type: { name: 'array', required: false },
            defaultValue: defaultOurPartnersSection.partners,
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
            <OurPartnersSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultOurPartnersSection,
};
