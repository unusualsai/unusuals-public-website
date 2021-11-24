import React from 'react';

import CardsSection from '../components/CardsSection';

const defaultCardsSection = {
    cards: [
        {
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
        {
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
        {
            title: 'Lorem ipsum',
            description: 'Dolor sit amet',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/CardsSection',
    component: CardsSection,
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
            <CardsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultCardsSection,
};
