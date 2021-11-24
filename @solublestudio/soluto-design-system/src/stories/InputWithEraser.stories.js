import React from 'react';

import { InputWithEraser } from '../../';

const defaultInputWithEraser = {
    laterContent: null,
    name: 'inputWithEraser',
};

export default {
    title: '@solublestudio/soluto-design-system/InputWithEraser',
    component: InputWithEraser,
    argTypes: {
        name: {
            type: { name: 'string', required: false },
            defaultValue: defaultInputWithEraser.name,
        },
        laterContent: {
            type: { name: 'object', required: false },
            defaultValue: defaultInputWithEraser.laterContent,
        },
    },
};

const Template = (args) => <InputWithEraser {...args} />;

export const Default = Template.bind({});
