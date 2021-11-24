import React from 'react';

import { Tooltip } from '../../';

const defaultTooltip = {
    children: 'lorem ipsum dolor',
    content:
        'sit amet consecteur! and lorem and ipsum and dolor and sit and amet and consecteur',
    margin: 5,
    onOpen: () => {},
    onClose: () => {},
    contentClassName: null,
};

export default {
    title: '@solublestudio/soluto-design-system/Tooltip',
    component: Tooltip,
    argTypes: {
        children: {
            type: { name: 'string|component', required: true },
            defaultValue: defaultTooltip.children,
        },
        content: {
            type: { name: 'string|component', required: true },
            defaultValue: defaultTooltip.content,
        },
        margin: {
            type: { name: 'number', required: false },
            defaultValue: defaultTooltip.margin,
        },
        onOpen: {
            type: { name: 'function', required: false },
            defaultValue: defaultTooltip.onOpen,
        },
        onClose: {
            type: { name: 'function', required: false },
            defaultValue: defaultTooltip.onClose,
        },
        contentClassName: {
            type: { name: 'string', required: false },
            defaultValue: defaultTooltip.contentClassName,
        },
    },
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = defaultTooltip;

const TemplateWithDom = (args) => {
    return (
        <div style={{ height: '120vh', position: 'relative' }}>
            <Tooltip {...args}>
                <button style={{ position: 'absolute', top: '100px', left: 0 }}>
                    Tooltip to right
                </button>
            </Tooltip>
            <Tooltip {...args}>
                <button
                    style={{
                        position: 'absolute',
                        top: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                    Default tooltip
                </button>
            </Tooltip>
            <Tooltip {...args}>
                <button
                    style={{ position: 'absolute', top: '100px', right: 0 }}>
                    Tooltip to left
                </button>
            </Tooltip>
            <Tooltip {...args}>
                <button
                    style={{
                        position: 'absolute',
                        bottom: '150px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}>
                    Default tooltip
                </button>
            </Tooltip>
        </div>
    );
};
export const DefaultWithDom = TemplateWithDom.bind({});
