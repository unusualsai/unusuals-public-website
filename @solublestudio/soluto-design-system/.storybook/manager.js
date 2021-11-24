import { addons } from '@storybook/addons';
import { getStorybookTheme } from './theme';

addons.setConfig({
	theme: getStorybookTheme(),
});