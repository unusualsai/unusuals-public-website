import React from 'react';

import Header from '../components/Header';

const defaultHeader = {
    items: [
        {
            title: 'Solution',
            href: '#',
            active: true,
        },
        {
            title: 'Use cases',
            href: '#',
        },
        {
            title: 'About',
            href: '#'
        },
        {
            title: 'FAQ',
            href: '#',
        },
        {
            title: 'Contact',
            href: '#',
        },
    ],
    buttons: [
        {
            title: 'Ask for demo',
            href: '#',
        }
    ]
}

export default {
	title: '@solublestudio/unusuals-design-system/Header',
    component: Header,
    layout: 'fullscreen',
	argTypes: {
        logo: {
            type: { name: 'string', required: false },
            defaultValue: defaultHeader.logo
        },
        items: {
            type: { name: 'object', required: false },
            defaultValue: defaultHeader.items
        },
        buttons: {
            type: { name: 'object', required: false },
            defaultValue: defaultHeader.buttons
        },
	},
};

const Template = (args) => {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .sb-show-main.sb-main-padded {
                        padding: 0 !important;
                    }
                `
            }} />
            <div style={{ minHeight: '150vh' }}>
                <Header {...args}></Header>
            </div>
        </>
    )
};

export const Default = Template.bind({});