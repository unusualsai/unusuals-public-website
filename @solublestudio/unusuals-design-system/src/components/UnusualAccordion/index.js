import React from 'react';
import PropTypes from 'prop-types';

import { Heading, Text, Accordion } from '@solublestudio/soluto-design-system';

import Button from '../ButtonComponent';

import style from './style.module.scss';

export default function UnusualAccordion({
    dark,
    items,
    afterContent,
    wrapperClassName,
    onOpenItemChange,
}) {
    return (
        <Accordion
            items={items.map((item) => ({
                title: (
                    <Heading
                        tag="h3"
                        className={`large font-weight-bolder ${style.titleClassName}`}>
                        {item.title}
                    </Heading>
                ),
                className: dark ? style.darkItem : style.lightItem,
                body: (
                    <>
                        <Text
                            tag="div"
                            className={`medium ${
                                dark ? 'text-basic-100' : 'text-basic-800'
                            }`}>
                            {item.description}
                        </Text>
                        {!!item.cta && (
                            <Button
                                button={{
                                    ...item.cta,
                                    type: 'tertiaryColorBasic',
                                    className: 'mt-4 mb-4 mt-lg-6 mb-lg-0',
                                }}></Button>
                        )}
                        {!!afterContent && afterContent}
                    </>
                ),
            }))}
            wrapperClassName={wrapperClassName}
            openItemClassName={style.openItemClassName}
            bodyClassName={style.bodyClassName}
            titleClassName={`${style.buttonClassName} ${style.iconsClassName}`}
            onOpenItemChange={onOpenItemChange}></Accordion>
    );
}

UnusualAccordion.propTypes = {
    dark: PropTypes.bool,
    afterContent: PropTypes.any,
    wrapperClassName: PropTypes.string,
    onOpenItemChange: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            cta: PropTypes.shape({
                label: PropTypes.string,
                slug: PropTypes.string,
            }),
        }),
    ),
};
