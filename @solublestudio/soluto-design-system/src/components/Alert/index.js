import React, { memo } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';

const { className } = new CssClassNames(moduledStyles, ['utility', 'text']);

export const Alert = memo(
    ({
        children,
        color = 'primary',
        mt,
        mb,
        extraClass = '',
        dismissible,
        closeClassName,
        closeContent,
        onClose,
    }) => {
        return (
            <div
                {...className(`alert alert-${color} 
            ${mt ? `mt-${mt}` : ''}
            ${mb ? `mb-${mb}` : ''}
            ${extraClass ? extraClass : ''}
            ${dismissible ? 'alert-dismissible' : ''}
        `)}
                role="alert">
                {dismissible && (
                    <button
                        type="button"
                        {...className(`close ${closeClassName ? closeClassName : ''}`)}
                        onClick={onClose}>
                            {closeContent ? closeContent : (
                                <>
                                    <span {...className('sr-only')}>Close alert</span>
                                    <span aria-hidden="true">×</span>
                                </>
                            )}
                    </button>
                )}
                {children}
            </div>
        );
    },
);
