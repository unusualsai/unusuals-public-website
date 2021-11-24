import React from 'react';

import style from './styles.module.scss';

export const HTMLComponent = ({ text, children, className }) => {
    return (
        <div
            className={[
                style.HTMLTextComponent,
                className ? className : '',
            ].join(' ')}
            {...(text && { dangerouslySetInnerHTML: { __html: text } })}>
            {!text && children ? children : null}
        </div>
    );
};
