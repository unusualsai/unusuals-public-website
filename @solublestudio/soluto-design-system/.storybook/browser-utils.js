const { addParameters } = require('@storybook/react');
const scssFiles = require('./scss-variables-files.json');

module.exports.getStoryBookPreviewParameters = function (
    baseParameters = {},
    otherFiles = [],
) {
    return addParameters({
        viewport: {
            viewports: {
                xs: {
                    name: 'xs',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                    type: 'mobile',
                },
                lg: {
                    name: 'lg',
                    styles: {
                        width: '1024px',
                        height: '768px',
                    },
                    type: 'tablet',
                },
                xl: {
                    name: 'xl',
                    styles: {
                        width: '1280px',
                        height: '800px',
                    },
                    type: 'desktop',
                },
                xxl: {
                    name: 'xxl',
                    styles: {
                        width: '1440px',
                        height: '900px',
                    },
                    type: 'desktop',
                },
            },
            defaultViewport: 'xs',
        },
        ...baseParameters,
        actions: {
            argTypesRegex: '^on[A-Z].*',
        },
        designToken: {
            files: {
                scss: [
                    {
                        filename: `./${scssFiles.SCSS_VARIABLES_INPUT_BTN}`,
                        content: process.env.SCSS_VARIABLES_INPUT_BTN,
                    },
                    {
                        filename: `./${scssFiles.SCSS_VARIABLES_BUTTON}`,
                        content: process.env.SCSS_VARIABLES_BUTTON,
                    },
                    {
                        filename: `./${scssFiles.SCSS_VARIABLES_RBC}`,
                        content: process.env.SCSS_VARIABLES_RBC,
                    },
                    ...otherFiles,
                ],
            },
        },
    });
};
