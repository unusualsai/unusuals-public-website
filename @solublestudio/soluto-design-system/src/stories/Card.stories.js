import React from 'react';

import { Card } from '../../';

const defaultCard = {
    imgTop: null,
    imgTopWrapperClassName: '',
    imgTopPlaceholderClassName: '',
    imgTopAlt: '',
    preTitleComponent: () => null,
    title: 'Title',
    titleHref: '',
    titleClassName: null,
    titleTag: 'h5',
    text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae diam felis. Donec tempor ipsum sed mattis varius. Praesent dui elit, vulputate in cursus et, rhoncus sit amet libero. Vivamus tempus lacus sed magna aliquet ornare. Phasellus dapibus, lectus sed porttitor dictum, tellus lacus ultrices risus, at egestas ligula nisl in quam. Suspendisse varius et tortor ut sagittis. Quisque efficitur mi id sapien porttitor, sit amet pulvinar metus venenatis. Integer nunc tellus, mollis a maximus sit amet, suscipit at tellus. Sed felis nunc, placerat vel nunc in, rutrum rutrum tortor. Pellentesque bibendum tincidunt felis quis dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    textClassName: null,
    textTag: 'p',
    children: null,
    wrapperClassName: '',
    bodyClassName: '',
};

export default {
    title: '@solublestudio/soluto-design-system/Card',
    component: Card,
    argTypes: {
        imgTop: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.col,
        },
        imgTopWrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.styleimgTopWrapperClassName,
        },
        imgTopPlaceholderClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.imgTopPlaceholderClassName,
        },
        imgTopAlt: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.imgTopAlt,
        },
        preTitleComponent: {
            type: { name: 'function', required: false },
            defaultValue: defaultCard.preTitleComponent,
        },
        title: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.title,
        },
        titleHref: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.titleHref,
        },
        titleTag: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.titleTag,
        },
        text: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.text,
        },
        textClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.textClassName,
        },
        textTag: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.textTag,
            control: {
                type: 'select',
                options: ['p', 'span', 'div', 'li', 'blockquote'],
            },
        },
        children: {
            type: { name: 'object', required: false },
            defaultValue: defaultCard.children,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.wrapperClassName,
        },
        bodyClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultCard.bodyClassName,
        },
        onClick: {
            action: 'onClick',
        },
        onMouseEnter: {
            action: 'onMouseEnter',
        },
        onMouseLeave: {
            action: 'onMouseLeave',
        },
    },
};

const Template = (args) => {
    return <Card {...args} />;
};

export const Default = Template.bind({});

Default.args = {
    ...defaultCard,
};

export const WithPhoto = Template.bind({});

WithPhoto.args = {
    ...defaultCard,
    imgTop: 'https://via.placeholder.com/300',
    imgTopAlt: 'placeholder',
};

export const WithTitleHref = Template.bind({});

WithTitleHref.args = {
    ...defaultCard,
    titleHref: 'https://solublestudio.com/',
};
