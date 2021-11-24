import React from 'react';

import { className } from '@solublestudio/soluto-design-system';

import style from './style.module.scss';
import logoBackground from '../../img/logo-background-min.gif';
import logoBackgroundLight from '../../img/logo-background-light-min.gif';
import logoForeground from '../../img/logo-foreground.svg';

export default function Logo({
    light,
    ...props
}) {
    return (
        <div 
            className={`${style.wrapper} ${props.className ? props.className : ''}`}
            style={{
                backgroundImage: `url(${light ? logoBackgroundLight : logoBackground})`
            }}
        >
            <img {...className(`img-fluid`)} src={logoForeground} />
        </div>
    );
};
