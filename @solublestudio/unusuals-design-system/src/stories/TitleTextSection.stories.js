import React from 'react';

import TitleTextSection from '../components/TitleTextSection';

const defaultTitleTextSection = {
    title: 'Benefits',
    titleTag: 'h2',
    description:
        'At Unusuals we aim to provide you with customized cutting-edge AI technology which will process vast amount of data for you using the knowledge of your experts. The insights of our software will help you maintain your infrastructure in a more efficient way.',
    dark: true
};

export default {
    title: '@solublestudio/unusuals-design-system/TitleTextSection',
    component: TitleTextSection,
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
            <TitleTextSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = defaultTitleTextSection;
