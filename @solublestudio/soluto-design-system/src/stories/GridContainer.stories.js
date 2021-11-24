import React from 'react';

import { GridContainer } from '../../';

const defaultGridContainer = {
    children: <div>loremipsum</div>,
};

export default {
    title: '@solublestudio/soluto-design-system/GridContainer',
    component: GridContainer,
    argTypes: {
        children: {
            type: { name: 'object', required: true },
            defaultValue: defaultGridContainer.children,
        },
    },
};

const Template = (args) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .sb-show-main.sb-main-padded {
                    padding: 0 !important;
                }
            `,
                }}
            />
            <GridContainer {...args} />
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultGridContainer,
};
