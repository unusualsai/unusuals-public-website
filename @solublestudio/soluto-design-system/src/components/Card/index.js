/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';

import { Heading } from '../Heading';
import { Text } from '../Text';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';

const { className } = new CssClassNames(moduledStyles, [
    'utility',
    'text',
    'media',
]);

export class CardDeck extends PureComponent {
    render() {
        const { cards = [], children = null } = this.props;

        return (
            <div {...className('card-deck')}>
                {cards && cards.length
                    ? cards.map((card, i) => <Card key={i} {...card} />)
                    : children}
            </div>
        );
    }
}

export class Card extends PureComponent {
    render() {
        const {
            imgTop = null,
            imgTopWrapperClassName = '',
            imgTopPlaceholderClassName = null,
            imgLabelComponent = null,
            imgTopAlt = '',
            preTitleComponent = null,
            title = null,
            titleHref = null,
            titleTag = 'h5',
            titleClassName = '',
            text = null,
            textClassName = '',
            textTag = 'p',
            children = null,
            onClick = () => {},
            onMouseEnter,
            onMouseLeave,
            wrapperClassName = '',
            bodyClassName = '',
        } = this.props;

        return (
            <div
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onKeyDown={onClick}
                {...className(`card ${wrapperClassName}`)}>
                {imgTop ? (
                    imgTopWrapperClassName ? (
                        <div
                            {...className(
                                `${imgTopWrapperClassName} card-img-top position-relative`,
                            )}>
                            <img
                                {...className('img-fluid')}
                                src={imgTop}
                                alt={imgTopAlt}
                            />
                            {imgLabelComponent}
                        </div>
                    ) : (
                        <img
                            {...className('card-img-top')}
                            src={imgTop}
                            alt={imgTopAlt}
                        />
                    )
                ) : imgTopPlaceholderClassName ? (
                    <div
                        {...className(
                            `card-img-top ${imgTopPlaceholderClassName} position-relative`,
                        )}>
                        {imgLabelComponent}
                    </div>
                ) : null}
                <div
                    {...className(
                        `card-body ${bodyClassName}`,
                    )}>
                    {preTitleComponent}
                    {title ? (
                        titleHref ? (
                            <a href={titleHref} title={title}>
                                <Heading
                                    tag={titleTag}
                                    {...className(
                                        `card-title ${
                                            titleClassName ? titleClassName : ''
                                        }`,
                                    )}>
                                    {title}
                                </Heading>
                            </a>
                        ) : (
                            <Heading
                                tag={titleTag}
                                {...className(
                                    `card-title ${
                                        titleClassName ? titleClassName : ''
                                    }`,
                                )}>
                                {title}
                            </Heading>
                        )
                    ) : null}
                    {text ? (
                        <Text
                            tag={textTag}
                            {...className(
                                `card-text ${
                                    textClassName ? textClassName : ''
                                }`,
                            )}>
                            {text}
                        </Text>
                    ) : null}
                    {children}
                </div>
            </div>
        );
    }
}
