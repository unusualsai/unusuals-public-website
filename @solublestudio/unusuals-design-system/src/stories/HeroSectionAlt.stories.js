import React from 'react';

import HeroSectionAlt from '../components/HeroSectionAlt';

const defaultHeroSectionAlt = {
    title: 'Sales manager',
    cta: {
        label: "Apply now"
    }
};

export default {
    title: '@solublestudio/unusuals-design-system/HeroSectionAlt',
    component: HeroSectionAlt,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultHeroSectionAlt.title,
        },
        cta: {
            type: { name: 'object', required: true },
            defaultValue: defaultHeroSectionAlt.cta,
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
            <HeroSectionAlt {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultHeroSectionAlt,
};
