import React from 'react';

import { GridWrapper } from '../../';

const defaultGridWrapper = {
    className: '',
    children: 'Lorem ipsum',
};

export default {
    title: '@solublestudio/soluto-design-system/GridWrapper',
    component: GridWrapper,
    argTypes: {
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultGridWrapper.className,
        },
        children: {
            type: { name: 'string', required: false },
            defaultValue: defaultGridWrapper.children,
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
            <GridWrapper {...args}>Lorem ipsum</GridWrapper>
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultGridWrapper,
};
