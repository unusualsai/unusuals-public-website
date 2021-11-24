const path = require('path');
const fs = require('fs');

const baseComponents = {
    Container: `./src/components/Container`,
    Row: './src/components/Row',
    Col: './src/components/Col',
    Section: './src/components/SmartSections',
    SectionSpy: './src/components/SmartSections',
    Button: './src/components/Button',
    Heading: './src/components/Heading',
    Text: './src/components/Text',
    Navbar: './src/components/Navbar',
    Navs: './src/components/Navs',
    BaseLink: './src/components/BaseLink',
    Card: './src/components/Card',
    Alert: './src/components/Alert',
    Modal: './src/components/Modal',
    FormGroup: './src/components/FormGroup',
    SocialIcons: './src/components/SocialIcons',
    Slider: './src/components/Slider',
    Breadcrumb: './src/components/Breadcrumb',
    ProgressBar: './src/components/ProgressBar',
    Table: './src/components/Table',
    Spacer: './src/components/Spacer',
    Collapse: './src/components/Collapse',
    Pagination: './src/components/Pagination',
    Spinner: './src/components/Spinner',
    GridContainer: './src/components/GridContainer',
    GridWrapper: './src/components/GridWrapper',
    GridBox: './src/components/GridBox',
    HTMLComponent: './src/components/HTMLComponent',
};

function getAlias(components, variablesPath, mockGatsby = true) {
    let alias = {};

    const distFolder = fs.existsSync(
        path.resolve(__dirname, 'src/scss/_base-imports.scss'),
    )
        ? 'src'
        : 'dist/src';

    let componentsToAlias = { ...baseComponents };
    components.forEach((componentName) => {
        if (componentsToAlias[componentName]) {
            delete componentsToAlias[componentName];
        }
    });

    let componentsAlias = {};
    Object.keys(componentsToAlias).forEach((componentName) => {
        componentsAlias[`${componentsToAlias[componentName]}$`] = path.resolve(
            __dirname,
            `${distFolder}/alias.js`,
        );
    });

    alias = {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '~typi': path.resolve(__dirname, 'node_modules/typi'),
        '~base-imports': path.resolve(
            __dirname,
            `${distFolder}/scss/_base-imports.scss`,
        ),
        '~variables': variablesPath
            ? variablesPath
            : path.resolve(__dirname, `${distFolder}/scss/variables.scss`),
        ...componentsAlias,
        ...(mockGatsby && {
            'gatsby-image': path.resolve(
                __dirname,
                `${distFolder}/mocks/gatsbyImage.js`,
            ),
        }),
        // DEBUG: Uncomment this when using yarn link
        // react: require.resolve("react"),
    };

    return alias;
}

function getCssLoaderOptions(PRODUCTION) {
    return {
        importLoaders: 1,
        sourceMap: !PRODUCTION,
        localIdentName: getLocalIdentName(PRODUCTION),
    };
}

function getCssModulesLoaderOptions(PRODUCTION) {
    return {
        importLoaders: 1,
        sourceMap: !PRODUCTION,
        modules: true,
        modules: {
            localIdentName: getLocalIdentName(PRODUCTION),
        },
    };
}

function getLocalIdentName(PRODUCTION) {
    return PRODUCTION ? '[hash:base64:5]' : '[name]--[local]--[hash:base64:5]';
}

function getSassLoaderOptions(PRODUCTION, sassOptions = {}) {
    return {
        sourceMap: !PRODUCTION,
        // ...sassOptions,
        additionalData: `${sassOptions.data ? sassOptions.data : ''}$env:"${
            PRODUCTION ? 'prod' : 'dev'
        }";`,
        sassOptions: {
            ...(sassOptions ? sassOptions : {}),
            includePaths: [path.resolve(__dirname, 'node_modules')],
        },
    };
}

function getPostCssLoaderOptions(PRODUCTION) {
    return {
        sourceMap: !PRODUCTION,
        parser: require.resolve('postcss-scss'),
        plugins: (loader) => [
            require('postcss-flexbugs-fixes'),
            require('postcss-nested'),
            require('autoprefixer')({
                overrideBrowserslist: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                ],
                flexbox: 'no-2009',
            }),
        ],
    };
}

function addSvgRule(rules) {
    let currentSvgRuleKey = rules.findIndex(
        (rule) => rule.test && rule.test.test('test.svg'),
    );

    let newRules = [...rules];

    let newSvgRule = String(newRules[currentSvgRuleKey].test)
        .replace('svg|', '')
        .replace('|svg', '')
        .substring(1)
        .slice(0, -1);

    newRules[currentSvgRuleKey].test = new RegExp(newSvgRule);

    newRules.splice(currentSvgRuleKey || 0, 0, {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
    });

    return newRules;
}

module.exports = {
    getAlias,
    getCssModulesLoaderOptions,
    getCssLoaderOptions,
    getSassLoaderOptions,
    getPostCssLoaderOptions,
    getLocalIdentName,
    baseComponents,
    addSvgRule,
};
