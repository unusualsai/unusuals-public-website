import React from 'react';

import CtaBanner from '../components/CtaBanner';

import video from '../video/isotipo-low.mp4';
import image from '../img/transparent-2D.svg';

const defaultButton = {
    type: 'primaryButton',
    block: false,
    className: '',
    link: { slug: '' },
    externalLink: '',
    target: '',
    label: 'Ask for info',
    isSubmit: false,
    size: '',
};

const defaultCtaBanner = {
    description: 'Tell us more about your business and specific needs.',
    title: 'Do you want to know our technology more in depth?',
    cta: defaultButton,
    image: image,
    video: {
        url: video,
        format: 'mp4',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/CtaBanner',
    component: CtaBanner,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultCtaBanner.title,
        },
        pretitle: {
            type: { name: 'string', required: true },
            defaultValue: defaultCtaBanner.pretitle,
        },
        description: {
            type: { name: 'string', required: true },
            defaultValue: defaultCtaBanner.description,
        },
        cta: {
            type: { name: 'object', required: true },
            defaultValue: defaultCtaBanner.cta,
        },
        image: {
            type: { name: 'object', required: true },
            defaultValue: defaultCtaBanner.image,
        },
        video: {
            type: { name: 'object', required: true },
            defaultValue: defaultCtaBanner.video,
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
            <CtaBanner {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultCtaBanner,
};
