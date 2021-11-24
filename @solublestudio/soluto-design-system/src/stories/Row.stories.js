import React from 'react';

import { Col } from '../../';
import { Row } from '../../';

const defaultRow = {
    pt: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    pb: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    mt: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    mb: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    className: '',
};

export default {
    title: '@solublestudio/soluto-design-system/Row',
    component: Row,
    argTypes: {
        noGutters: {
            type: { name: 'boolean', required: false },
            defaultValue: defaultRow.noGutters,
        },
        pb: {
            type: { name: 'object', required: false },
            defaultValue: defaultRow.pb,
        },
        mt: {
            type: { name: 'object', required: false },
            defaultValue: defaultRow.mt,
        },
        mb: {
            type: { name: 'object', required: false },
            defaultValue: defaultRow.mb,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultRow.className,
        },
    },
};

const styleCol = {
    background: 'lightgray',
    height: '50px',
};

const Template = (args) => {
    return (
        <Row {...args}>
            <Col style={styleCol} />
            <Col style={styleCol} />
        </Row>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultRow,
};
