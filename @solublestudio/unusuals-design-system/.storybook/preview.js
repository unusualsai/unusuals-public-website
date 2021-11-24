const {
    getStoryBookPreviewParameters,
} = require('@solublestudio/soluto-design-system/.storybook/browser-utils');
const colors = require('../src/json/colors.json');

import '../src/scss/fonts.scss';

export const parameters = getStoryBookPreviewParameters(
    {
        backgrounds: {
            default: 'basic000',
            values: Object.keys(colors).map((color) => ({
                name: color.replace('-', ''),
                value: colors[color],
            })),
        },
    },
    [
        {
            filename: './src/scss/variables.scss',
            content: process.env.SCSS_VARIABLES,
        },
        {
            filename: './src/scss/colors.scss',
            content: process.env.SCSS_VARIABLES_COLOR,
        },
    ],
);
