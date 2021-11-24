import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from '../FormGroup/styles.module.scss';
import FormBase from '../FormGroup/FormBase';

const classNameFnc = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
    'text',
]).className;

export const Select = forwardRef(
    (
        {
            className,
            wrapperClassName,
            labelClassName,
            validatorClassName,
            name = '',
            label,
            placeholder = '',
            value,
            defaultValue,
            error,
            success,
            size,
            disabled,
            options,
            ...props
        },
        externalRef,
    ) => {
        const ref = useRef();

        useImperativeHandle(externalRef, () => ({
            ...(ref && ref.current ? { elementRef: ref.current } : {}),
            changeValue: (value) => {
                let indexToSelect = [...ref.current.options].findIndex(
                    (option) => option.value === value,
                );
                if (indexToSelect > -1) {
                    ref.current.selectedIndex = indexToSelect;

                    if (props.onChange) {
                        props.onChange({
                            target: {
                                value,
                            },
                        });
                    }
                }
            },
        }));

        return (
            <FormBase
                wrapperClassName={wrapperClassName}
                labelClassName={labelClassName}
                validatorClassName={validatorClassName}
                name={name}
                label={label}
                error={error}
                success={success}>
                <select
                    ref={ref}
                    id={name}
                    name={name}
                    aria-label={label ? label : placeholder ? placeholder : ''}
                    {...(value && { value })}
                    {...(defaultValue && { defaultValue })}
                    {...(disabled && { disabled })}
                    {...classNameFnc(
                        [
                            'custom-select',
                            moduledStyles['custom-select'],
                            size ? `custom-select-${size}` : '',
                            error ? 'is-invalid' : '',
                            success ? 'is-valid' : '',
                            className ? className : '',
                        ].join(' '),
                    )}
                    {...props}>
                    {placeholder ? (
                        <option value="" hidden={props?.required}>
                            {placeholder}
                        </option>
                    ) : null}
                    {options
                        ? options && typeof options.map !== 'undefined'
                            ? options.map((value, k) => (
                                  <option
                                      key={k}
                                      value={value}
                                      {...(value === null && {
                                          disabled: true,
                                      })}>
                                      {value === null ? '--------' : value}
                                  </option>
                              ))
                            : Object.keys(options).map((value, k) => (
                                  <option
                                      key={k}
                                      value={value}
                                      {...(options[value] === null && {
                                          disabled: true,
                                      })}>
                                      {options[value] === null
                                          ? '--------'
                                          : options[value]}
                                  </option>
                              ))
                        : null}
                </select>
            </FormBase>
        );
    },
);
