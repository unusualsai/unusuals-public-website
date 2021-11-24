import React from 'react';

import { Text } from '../../';

const defaultText = {
    tag: 'span',
    addBreaklines: true,
    className: '',
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nulla arcu. Nullam ultricies elit mauris, id porttitor enim posuere eu. Cras nisl leo, accumsan vel tincidunt ut, malesuada vel tellus. Nullam sed dolor tellus. Aenean vel placerat justo. In auctor odio est. Nullam a gravida ipsum. Proin et aliquet eros. Donec ultrices in urna a bibendum. Aliquam laoreet eros et ex semper dignissim. Etiam bibendum commodo egestas. Curabitur eleifend erat vitae nisi fermentum egestas. Proin aliquet justo quis dui commodo, sed consectetur velit vehicula. Curabitur ex ligula, vehicula a diam in, blandit iaculis magna. Phasellus nec urna maximus, sodales enim vel, tincidunt enim. In laoreet lorem nisl, a vehicula metus consectetur vulputate.',
};

export default {
    title: '@solublestudio/soluto-design-system/Text',
    component: Text,
    argTypes: {
        children: {
            type: { name: 'string', required: true },
            defaultValue: defaultText.children,
        },
        tag: {
            type: { name: 'string', required: false },
            defaultValue: defaultText.tag,
            control: {
                type: 'select',
                options: ['p', 'span', 'div', 'li', 'blockquote'],
            },
        },
        addBreaklines: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultText.addBreaklines,
        },
        style: {
            type: { name: 'string', required: false },
            defaultValue: defaultText.style,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultText.className,
            control: {
                type: 'select',
                options: [
                    'display1',
                    'display2',
                    'display3',
                    'heading1',
                    'heading2',
                    'large',
                    'largeMerri',
                    'medium',
                    'normal',
                    'small',
                    'extraSmall',
                    'caption',
                    'link',
                    'button',
                ],
            },
        },
    },
};

const Template = (args) => {
    return <Text {...args} />;
};

export const Default = Template.bind({});

Default.args = {
    ...defaultText,
};
