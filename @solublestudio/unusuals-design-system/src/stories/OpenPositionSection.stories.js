import React from 'react';

import OpenPositionSection from '../components/OpenPositionSection';

const defaultOpenPositionSection = {
    title: 'Are you also unusual?',
    titleTag: 'h2',
    description:
        'If our message resonates with you, have a look at the following openings in our team.',
    openPositions: [
        {
            title: 'Lorem ipsum',
            subtitle: 'dolor sit amet',
            description:
                'consecteur aspdicing,consecteur aspdicing, consecteur aspdicing, consecteur aspdicing',
            cta: {
                label: 'Read more',
            },
        },
        {
            title: 'Lorem ipsum',
            subtitle: 'dolor sit amet',
            description: 'consecteur aspdicing',
            cta: {
                label: 'Read more',
            },
        },
        {
            title: 'Lorem ipsum',
            subtitle: 'dolor sit amet',
            description: 'consecteur aspdicing',
            cta: {
                label: 'Read more',
            },
        },
        {
            title: 'Lorem ipsum',
            subtitle: 'dolor sit amet',
            description: 'consecteur aspdicing',
            cta: {
                label: 'Read more',
            },
        },
    ],
    cta: {
        label: 'contact',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/OpenPositionSection',
    component: OpenPositionSection,
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
            <OpenPositionSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultOpenPositionSection,
};
