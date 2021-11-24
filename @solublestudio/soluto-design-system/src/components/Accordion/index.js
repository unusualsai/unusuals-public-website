import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Collapse } from 'react-collapse';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';

const { className } = new CssClassNames(moduledStyles, ['utility']);

export const Accordion = forwardRef(
    (
        {
            items = [],
            initialShow = 0,
            wrapperClassName = '',
            itemClassName = '',
            openItemClassName = '',
            titleClassName = '',
            bodyClassName = '',
            allShown = false,
            lock = false,
            onOpenItemChange = () => {},
        },
        ref,
    ) => {
        const [show, setShow] = useState(initialShow);

        useImperativeHandle(ref, () => ({
            openItem: (index) => {
                if (index < items.length) {
                    setShow(index);
                    onOpenItemChange(index);
                }
            },
        }));

        return (
            <div {...className(wrapperClassName)} id="accordion">
                {items.map((item, i) => (
                    <div
                        key={i}
                        {...className(
                            `${itemClassName} ${
                                i === show || allShown || item.show
                                    ? `${openItemClassName} open`
                                    : ''
                            } ${item.className ? item.className : ''}`,
                        )}>
                        <button
                            {...className(
                                `w-100 d-block position-relative title ${titleClassName} ${
                                    item.classNameTitle
                                        ? item.classNameTitle
                                        : ''
                                }`,
                            )}
                            type="button"
                            data-toggle="collapse"
                            data-lock={allShown || lock || item.lock || item.show}
                            data-target={`#collapse${i}`}
                            aria-expanded={
                                i === show || allShown || item.show ? 'true' : 'false'
                            }
                            aria-controls={`#collapse${i}`}
                            id={`heading${i}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (allShown || lock || item.lock || item.show) {
                                    return;
                                }

                                setShow(show === i ? null : i);
                                onOpenItemChange(show === i ? null : i);
                            }}>
                            {item.title}
                        </button>
                        <Collapse
                            isOpened={i === show || allShown || item.show}
                            id={`collapse${i}`}
                            aria-labelledby={`heading${i}`}
                            data-parent="#accordion"
                            theme={{
                                collapse: className('collapse').className,
                                content: bodyClassName,
                            }}>
                            {item.body}
                        </Collapse>
                    </div>
                ))}
            </div>
        );
    },
);
