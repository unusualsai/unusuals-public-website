import React from 'react';

import { GridContainer } from '../../';
import { GridBox } from '../../';

const defaultGridBox = {
    Tag: 'div',
    className: '',
    html: null,
};

export default {
    title: '@solublestudio/soluto-design-system/GridBox',
    component: GridBox,
    argTypes: {
        Tag: {
            type: { name: 'string', required: false },
            defaultValue: defaultGridBox.Tag,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultGridBox.className,
        },
        html: {
            type: { name: 'string', required: false },
            defaultValue: defaultGridBox.html,
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
            <GridContainer>
                <GridBox {...args}>Lorem ipsum</GridBox>
            </GridContainer>
        </>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultGridBox,
};
