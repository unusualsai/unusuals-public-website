import React from 'react';

import { Col } from '../../';
import { Row } from '../../';

const defaultCol = {
    col: { sm: 2, xs: 6, md: 8, lg: 10, xl: 12 },
    offset: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
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
    pl: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
    },
    pr: {
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
    style: {
        background: 'lightgray',
        height: '50px',
        borderRadius: 8,
    },
    className: '',
};

export default {
    title: '@solublestudio/soluto-design-system/Col',
    component: Col,
    argTypes: {
        col: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.col,
        },
        style: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.style,
        },
        offset: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.offset,
        },
        pt: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.pt,
        },
        pb: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.pb,
        },
        pl: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.pl,
        },
        pr: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.pr,
        },
        mt: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.mt,
        },
        mb: {
            type: { name: 'object', required: false },
            defaultValue: defaultCol.mb,
        },
        className: {
            type: { name: 'string', required: false },
            defaultValue: defaultCol.className,
        },
    },
};

const Template = (args) => {
    return (
        <Row>
            <Col {...args} />
        </Row>
    );
};

export const Default = Template.bind({});

Default.args = {
    ...defaultCol,
};
