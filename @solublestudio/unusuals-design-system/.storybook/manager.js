import { addons } from '@storybook/addons';
import { getStorybookTheme } from '@solublestudio/soluto-design-system/.storybook/theme';

addons.setConfig({
    theme: getStorybookTheme('unusuals-design-system'),
});
