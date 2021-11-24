import React from 'react';

import HeroSection from '../components/HeroSection';
import video from '../video/isotipo-low.mp4';
import imageBg from '../img/transparent-example.png';
import coverImage from "../img/herosection-coverimage.png";

const defaultHeroSection = {
    title:
        'Save millions by automating the inspection of large infrastructure to make better maintenance decisions.',
    subtitle:
        'Unusuals AI software allows you assessing the status of your infrastructure, detecting anomalies and improving your maintenance decision-making process.',
    clients: [
        'https://via.placeholder.com/104x40',
        'https://via.placeholder.com/40x40',
        'https://via.placeholder.com/104x40',
        'https://via.placeholder.com/104x40',
    ],
    image: imageBg,
    coverImage: coverImage,
    video: {
        url: video,
        format: 'mp4',
    },
};

export default {
    title: '@solublestudio/unusuals-design-system/HeroSection',
    component: HeroSection,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultHeroSection.title,
        },
        subtitle: {
            type: { name: 'string', required: true },
            defaultValue: defaultHeroSection.subtitle,
        },
        clients: {
            type: { name: 'array', required: true },
            defaultValue: defaultHeroSection.clients,
        },
        image: {
            type: { name: 'string', required: false },
            defaultValue: defaultHeroSection.image,
        },
        coverImage: {
            type: { name: 'string', required: false },
            defaultValue: defaultHeroSection.coverImage,
        },
        video: {
            type: { name: 'object', required: true },
            defaultValue: defaultHeroSection.video,
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
            <HeroSection {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultHeroSection,
};
