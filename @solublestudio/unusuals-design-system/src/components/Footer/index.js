import React from 'react';
import {
    className,
    Container,
    Row,
    Col,
    Text,
} from '@solublestudio/soluto-design-system';

import GatsbyImageComponent from '../Gatsby/GatsbyImageComponent';

import Link from 'Link';

import Logo from '../Logo';

import style from './style.module.scss';

export default function Footer({
    title,
    socialLinks = [],
    copyright,
    legalLinks = [],
    Tag = 'footer',
    footerLinks,
    socialIcons,
}) {
    return (
        <Tag
            {...className(
                `${style.footer} ${style.footerLine} pt-4 pt-lg-8 pb-4`,
            )}>
            <Container>
                <Row mb={{ xs: 6 }}>
                    <Col
                        col={{ xs: 12, lg: 2 }}
                        className={style.footerMainLogo}>
                        <Row className={style.logoRow}>
                            <Col col={{ xs: 6, lg: 12 }}>
                                <Logo className={style.footerMainLogoImg} />
                            </Col>
                            <Col col={{ xs: 6, lg: 12 }}>
                                <Text tag="p" className="normal">
                                    {title}
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                    {footerLinks?.length > 0 &&
                        footerLinks.map((col, i) => (
                            <Col
                                key={`col-footer-${i}`}
                                offset={{ xs: 0, lg: i === 0 ? 1 : 0 }}
                                col={{ xs: 12, lg: i === 1 ? 3 : 2 }}
                                className={style.footerMainItems}>
                                <ul
                                    {...className(
                                        `list-unstyled mt-2 mt-lg-0 ${style.lists}`,
                                    )}>
                                    {col?.length > 0 &&
                                        col.map((link, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link
                                                        to={link.href}
                                                        target={link.target}
                                                        {...className(
                                                            link.type ===
                                                                'default'
                                                                ? 'text-capitalize text-basic-100 link'
                                                                : 'caption text-basic-100 medium text-uppercase',
                                                        )}>
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </Col>
                        ))}
                </Row>
            </Container>

            <div className={[style.footerLine].join(' ')}>
                <Container>
                    <Row className={['pt-4', 'align-items-center'].join(' ')}>
                        <Col
                            col={{ xs: 12, lg: 3 }}
                            className={style.socialIcons}>
                            {socialLinks.map((social, i) => {
                                return (
                                    <Link
                                        key={i}
                                        to={social.href}
                                        className={[
                                            style.socialicon,
                                            style[`${social.kind}`],
                                        ].join(' ')}>
                                        <GatsbyImageComponent
                                            className={[
                                                style.socialiconimg,
                                            ].join(' ')}
                                            image={
                                                socialIcons
                                                    ? socialIcons[social.kind]
                                                          ?.publicURL
                                                    : social.icon
                                            }
                                        />
                                    </Link>
                                );
                            })}
                        </Col>
                        <Col
                            col={{ xs: 12, lg: 5, xxl: 6 }}
                            mt={{ xs: 3, lg: 0 }}>
                            <ul
                                {...className(
                                    `list-unstyled mb-0 ${style.privacityLinksList}`,
                                )}>
                                {legalLinks &&
                                    legalLinks.map((link, i) => {
                                        return (
                                            <li key={i}>
                                                <Link
                                                    to={link.href}
                                                    target={link.target}
                                                    {...className(
                                                        'text-capitalize small text-basic-100',
                                                    )}>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </Col>
                        <Col
                            className="text-lg-right"
                            col={{ xs: 12, lg: 4, xxl: 3 }}
                            mt={{ xs: 3, lg: 0 }}>
                            <Text
                                tag="p"
                                className={[
                                    'caption',
                                    'text-uppercase',
                                    'text-basic-100',
                                ].join(' ')}>
                                {copyright}
                            </Text>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Tag>
    );
}
