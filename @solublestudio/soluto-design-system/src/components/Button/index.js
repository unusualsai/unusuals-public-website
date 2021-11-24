import React, { forwardRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const classNameFnc = new CssClassNames(moduledStyles, ['utility', 'text'])
    .className;

export const Button = forwardRef(
    (
        {
            Tag = 'a',
            label,
            isSubmit = false,
            size,
            type = null,
            block = false,
            shadow = true,
            extraAttributes = {},
            events = {},
            onClick = null,
            onFocus = null,
            href = '#',
            target = '_self',
            isGatsby = false,
            tabIndex = null,
            disabled = false,
            className,
            beforeContent,
            afterContent,
        },
        ref,
    ) => {
        const classes = `
        btn ${type ? `btn-${type}` : ''}
        ${size ? `btn-${size}` : ''} 
        ${block ? 'btn-block' : ''}
        ${
            type === 'primary' &&
            shadow &&
            (!extraAttributes || !extraAttributes.disabled)
                ? 'with-shadow'
                : ''
        }
        ${className ? className : ''} 
    `;

        return isGatsby ? (
            <Tag
                {...classNameFnc(classes)}
                ref={ref}
                to={href}
                {...(tabIndex !== null && { tabIndex })}
                {...(onClick && { onClick })}
                {...(onFocus && { onFocus })}
                {...(target === '_blank' && { target })}
                {...extraAttributes}>
                {!!beforeContent && beforeContent}
                {typeof label === 'string' ? (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: label,
                        }}
                    />
                ) : (
                    label
                )}
                {!!afterContent && afterContent}
            </Tag>
        ) : (
            <Tag
                {...classNameFnc(classes)}
                ref={ref}
                {...(onClick && { onClick })}
                {...(onFocus && { onFocus })}
                {...(!isSubmit && { href, target })}
                {...(isSubmit && { type: 'submit' })}
                {...(tabIndex !== null && { tabIndex })}
                {...(disabled && { disabled: true })}
                {...extraAttributes}
                {...events}>
                {!!beforeContent && beforeContent}
                {typeof label === 'string' ? (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: label,
                        }}
                    />
                ) : (
                    label
                )}
                {!!afterContent && afterContent}
            </Tag>
        );
    },
);
