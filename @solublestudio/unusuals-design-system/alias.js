const path = require('path');

const alias = {
    Link: {
        base: './src/components/Link',
        gatsby: './src/components/Gatsby/GatsbyLink',
    },
    HeroSection: {
        base: './src/components/HeroSection',
        gatsby: './src/components/Gatsby/GatsbyHeroSection',
    },
    ImageComponent: {
        base: './src/components/ImageComponent',
        gatsby: './src/components/Gatsby/GatsbyImageComponent',
    },
    CtaBanner: {
        base: './src/components/CtaBanner',
        gatsby: './src/components/Gatsby/GatsbyCtaBanner',
    },
    Footer: {
        base: './src/components/Footer',
        gatsby: './src/components/Gatsby/GatsbyFooter',
    },
    Header: {
        base: './src/components/Header',
        gatsby: './src/components/Gatsby/GatsbyHeader',
    },
    FormSection: {
        base: './src/components/FormSection',
        gatsby: './src/components/Gatsby/GatsbyFormSection',
    },
    NotFoundPage: {
        base: './src/components/NotFoundPage',
        gatsby: './src/components/Gatsby/GatsbyNotFoundPage',
    },
};

module.exports = (aliasFor = 'base') => {
    const thisAlias = {};
    Object.keys(alias).forEach((aliasKey) => {
        if (alias[aliasKey][aliasFor]) {
            thisAlias[aliasKey] = path.resolve(
                __dirname,
                alias[aliasKey][aliasFor],
            );
        }
    });

    return thisAlias;
};
