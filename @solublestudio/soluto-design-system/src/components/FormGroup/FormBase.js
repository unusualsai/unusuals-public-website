import React from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from '../FormGroup/styles.module.scss';
const classNameFnc = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
    'text',
]).className;

export default function FormBase({
    wrapperClassName,
    labelClassName,
    validatorClassName,
    name = '',
    label,
    error,
    success,
    children,
}) {
    return (
        <div
            {...classNameFnc(
                `form-group ${wrapperClassName ? wrapperClassName : ''}`,
            )}>
            {label ? (
                <label
                    htmlFor={name}
                    {...classNameFnc(`${labelClassName ? labelClassName : ''}`)}
                    dangerouslySetInnerHTML={{ __html: label }}
                />
            ) : null}
            {children}
            {error || success ? (
                <div
                    {...classNameFnc(
                        `${error ? 'invalid' : 'valid'}-feedback ${
                            validatorClassName ? validatorClassName : ''
                        }`,
                    )}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: error ? error : success,
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
}
