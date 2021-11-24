import React, { useRef, useState, useEffect, useCallback } from 'react';

import {
    Container,
    Row,
    Col,
    className,
    animateScroll,
    useIsMobile,
} from '@solublestudio/soluto-design-system';

import Tabs from '../Tabs';
import IndustryDetailSection from '../IndustryDetailSection';

import style from './style.module.scss';

export default function IndustriesDetailSection({ industries }) {
    const [tabActive, setTabActive] = useState(0);
    const isMobile = useIsMobile();
    const wrapper = useRef();

    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }
        let lastY = 0;

        const hash = window.location.hash?.replace('#', '');

        if (hash) {
            setTimeout(() => {
                const element = window.document.querySelector(`[id="${hash}"]`);

                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;

                const offset = element?.getBoundingClientRect().top + scrollTop;

                animateScroll(offset);
            }, 250);
        }

        const onScroll = () => {
            if (lastY > window.scrollY){
                wrapper?.current?.children[0]?.setAttribute('data-scrolldown', false);
            }else{
                wrapper?.current?.children[0]?.setAttribute('data-scrolldown', true);
            }

            lastY = window.scrollY;
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    const onPressTab = useCallback(
        (ev, i) => {
            ev?.preventDefault();

            if (
                typeof window === 'undefined' ||
                !wrapper?.current ||
                typeof document === 'undefined'
            ) {
                return;
            }

            const sections = wrapper.current.children[1].children;
            window.location.hash = sections[i].children[0].id;

            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

            const offset = sections[i].getBoundingClientRect().top + scrollTop;
            animateScroll(offset);
        },
        [wrapper],
    );

    useEffect(() => {
        if (!wrapper?.current || typeof window === 'undefined') {
            return;
        }
        let sections = wrapper?.current?.children[1].children ?? [];

        let timeout = null;

        const onScroll = () => {
            for (let i = 0; i < sections.length; i++) {
                const id = sections[i].children[0].getAttribute('id');
                if (
                    sections[i].getBoundingClientRect().top <
                    window.innerHeight / 2
                ) {
                    if (id === industries[i].slug) {
                        setTabActive(i);
                    }
                }
            }
            timeout = null;
        };

        timeout = setTimeout(onScroll, 3000);

        window.addEventListener('scroll', onScroll);

        setTimeout(onScroll, 3000);

        return () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
            window.removeEventListener('scroll', onScroll);
        };
    }, [wrapper]);

    return (
        <div
            ref={wrapper}
            {...className(
                `${style.section} ${
                    industries[0].dark ? 'bg-basic-light' : 'bg-basic-000'
                }`,
            )}>
            <Container className={style.container}>
                <Row>
                    <Col>
                        <Tabs
                            links={industries.map((industry, i) => ({
                                title: industry.title,
                                href: `#${industry.slug}`,
                                active: tabActive === i,
                                onClick: (ev) => {
                                    onPressTab(ev, i);
                                },
                            }))}
                        />
                    </Col>
                </Row>
            </Container>
            <div>
                {industries.map((industry, index) => {
                    return <IndustryDetailSection key={index} {...industry} />;
                })}
            </div>
        </div>
    );
}
