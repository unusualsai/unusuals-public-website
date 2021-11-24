import React, { forwardRef } from 'react';

import {
    Checkbox as RBCCheckbox,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

const Checkbox = forwardRef(
    ({ className, wrapperClassName, labelClassName, ...props }, ref) => {
        return (
            <RBCCheckbox
                ref={ref}
                wrapperClassName={`${style.wrapper} ${
                    wrapperClassName ? wrapperClassName : ''
                }`}
                className={style.checkbox}
                labelClassName={`subtitle ${style.label}`}
                {...props}
            />
        );
    },
);

export default Checkbox;
