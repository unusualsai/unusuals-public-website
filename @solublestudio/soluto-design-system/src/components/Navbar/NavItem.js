import React, { memo, useCallback, useState } from 'react';

import { BaseLink } from '../BaseLink';
import DropdownItem from './DropdownItem';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
]);

export const NavItem = memo(
    ({
        active,
        extraClassName,
        linkClassName,
        subitems,
        dropdown,
        dropdownCollapseClassName,
        dropdownClassName,
        activeClassName,
        dropdownActive,
        forceCloseDropdown,
        navbarShown = false,
        onOpen,
        onClose,
        ...props
    }) => {
        const [dropdownShown, setDropdownShown] = useState(false);

        const { scheme, type = 'link' } = props;

        const isDropdown = type === 'list';

        let extraClass = linkClassName ? linkClassName : '';
        if (scheme !== 'button') {
            extraClass = [
                'nav-link',
                active ? `active ${activeClassName}` : '',
                isDropdown ? 'with-dropdown' : '',
                extraClass,
            ].join(' ');
        }

        extraClass = className(extraClass, null, 'extraClassName');

        const onOpenDropdown = useCallback(
            (id) => {
                if (onOpen) {
                    onOpen(id);
                }

                setDropdownShown(true);
            },
            [onOpen, setDropdownShown],
        );

        const onCloseDropdown = useCallback(
            (id) => {
                if (onClose) {
                    onClose(id);
                }

                setDropdownShown(false);
            },
            [onClose, setDropdownShown],
        );

        return (
            <li
                {...className(
                    `nav-item ${isDropdown ? 'dropdown' : ''} ${
                        extraClassName ? extraClassName : ''
                    } ${
                        scheme === 'button' && type !== 'link'
                            ? 'with-button'
                            : ''
                    }`,
                )}
                {...(dropdownShown && { 'data-dropdown-shown': 'true' })}>
                {isDropdown ? (
                    <DropdownItem
                        {...props}
                        {...extraClass}
                        {...className(
                            `active ${activeClassName}`,
                            null,
                            'activeLinkClass',
                        )}
                        subitems={subitems}
                        dropdown={dropdown}
                        dropdownCollapseClassName={dropdownCollapseClassName}
                        dropdownClassName={dropdownClassName}
                        navbarShown={navbarShown}
                        dropdownActive={dropdownActive}
                        forceCloseDropdown={forceCloseDropdown}
                        onOpen={onOpenDropdown}
                        onClose={onCloseDropdown}
                    />
                ) : (
                    <BaseLink
                        {...props}
                        {...extraClass}
                        {...className(
                            `active ${activeClassName}`,
                            null,
                            'activeLinkClass',
                        )}
                    />
                )}
            </li>
        );
    },
);
