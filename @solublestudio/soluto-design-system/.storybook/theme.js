const { create } = require('@storybook/theming/create');

module.exports.getStorybookTheme = function (brandTitle, brandUrl, brandImage) {
    return create({
        base: 'light',

        /*
		// colorPrimary: 'yellow',
		// colorSecondary: 'black',

		// UI
		appBg: '#f5f5f5',
		appContentBg: '#ffffff',
		appBorderColor: '#bbbbbb',
		appBorderRadius: 2,

		// Typography
		fontBase: '"Open Sans", sans-serif',
		fontCode: 'monospace',

		// Text colors
		textColor: '#6e6e6e',
		textInverseColor: 'rgba(255,255,255,0.9)',

		// Toolbar default and active colors
		barTextColor: '#bbbbbb',
		barSelectedColor: '#000000',
		barBg: '#ffffff',

		// Form colors
		inputBg: 'white',
		inputBorder: '#dddddd',
		inputTextColor: '#6e6e6e',
		inputBorderRadius: 2,
		*/

        brandTitle: brandTitle
            ? brandTitle
            : '@solublestudio/soluto-design-system',
        brandUrl: brandUrl ? brandUrl : 'https://solublestudio.com',
        brandImage: brandImage
            ? brandImage
            : 'https://solublestudio.com/mail/firma.png',
    });
};
