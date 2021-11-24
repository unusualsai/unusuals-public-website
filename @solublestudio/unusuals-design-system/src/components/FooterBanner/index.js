import React from 'react';
import { className } from '@solublestudio/soluto-design-system';
import style from './style.module.scss';

export default function FooterBanner({ cta, LinkTag = 'a' }) {
    return (
        <div className={style.footerBannerContainer}>
            <LinkTag
                {...className(
                    `bg-basic-700 heading1 pt-1 text-basic-100 fixed-bottom overflow-hidden ${style.footerBanner}`,
                )}
                href={cta.href}>
                <span className={style.marquee}>
                    {`${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} ${cta.label} `}
                </span>
            </LinkTag>
        </div>
    );
}
