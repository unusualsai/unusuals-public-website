import React from 'react';

import {
    Section
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

const UnusualSection = ({ children, lighterBg, scheme, className }) => {
    return (
        <Section 
            className={[
                style.section,
                lighterBg ? 'bg-basic-800' : '',
                scheme ? style[`scheme--${scheme}`] : '',
                className ? className : '',
            ].join(' ')}
        >
            {children}
        </Section>
    );
};

export default UnusualSection;
