const path = require('path');
const {
    getAlias,
    getCssLoaderOptions,
    getSassLoaderOptions,
    getPostCssLoaderOptions,
} = require('./webpack.config');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTM = require('next-transpile-modules');

module.exports = function (
    baseConfig,
    variablesPath,
    components = [],
    moduleName,
) {
    return withTM(
        ['@solublestudio/soluto-design-system', moduleName].filter((i) => !!i),
    )(
        withSass(
            withCSS({
                ...baseConfig,
                cssLoaderOptions: {
                    url: false,
                },
                webpack: (config, params) => {
                    if (!config.resolve) {
                        config.resolve = {};
                    }

                    if (!config.resolve.alias) {
                        config.resolve.alias = {};
                    }

                    config.resolve.alias = {
                        ...config.resolve.alias,
                        ...getAlias(components, variablesPath),
                    };

                    // Disable cssModules for css files
                    config.module.rules = config.module.rules.map((rule) => {
                        if (
                            rule.test &&
                            'test.css'.match(rule.test) &&
                            rule.use &&
                            rule.use.length
                        ) {
                            rule.use = rule.use.map((r) => {
                                if (
                                    typeof r !== 'string' &&
                                    r.options.modules
                                ) {
                                    r.options.modules = false;
                                }

                                return r;
                            });
                        }

                        return rule;
                    });

                    config.module.rules.push({
                        test: /\.svg$/,
                        issuer: {
                            test: /\.(js|ts)x?$/,
                        },
                        use: ['@svgr/webpack', 'url-loader'],
                    });

                    if (typeof baseConfig.webpack === 'function') {
                        config = baseConfig.webpack(config, params);
                    }

                    return config;
                },
                sassLoaderOptions: getSassLoaderOptions(
                    process.env.NODE_ENV === 'production',
                ),
                cssModules: true,
                cssLoaderOptions: getCssLoaderOptions(
                    process.env.NODE_ENV === 'production',
                ),
                postcssLoaderOptions: getPostCssLoaderOptions(
                    process.env.NODE_ENV === 'production',
                ),
            }),
        ),
    );
};
