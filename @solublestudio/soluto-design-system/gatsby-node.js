const {
    getAlias,
    getCssLoaderOptions,
    getSassLoaderOptions,
    getPostCssLoaderOptions,
    addSvgRule,
} = require('./webpack.config');

exports.onCreateWebpackConfig = (
    { actions, stage, loaders, getConfig },
    {
        variablesPath = null,
        components = [],
        alias = {},
        dirname,
        ...sassOptions
    },
) => {
    const config = getConfig();

    if (dirname) {
        const dirnameRegex = new RegExp(dirname);

        config.module.rules = [
            ...config.module.rules.filter(
                (rule) => String(rule.test) !== String(/\.jsx?$/),
            ),
            {
                ...loaders.js(),
                test: /\.jsx?$/,
                exclude: (modulePath) =>
                    /node_modules/.test(modulePath) &&
                    !dirnameRegex.test(modulePath),
            },
        ];
    }

    const PRODUCTION = stage !== `develop`;
    const isSSR = stage.includes(`html`);

    config.resolve.alias = {
        ...config.resolve.alias,
        ...getAlias(components, variablesPath, false),
        ...alias,
    };

    const sassLoader = {
        loader: require.resolve(`sass-loader`),
        options: getSassLoaderOptions(PRODUCTION, sassOptions),
    };

    const cssLoaderOptions = getCssLoaderOptions(PRODUCTION);

    const cssLoaderModulesOptions = {
        ...cssLoaderOptions,
        modules: true,
        minimize: PRODUCTION,
        camelCase: '!postcss',
    };

    const postCssLoaderOptions = getPostCssLoaderOptions(PRODUCTION);

    const sassRule = {
        test: /\.scss$/,
        use: isSSR
            ? [loaders.null()]
            : [
                  loaders.miniCssExtract(),
                  loaders.css(cssLoaderOptions),
                  sassLoader,
                  loaders.postcss(postCssLoaderOptions),
              ].filter(Boolean),
    };

    const sassRuleModules = {
        test: /\.module\.scss$/,
        use: [
            !isSSR && loaders.miniCssExtract(),
            loaders.css(cssLoaderModulesOptions),
            sassLoader,
            loaders.postcss(postCssLoaderOptions),
        ].filter(Boolean),
    };

    switch (stage) {
        case `develop`:
        case `build-javascript`:
        case `build-html`:
        case `develop-html`:
            config.module.rules.push({
                oneOf: [sassRuleModules, sassRule],
            });
            break;
    }

    config.module.rules = addSvgRule(config.module.rules);

    actions.replaceWebpackConfig(config);
};
