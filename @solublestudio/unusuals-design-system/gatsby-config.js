const defaultComponents = require('./components.json');
const alias = require('./alias')('gatsby');

module.exports = (options) => {
    let { variablesPath = '', components = [] } = options;

    defaultComponents.forEach((c) => {
        if (components.indexOf(c) === -1) {
            components.push(c);
        }
    });

    return {
        plugins: [
            {
                resolve: 'gatsby-source-filesystem',
                options: {
                    path: `${__dirname}/src/img`,
                    name: 'img-ds',
                },
            },
            {
                resolve: 'gatsby-source-filesystem',
                options: {
                    path: `${__dirname}/src/video`,
                    name: 'video-ds',
                },
            },
            {
                resolve: '@solublestudio/soluto-design-system',
                options: {
                    variablesPath: variablesPath
                        ? variablesPath
                        : `${__dirname}/src/scss/variables.scss`,
                    components,
                    alias,
                    dirname: __dirname,
                },
            },
        ],
    };
};
