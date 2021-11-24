const path = require('path');
const fs = require('fs');
const {
    getAlias,
    getCssLoaderOptions,
    getCssModulesLoaderOptions,
    getSassLoaderOptions,
    getPostCssLoaderOptions,
    addSvgRule,
} = require('../webpack.config');
const { EnvironmentPlugin } = require('webpack');
const scssFiles = require('./scss-variables-files.json');

const scssVariables = {
    SCSS_VARIABLES_INPUT_BTN: fs.readFileSync(
        path.resolve(__dirname, '../src/', scssFiles.SCSS_VARIABLES_INPUT_BTN),
        'utf-8',
    ),
    SCSS_VARIABLES_BUTTON: fs.readFileSync(
        path.resolve(__dirname, '../src/', scssFiles.SCSS_VARIABLES_BUTTON),
        'utf-8',
    ),
    SCSS_VARIABLES_RBC: fs.readFileSync(
        path.resolve(__dirname, '../src/', scssFiles.SCSS_VARIABLES_RBC),
        'utf-8',
    ),
};

// TODO: Quiza cargar el preset sea así más limpio que lo que hay ahora
// .storybook/main.js
/*
	module.exports = {
	addons: [
		{
		name: '@storybook/preset-scss',
		options: {
			cssLoaderOptions: {
			modules: true,
			localIdentName: '[name]__[local]--[hash:base64:5]',
			}
		}
		},
	],
	};
*/

module.exports.getStoryBookConfig = function (
    variablesPath,
    components = [],
    parentScssVariables = {},
    alias = {},
) {
    return {
        stories: [
            '../src/**/*.stories.mdx',
            '../src/**/*.stories.@(js|jsx|ts|tsx)',
        ],
        addons: [
            '@storybook/addon-links',
            '@storybook/addon-essentials',
            'storybook-design-token',
        ],
        webpackFinal: async (config, { configType, ...others }) => {
            // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
            // You can change the configuration based on that.
            // 'PRODUCTION' is used when building the static version of storybook.
            const PRODUCTION = configType === 'PRODUCTION';
            const isSSR = false;

            config.resolve.alias = {
                ...config.resolve.alias,
                ...getAlias(components, variablesPath),
                ...alias,
            };

            const sassLoader = {
                loader: require.resolve(`sass-loader`),
                options: getSassLoaderOptions(PRODUCTION, {
                    data: '$body-bg: transparent;',
                }),
            };

            let cssLoaderOptions = getCssLoaderOptions(PRODUCTION);
            if (cssLoaderOptions.localIdentName) {
                delete cssLoaderOptions.localIdentName;
            }
            const cssLoaderModulesOptions = getCssModulesLoaderOptions(
                PRODUCTION,
            );
            const postCssLoaderOptions = getPostCssLoaderOptions(PRODUCTION);

            const sassRule = {
                test: /\.scss$/,
                use: isSSR
                    ? [require.resolve('null-loader')]
                    : [
                          'style-loader',
                          // loaders.miniCssExtract(),
                          {
                              loader: require.resolve(`css-loader`),
                              options: cssLoaderOptions,
                          },
                          sassLoader,
                          {
                              loader: require.resolve(`postcss-loader`),
                              options: postCssLoaderOptions,
                          },
                      ].filter(Boolean),
            };

            const sassRuleModules = {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    // !isSSR && loaders.miniCssExtract(),
                    {
                        loader: require.resolve(`css-loader`),
                        options: cssLoaderModulesOptions,
                    },
                    sassLoader,
                    {
                        loader: require.resolve(`postcss-loader`),
                        options: postCssLoaderOptions,
                    },
                ].filter(Boolean),
            };

            config.module.rules.push({
                oneOf: [sassRuleModules, sassRule],
            });

            // TODO: Used for workspaces mode
            config.module.rules[0].include.push(path.resolve(__dirname, '../'));
            // TODO: Make this work with different @
            config.module.rules[0].exclude = /node_modules\/(?!@solublestudio\/).*/;

            config.plugins.push(
                new EnvironmentPlugin({
                    ...scssVariables,
                    ...parentScssVariables,
                }),
            );

            config.module.rules = addSvgRule(config.module.rules);

            return config;
        },
    };
};
