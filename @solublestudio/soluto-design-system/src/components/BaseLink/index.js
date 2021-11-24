import React, { memo } from 'react';
import animateScroll from '../../utils/animateScroll';

import { Button } from '../Button';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { getClassName } = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
    'text',
]);

export const BaseLink = memo(
    ({
        onClick,
        onFocus,
        Tag = 'a',
        scheme,
        href,
        onClickAlways,
        yScrollPoint = false,
        title = '',
        titleAlt = '',
        activeLinkClass = '',
        extraClassName = '',
        target = '_self',
        type = 'link',
        tabIndex = null,
        fade = null,
        partiallyActive = false,
        id,
        role,
        onMouseEnter,
        extraAttributes = {},
        size,
    }) => {
        const handleClick = (e) => {
            if (onClickAlways) {
                onClickAlways();
            }

            if (onClick) {
                onClick(e);
            } else if (yScrollPoint !== false) {
                e.preventDefault();
                animateScroll(yScrollPoint);
            }
        };

        let contents = null;
        if (!titleAlt) {
            titleAlt = title;
        }

        let sharedParams = {
            onClick: handleClick,
        };

        if (onFocus) {
            sharedParams.onFocus = onFocus;
        }

        if (onMouseEnter) {
            sharedParams.onMouseEnter = onMouseEnter;
        }

        if (tabIndex !== null) {
            sharedParams.tabIndex = tabIndex;
        }

        if (id) {
            sharedParams.id = id;
        }

        if (role) {
            sharedParams.role = role;
        }

        if (scheme === 'gatsby') {
            contents = (
                <Tag
                    {...sharedParams}
                    {...extraAttributes}
                    className={getClassName(`${extraClassName}`)}
                    activeClassName={getClassName(`${activeLinkClass}`)}
                    to={href}
                    data-title={typeof title === 'string' ? title : ''}
                    title={typeof titleAlt === 'string' ? titleAlt : ''}
                    aria-label={typeof titleAlt === 'string' ? titleAlt : ''}
                    {...(fade && { fade })}
                    {...(partiallyActive && { partiallyActive })}
                    target={target}>
                    {typeof title === 'string' ? <span>{title}</span> : title}
                </Tag>
            );
        } else if (scheme === 'button') {
            contents = (
                <Button
                    {...sharedParams}
                    Tag={Tag}
                    label={title}
                    type={type}
                    href={href}
                    target={target}
                    size={size ? size : null}
                    className={getClassName(`${extraClassName}`)}
                    extraAttributes={{
                        ...extraAttributes,
                        title: typeof titleAlt === 'string' ? titleAlt : '',
                        'aria-label':
                            typeof titleAlt === 'string' ? titleAlt : '',
                    }}>
                </Button>
            );
        } else {
            contents = (
                <Tag
                    {...sharedParams}
                    {...extraAttributes}
                    className={getClassName(`${extraClassName}`)}
                    href={href}
                    data-title={typeof title === 'string' ? title : ''}
                    title={typeof titleAlt === 'string' ? titleAlt : ''}
                    aria-label={typeof titleAlt === 'string' ? titleAlt : ''}
                    target={target}>
                    {typeof title === 'string' ? <span>{title}</span> : title}
                </Tag>
            );
        }

        return contents;
    },
);
