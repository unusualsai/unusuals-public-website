import React from 'react';

import Footer from '../components/Footer';

import feed from '../img/social-feed.svg';
import linkedin from '../img/social-linkedin.svg';
import twitter from '../img/social-twitter.svg';
import youtube from '../img/social-youtube.svg';

const defaultFooter = {
    title: 'Detecting the unusual to become exceptional',
    logo: 'https://via.placeholder.com/80x140',
    copyright: '© Copyright 2023. unusuals world s.l.',
    footerLinks: [
        [
            {
                label: 'Solution',
                type: 'title',
                href: '#',
            },
            {
                label: 'Input',
                type: 'default',
                href: '#',
            },
            {
                label: 'Software',
                type: 'default',
                href: '#',
            },
            {
                label: 'Output',
                type: 'default',
                href: '#',
            },
        ],
        [
            {
                label: 'Use cases',
                type: 'title',
                href: '#',
            },
            {
                label: 'Electric Power Transmission',
                type: 'default',
                href: '#',
            },
            {
                label: 'Railways',
                type: 'default',
                href: '#',
            },
            {
                label: 'Telecommunications',
                type: 'default',
                href: '#',
            },
            {
                label: 'Wind power generation parks',
                type: 'default',
                href: '#',
            },
            {
                label: 'Solar power generation parks',
                type: 'default',
                href: '#',
            },
        ],
        [
            {
                label: 'About',
                type: 'title',
                href: '#',
            },
            {
                label: 'FAQ',
                type: 'title',
                href: '#',
            },
            {
                label: 'Contact',
                type: 'title',
                href: '#',
            },
            {
                label: 'Blog',
                type: 'title',
                href: '#',
            },
        ],
        [
            {
                label: 'Ask for demo',
                type: 'title',
                href: '#',
            },
        ],
    ],
    socialLinks: [
        {
            kind: 'twitter',
            href: '#',
            icon: twitter,
        },
        {
            kind: 'linkedin',
            href: '#',
            icon: linkedin,
        },
        {
            kind: 'youtube',
            href: '#',
            icon: youtube,
        },
        {
            kind: 'feed',
            href: '#',
            icon: feed,
        },
    ],
    legalLinks: [
        {
            label: 'Aviso legal',
            href: '#',
        },
        {
            label: 'Política de privacidad',
            href: '#',
        },
        {
            label: 'Cookies',
            href: '#',
        },
    ],
};

export default {
    title: '@solublestudio/unusuals-design-system/Footer',
    component: Footer,
    argTypes: {
        title: {
            type: { name: 'string', required: true },
            defaultValue: defaultFooter.title,
        },
        copyright: {
            type: { name: 'string', required: false },
            defaultValue: defaultFooter.description,
        },
        footerLinks: {
            type: { name: 'array', required: false },
            defaultValue: defaultFooter.footerLinks,
        },
        logo: {
            type: { name: 'string', required: false },
            defaultValue: defaultFooter.logo,
        },
        socialLinks: {
            type: { name: 'object', required: false },
            defaultValue: defaultFooter.socialLinks,
        },
        privacityLinks: {
            type: { name: 'object', required: false },
            defaultValue: defaultFooter.privacityLinks,
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
            <Footer {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultFooter,
};
