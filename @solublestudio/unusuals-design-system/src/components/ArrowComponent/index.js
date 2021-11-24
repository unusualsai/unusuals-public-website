import React from 'react';
import PropTypes from 'prop-types';

import { className } from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

export default function ArrowComponent({
    arrowClassName,
    direction,
    arrow,
    gradient,
    ...props
}) {
    return (
        <div
            {...className(
                [
                    style.line,
                    style[`line--${direction}`],
                    arrow ? style.arrow : '',
                    gradient ? style.gradient : '',
                    arrowClassName ? arrowClassName : '',
                ].join(' '),
            )}
            {...props}
            ></div>
    );
}

ArrowComponent.propTypes = {
    direction: PropTypes.string,
    arrow: PropTypes.bool,
};
