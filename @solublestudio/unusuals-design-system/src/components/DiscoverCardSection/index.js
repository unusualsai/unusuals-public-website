import React, { useEffect } from 'react';

import {
    className,
    Text,
    Heading,
    Row,
    Col,
    animateScroll,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';
import ButtonComponent from '../ButtonComponent';

export default function DiscoverCardSection({
    number,
    title,
    description,
    cta,
    contents,
    slug,
    Tag = 'div',
}) {
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        const hash = window.location.hash?.replace('#', '');

        if (hash) {
            setTimeout(() => {
                const element = window.document.querySelector(`[id="${hash}"]`);

                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;

                const offset = element?.getBoundingClientRect().top + scrollTop;

                animateScroll(offset, -175);
            }, 250);
        }
    }, []);

    return (
        <>
            <div className={style.anchor} id={slug}></div>
            <Tag {...className(`pr-2 pr-lg-0 pl-2 pl-lg-0 ${style.discoverCard}`)}>
                <Row>
                    <Col col={{ xs: 12, lg: 2 }} className={['pt-6'].join(' ')}>
                        <Text
                            tag="div"
                            mt={{ xs: 0, lg: 1 }}
                            className={[
                                style.number,
                                'highlights2',
                                'text-secondary-500',
                            ].join(' ')}>
                            {number}
                        </Text>
                    </Col>

                    <Col
                        col={{ xs: 12, lg: 9 }}
                        className={['pb-6', 'pt-1', 'pt-lg-6'].join(' ')}>
                        <Heading
                            tag="h4"
                            className={['display3', 'Heading-basic-900'].join(' ')}>
                            {title}
                        </Heading>

                        <Text
                            tag="div"
                            className={['medium', 'text-basic-800', 'mt-3'].join(
                                ' ',
                            )}>
                            {description}
                        </Text>

                        <ButtonComponent
                            button={{
                                ...cta,
                                type: 'primaryButton',
                                className: 'mt-4',
                            }}></ButtonComponent>
                    </Col>
                </Row>
                {contents ? (
                    <>
                        {contents.map((item, i) => (
                            <>
                                {item.text ? 
                                    <Row
                                        className={style.subsection}
                                        key={i}>
                                        <Col col={{ xs: 12, lg: 9 }} offset={{ lg: 2 }}>
                                            <Text
                                                tag="div"
                                                className={[
                                                    style.subsectionItem,
                                                    'medium',
                                                    'text-basic-800',
                                                    'pb-6',
                                                    'pt-6',
                                                ].join(' ')}>
                                                {item.text}
                                            </Text>
                                        </Col>
                                    </Row>
                                    : null
                                }
                            </>
                        ))}
                    </>
                ) : null}
            </Tag>
        </>
    );
}
