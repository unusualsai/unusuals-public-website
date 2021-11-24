import React, {
    Children,
    Fragment,
    cloneElement,
    useRef,
    useEffect,
    createElement,
} from 'react';
import ReactDOM from 'react-dom';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, ['utility', 'text']);

function TooltipContent({ children, onInit, contentClassName }) {
    const innerRef = useRef();
    const arrowRef = useRef();

    useEffect(() => {
        if (innerRef && innerRef.current && arrowRef && arrowRef.current) {
            onInit(
                innerRef.current.offsetWidth,
                innerRef.current.offsetHeight,
                arrowRef.current.offsetWidth,
                arrowRef.current.offsetHeight,
            );
        }
    }, [innerRef, arrowRef, onInit]);
    
    return (
        <Fragment>
            <div ref={arrowRef} {...className('arrow')} />
            <div
                ref={innerRef}
                {...className(
                    `tooltip-inner ${contentClassName ? contentClassName : ''}`,
                )}
            >
                {typeof children === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: children }} />
                ) : children}
            </div>
        </Fragment>
    );
}

export function Tooltip({
    children,
    content,
    margin = 0,
    onOpen,
    onClose,
    contentClassName,
    forceShow
}) {
    const childrenRefs = useRef([]);

    useEffect(() => {
        const mouseEnterListener = (event) => {
            const node = event.target;
            
            if (node.dataset.tooltipId || node?.parentNode?.dataset?.tooltipId || node?.parentNode?.parentNode?.dataset?.tooltipId) {
                return;
            }

            let randomId = `tt${Math.random().toString(36).substring(2, 15)}`;
            node.dataset.tooltipId = randomId;

            const nodePosition = node.getBoundingClientRect();

            let item = window.document.createElement('div');
            item.setAttribute('id', randomId);
            item.setAttribute('role', 'tooltip');
            item.setAttribute('class', className('tooltip').className);

            const onItemEnter = () => {
                if (window[`prevent${randomId}`]) {
                    window[`prevent${randomId}`]();
                }
                item.removeEventListener('mouseenter', onItemEnter);
            }
            item.addEventListener('mouseenter', onItemEnter);

            const onItemLeave = () => {
                if (window[`close${randomId}`]) {
                    window[`close${randomId}`]();
                }
                item.removeEventListener('mouseleave', onItemLeave);
            }
            item.addEventListener('mouseleave', onItemLeave);

            window.document.body.appendChild(item);

            ReactDOM.render(
                createElement(TooltipContent, {
                    children: content,
                    contentClassName,
                    onInit: (width, height, arrowWidth, arrowHeight) => {
                        let position = 'bottom';

                        let tooltipFromNodeLeft =
                            (node.offsetWidth - width) / 2;
                        let left = nodePosition.left + tooltipFromNodeLeft;
                        let top = nodePosition.top + node.offsetHeight + margin;

                        if (left < 10) {
                            position = 'right';
                            left =
                                nodePosition.left + node.offsetWidth + margin;
                            top =
                                nodePosition.top +
                                (node.offsetHeight - height) / 2;
                        } else {
                            let right =
                                window.innerWidth -
                                (node.offsetWidth +
                                    nodePosition.left -
                                    tooltipFromNodeLeft);
                            if (right < 20) {
                                position = 'left';
                                left =
                                    nodePosition.left -
                                    width -
                                    arrowWidth -
                                    margin;
                                top =
                                    nodePosition.top +
                                    (node.offsetHeight - height) / 2;
                            }
                        }

                        if (position === 'bottom') {
                            let bottomPointLimit =
                                top + height + arrowWidth + margin + 10;
                            if (bottomPointLimit > window.innerHeight) {
                                position = 'top';
                                top =
                                    nodePosition.top -
                                    height -
                                    arrowWidth -
                                    margin;
                            }
                        }

                        item.style.left = `${
                            left +
                            (window.pageXOffset ||
                                document.documentElement.scrollLeft)
                        }px`;
                        item.style.top = `${
                            top +
                            (window.pageYOffset ||
                                document.documentElement.scrollTop)
                        }px`;

                        item.classList.add(
                            className(`bs-tooltip-${position}`).className,
                        );
                        item.classList.add(className('show').className);

                        if (onOpen) {
                            onOpen();
                        }
                    },
                }),
                item,
            );

            setTimeout(() => {
                node.addEventListener('click', mouseLeaveListener);
            }, 0);
        };

        const removeTooltip = randomId => {
            let tooltip = document.querySelector(`#${randomId}`);
            if (tooltip) {
                if (onClose) {
                    onClose();
                }

                tooltip.remove();
            }

            let node = document.querySelector(`[data-tooltip-id="${randomId}"]`);
            
            if (node) {
                delete node.dataset.tooltipId;
                if (node.parentNode) {
                    node.parentNode.focus();
                }
            }
        }

        const mouseLeaveListener = (event) => {
            const node = event.target;
            const tooltipId = node.dataset.tooltipId;

            if (tooltipId) {
                let timeout = setTimeout(() => {
                    removeTooltip(tooltipId);
                }, 100);

                window[`prevent${tooltipId}`] = () => {
                    window.clearTimeout(timeout);
                }

                window[`close${tooltipId}`] = () => {
                    removeTooltip(tooltipId);
                }

                node.removeEventListener('click', mouseLeaveListener);
            }
        };

        childrenRefs.current.forEach((node) => {
            if (typeof forceShow === 'undefined') {
                node.addEventListener('mouseenter', mouseEnterListener);
                node.addEventListener('click', mouseEnterListener);
                node.addEventListener('mouseleave', mouseLeaveListener);
            } else if (forceShow) {
                mouseEnterListener({ target: node });
            } else {
                mouseLeaveListener({ target: node });
            }
        });

        return () => {
            childrenRefs.current.forEach((node) => {
                node.removeEventListener('mouseenter', mouseEnterListener);
                node.removeEventListener('mouseleave', mouseLeaveListener);
                node.removeEventListener('click', mouseEnterListener);
            });
        };
    }, [childrenRefs, margin, onOpen, onClose, contentClassName, content, forceShow]);

    return (
        <Fragment>
            {Children.map(children, (element, i) => {
                if (typeof element === 'string') {
                    return (
                        <span ref={(ref) => (childrenRefs.current[i] = ref)}>
                            {element}
                        </span>
                    );
                }

                return cloneElement(element, {
                    ref: (ref) => (childrenRefs.current[i] = ref),
                });
            })}
        </Fragment>
    );
}
