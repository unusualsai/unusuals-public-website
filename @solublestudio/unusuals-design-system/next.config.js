const getNextConfig = require('@solublestudio/soluto-design-system/next.config');
const defaultComponents = require('./components.json');

module.exports = function (config, variablesPath = '', components = []) {
    defaultComponents.forEach((c) => {
        if (components.indexOf(c) === -1) {
            components.push(c);
        }
    });

    return getNextConfig(
        config,
        variablesPath ? variablesPath : `${__dirname}/src/scss/variables.scss`,
        components,
        'unusuals-design-system',
    );
};
