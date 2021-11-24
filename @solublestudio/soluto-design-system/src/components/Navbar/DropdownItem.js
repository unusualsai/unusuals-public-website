/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';

import { BaseLink } from '../BaseLink';

import getRandomInt from '../../utils/getRandomInt';
import isMobile from '../../utils/isMobile';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
]);

const DropdownItem = ({
    dropdownClassName,
    dropdownCollapseClassName,
    subitems = [],
    dropdown = null,
    navbarShown = false,
    onOpen = null,
    onClose = null,
    dropdownActive,
    dropdownOn,
    forceCloseDropdown,
    ...props
}) => {
    const [show, setShow] = useState(false);
    const [isFullyOpened, setIsFullyOpened] = useState(false);
    const [isFullyClosed, setIsFullyClosed] = useState(true);
    const id = useMemo(() => getRandomInt('slb-'), []);

    useEffect(() => {
        if (!navbarShown && isMobile()) {
            setShow(false);
        }
    }, [navbarShown]);

    useEffect(() => {
        if (show && onOpen) {
            onOpen(id);
        } else if (!show && onClose) {
            onClose(id);
        }
    }, [show, onOpen, onClose, id]);

    useEffect(() => {
        if (show && !isFullyClosed && dropdownActive && dropdownActive !== id) {
            setShow(false);
        }
    }, [dropdownActive, id, show, setShow, isFullyClosed]);

    useEffect(() => {
        if (forceCloseDropdown && show) {
            setShow(false);
        }
    }, [forceCloseDropdown, show, setShow]);

    const handleToggleDropdown = useCallback(
        (e) => {
            if (!show || !props.href || props.href === '#') {
                e.preventDefault();
            }

            setShow(show ? false : true);
        },
        [show, props.href],
    );

    const handleEnter = useCallback((e) => {
        e.preventDefault();
        setShow(true);
    }, []);

    const handleLeave = useCallback((e) => {
        e.preventDefault();
        setShow(false);
    }, []);

    const handleOnWork = useCallback((arg) => {
        if (!arg.isOpened) {
            setIsFullyOpened(false);
        } else {
            setIsFullyClosed(false);
        }
    }, []);

    const handleOnRest = useCallback((arg) => {
        if (arg.isFullyOpened) {
            setIsFullyOpened(true);
        }
        if (arg.isFullyClosed) {
            setIsFullyClosed(true);
        }
    }, []);

    useEffect(() => {
        if (dropdownOn !== 'click') {
            return;
        }

        if (show) {
            setTimeout(() => {
                let overlay = window.document.getElementById(
                    'dropdown-overlay',
                );
                if (overlay) {
                    overlay.addEventListener('click', handleLeave);
                }
            }, 0);
        } else {
            let overlay = window.document.getElementById('dropdown-overlay');
            if (overlay) {
                overlay.removeEventListener('click', handleLeave);
            }
        }
    }, [show, dropdownOn, handleLeave]);

    return (
        <div
            onMouseLeave={
                navbarShown || dropdownOn === 'click' ? () => {} : handleLeave
            }>
            <BaseLink
                {...props}
                id={id}
                onMouseEnter={
                    dropdownOn === 'click' || navbarShown ? null : handleEnter
                }
                onClick={
                    dropdownOn === 'click' || navbarShown
                        ? handleToggleDropdown
                        : null
                }
                onClickAlways={navbarShown ? null : props.onClickAlways || null}
                role="button"
                extraAttributes={{
                    ...(props.extraAttributes && { ...props.extraAttributes }),
                    'data-expanded': show,
                    'aria-haspopup': 'true',
                    'aria-expanded': show,
                }}
            />
            {subitems.length > 0 || dropdown ? (
                <Collapse
                    isOpened={show}
                    aria-labelledby={id}
                    onWork={handleOnWork}
                    onRest={handleOnRest}
                    theme={{
                        collapse: className(
                            `${
                                dropdownCollapseClassName
                                    ? typeof dropdownCollapseClassName ===
                                      'string'
                                        ? dropdownCollapseClassName
                                        : dropdownCollapseClassName(
                                              show,
                                              isFullyClosed,
                                              isFullyOpened,
                                          )
                                    : ''
                            } dropdown-collapse`,
                        ).className,
                        content: className(
                            `${
                                dropdownClassName
                                    ? typeof dropdownClassName === 'string'
                                        ? dropdownClassName
                                        : dropdownClassName(
                                              show,
                                              isFullyClosed,
                                              isFullyOpened,
                                          )
                                    : ''
                            } dropdown`,
                        ).className,
                    }}>
                    {dropdown ? (
                        dropdown
                    ) : (
                        <div {...className('dropdown-items-wrapper')}>
                            {subitems.map((item, i) => (
                                <BaseLink
                                    key={i}
                                    {...className(
                                        'dropdown-item',
                                        null,
                                        'extraClassName',
                                    )}
                                    {...item}
                                />
                            ))}
                        </div>
                    )}
                </Collapse>
            ) : null}
        </div>
    );
};

export default memo(DropdownItem);
