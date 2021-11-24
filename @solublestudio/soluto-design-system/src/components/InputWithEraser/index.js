import React, { forwardRef, useState, useRef, useCallback } from 'react';

import { Input as RBCInput } from '../Input';

import styles from './styles.module.scss';

export const InputWithEraser = forwardRef(
    ({ className, eraserClassName, laterContent, onClear, ...props }, ref) => {
        const inputRef = useRef();

        const [inputFilled, setInputFilled] = useState(
            props.value || props.defaultValue ? true : false,
        );

        const onClickClear = useCallback(
            (ev) => {
                ref ? (ref.current.value = '') : (inputRef.current.value = '');

                setInputFilled(false);
                if (onClear) {
                    onClear();
                }
            },
            [ref, inputRef, setInputFilled, onClear],
        );

        return (
            <RBCInput
                ref={ref ? ref : inputRef}
                {...props}
                onChange={(e) => {
                    setInputFilled(!!e.target.value);
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                className={`${className ? className : ''} ${styles.input} ${
                    props.size === 'sm' ? styles.inputSmall : ''
                }`}
                data-filled={inputFilled}
                laterContent={
                    <>
                        {laterContent ? laterContent : ''}
                        <button
                            onClick={onClickClear}
                            type="button"
                            className={`${styles.eraser} ${
                                props.size === 'sm' ? styles.eraserSmall : ''
                            } ${inputFilled ? '' : styles.hiddenEraser} ${
                                eraserClassName ? eraserClassName : ''
                            }`}
                        />
                    </>
                }
            />
        );
    },
);
