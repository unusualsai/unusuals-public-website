import React from 'react';

import PointsSection from '../components/PointsSection';

const defaultPointsSection = {
    points: [
        {
            number: '01',
            title: 'Both on image and LiDAR',
            description:
                'Condition monitoring using as input data images and/or 3D models (LiDAR files). Let us assess your data and start training our models.',
        },
        {
            number: '02',
            title: 'Your own AI application',
            description:
                'AI models trained specifically for your industry. We do not rely on pre-trained generic models. Our software will be carefully crafted for your specific needs.',
        },
        {
            number: '03',
            title: 'Results for your own problem',
            description:
                'Results available in your own format. No need to reinvent the wheel, we will deliver the results into your desired format, full stop.',
        },
    ],
    cta: {
        label: 'Ask for info',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/PointsSection',
    component: PointsSection,
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
            <PointsSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultPointsSection,
};
