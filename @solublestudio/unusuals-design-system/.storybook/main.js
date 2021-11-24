const path = require('path');
const fs = require('fs');
const {
    getStoryBookConfig,
} = require('@solublestudio/soluto-design-system/.storybook/utils');
const alias = require('../alias.js')();

const components = require('../components.json');

module.exports = getStoryBookConfig(
    path.resolve(__dirname, '../src/scss/variables.scss'),
    components,
    {
        SCSS_VARIABLES: fs.readFileSync(
            path.resolve(__dirname, '../src/scss/variables.scss'),
            'utf-8',
        ),
        SCSS_VARIABLES_COLOR: fs.readFileSync(
            path.resolve(__dirname, '../src/scss/colors.scss'),
            'utf-8',
        ),
    },
    alias,
);
