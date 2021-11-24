import React, { forwardRef } from 'react';

import { Tabs as RBCTabs } from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

const Tabs = forwardRef(
    (
        {
            wrapperClassName,
            liClassName,
            linkClassName,
            activeClassName,
            icon,
            links,
            ...props
        },
        ref,
    ) => {
        return (
            <RBCTabs
                ref={ref}
                className={`${wrapperClassName ? wrapperClassName : ''} ${
                    style.wrapper
                }`}
                liClassName={`${style.tab}`}
                linkClassName={`caption text-uppercase ${style.link}`}
                activeClassName={style.activeItem}
                items={links}
                {...props}
            />
        );
    },
);

export default Tabs;
