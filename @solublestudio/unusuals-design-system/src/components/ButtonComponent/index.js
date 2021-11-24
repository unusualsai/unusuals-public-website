import React, { forwardRef } from 'react';

import { Button } from '@solublestudio/soluto-design-system';
import Link from 'Link';

import style from './style.module.scss';

const ButtonComponent = forwardRef(
    ({ button = null, buttons = [], Tag = Link, href = null }, ref) => {
        let theButtons = button ? [button] : buttons;

        return (
            <>
                {theButtons.map(
                    (
                        {
                            className,
                            block,
                            link,
                            isSubmit,
                            externalLink,
                            target,
                            label,
                            loading,
                            disabled,
                            arrow,
                            size,
                            type,
                            ...props
                        },
                        i,
                    ) => (
                        <Button
                            key={i}
                            ref={ref}
                            block={block ? true : false}
                            type={type}
                            className={`${style[type]} ${className}`}
                            size={size}
                            isGatsby={link && link.slug ? true : false}
                            isSubmit={isSubmit}
                            disabled={disabled}
                            Tag={
                                isSubmit
                                    ? 'button'
                                    : link && link.slug
                                    ? Tag
                                    : 'a'
                            }
                            href={
                                href
                                    ? href
                                    : link && link.slug
                                    ? `/${link.slug}/`
                                    : externalLink
                                    ? externalLink
                                    : '#'
                            }
                            target={target ? target : '_self'}
                            label={label}
                            beforeContent={
                                type === 'returnButton' ? (
                                    <>
                                        <span className={style.secondArrow}>
                                            {'<'}
                                        </span>
                                        <span className={style.firstArrow}>
                                            {'<'}
                                        </span>
                                    </>
                                ) : null
                            }
                            afterContent={
                                type === 'tertiaryColorSecondary' ||
                                type === 'tertiaryColorBasic' ? (
                                    <>
                                        <span className={style.firstArrow}>
                                            {'>'}
                                        </span>
                                        <span className={style.secondArrow}>
                                            {'>'}
                                        </span>
                                    </>
                                ) : null
                            }
                            {...props}>
                            {label}
                            {}
                        </Button>
                    ),
                )}
            </>
        );
    },
);

export default ButtonComponent;
