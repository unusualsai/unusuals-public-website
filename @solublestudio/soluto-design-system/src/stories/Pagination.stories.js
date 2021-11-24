import React from 'react';

import { Pagination } from '../../';

const defaultPagination = {
    activePage: 1,
    pages: 10,
    pagesDepth: 2,
    firstPageHref: `/`,
    pageHref: '/page/{page}',
    LinkTag: null,
    pageClassName: '',
    disabledClassName: '',
    arrowClassName: '',
    wrapperClassName: '',
    activeClassName: '',
    arrowSvg: null,
};

export default {
    title: '@solublestudio/soluto-design-system/Pagination',
    component: Pagination,
    argTypes: {
        activePage: {
            type: { name: 'number', required: false },
            defaultValue: defaultPagination.activePage,
        },
        pages: {
            type: { name: 'number', required: false },
            defaultValue: defaultPagination.pages,
        },
        pagesDepth: {
            type: { name: 'number', required: false },
            defaultValue: defaultPagination.pagesDepth,
        },
        firstPageHref: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.firstPageHref,
        },
        pageHref: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.pageHref,
        },
        LinkTag: {
            type: { name: 'object', required: false },
            defaultValue: defaultPagination.LinkTag,
        },
        pageClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.pageClassName,
        },
        disabledClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.disabledClassName,
        },
        arrowClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.arrowClassName,
        },
        wrapperClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.wrapperClassName,
        },
        activeClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultPagination.activeClassName,
        },
        arrowSvg: {
            type: { name: 'object', required: false },
            defaultValue: defaultPagination.arrowSvg,
        },
    },
};

const Template = (args) => {
    return <Pagination {...args} />;
};

export const Default = Template.bind({});

Default.args = {
    ...defaultPagination,
};
