import React, { useRef, useEffect } from 'react';

import {
    className,
    Text,
    Heading,
    Container,
    Row,
    Col,
    Section,
} from '@solublestudio/soluto-design-system';

import style from './style.module.scss';
import DiscoverCardSection from '../DiscoverCardSection';
import Gradient from '../../img/discover-gradient.png';

export default function DiscoverSection({
    title,
    description,
    footer,
    sections,
}) {
    const wrapperLines = useRef();
    const whiteLine = useRef(null);
    const defaultLine = useRef(null);
    let currentSection = null;
    let panels = null;
    let start = 0;
    let end = 0;

    useEffect(() => {
        if (!wrapperLines?.current || typeof window === 'undefined') {
            return;
        }

        defaultLine.current = wrapperLines.current.children[0];
        whiteLine.current = wrapperLines.current.children[1];
        currentSection = wrapperLines.current.closest('Section');
        panels = wrapperLines.current.parentElement.children[2];
        const onScroll = () => {
            let scroll = window.scrollY;

            let setHeight =
                defaultLine.current.offsetHeight <
                scroll - currentSection.offsetTop
                    ? defaultLine.current.offsetHeight
                    : scroll - currentSection.offsetTop;
            whiteLine.current.style.height = setHeight + 'px';

            for (let i = 0; i < panels.childElementCount; i++) {
                start = (panels.children[i].getBoundingClientRect().top / window.innerHeight) * 100;
                end = ((panels.children[i].getBoundingClientRect().top + panels.children[i].getBoundingClientRect().height) / window.innerHeight) * 100;
                
                if ( start < 40 && end > 40 ) {
                    panels.children[i].setAttribute('data-active', true); //Add
                } else {
                    panels.children[i].setAttribute('data-active', false); //Remove
                }
            }
        };
        window.addEventListener('scroll', onScroll);
    }, [wrapperLines]);

    return (
        <Section className={style.discoverSection}>
            <Container>
                <Row>
                    <Col
                        col={{ xs: 12, lg: 10 }}
                        offset={{ xs: 0, lg: 1 }}
                        className={['text-center'].join(' ')}>
                        <Heading
                            data-sal="slide-up"
                            className={['display2', 'mb-4', 'd-block'].join(
                                ' ',
                            )}
                            tag="h2">
                            {title}
                        </Heading>
                        <Text
                            data-sal="slide-up"
                            className={['large', 'd-block'].join(' ')}
                            tag="div">
                            {description}
                        </Text>
                    </Col>
                </Row>

                {sections ? (
                    <div className={style.animation}>
                        <div className={style.gradient}>
                            <div className={style.gradientAux}>
                                <img
                                    src={Gradient}
                                    className={style.gradientImg}
                                />
                            </div>
                        </div>

                        <div className={style.lines} ref={wrapperLines}>
                            <div
                                className={`${style.line} ${style.lineDefault}`}></div>
                            <div
                                className={`${style.line} ${style.lineWhite}`}></div>
                        </div>

                        <div>
                            {sections.map((item, i) => {
                                return (
                                    <div
                                        data-sal="slide-up"
                                        className={style.discoverCardSection}
                                        key={i}>
                                        <DiscoverCardSection {...item} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}

                <Row>
                    <Col
                        col={{ xs: 12, lg: 8 }}
                        offset={{ xs: 0, lg: 2 }}
                        className={['text-center'].join(' ')}
                        data-sal="slide-up">
                        <Text
                            className={['heading2', style.center].join(' ')}
                            tag="div">
                            {footer}
                        </Text>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}
