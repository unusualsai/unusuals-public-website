import React, { forwardRef, useMemo } from 'react';
import { Navbar, useIsMobile } from '@solublestudio/soluto-design-system';

import style from './style.module.scss';

import Logo from '../Logo';
import Link from 'Link';

export default forwardRef(function Header(
    { items, buttons, withBorder, ...props },
    ref,
) {
    const isMobile = useIsMobile();

    return (
        <header>
            <Navbar
                ref={ref}
                logoDom={<Logo />}
                isFixed={true}
                extraClass={style.navbar}
                wrapperClassName={
                    withBorder
                        ? (isScrolled) => (!isScrolled ? style.withBorder : '')
                        : () => ''
                }
                hideOnScroll={isMobile ? true : false}
                {...props}
                isTransparent={true}
                navs={[
                    items?.length
                        ? {
                              align: 'center',
                              items: useMemo(() => {
                                  return items.map((i) => ({
                                      ...i,
                                      Tag: Link,
                                      extraClassName: style.linkItem,
                                      linkClassName: [
                                          'caption',
                                          'text-uppercase',
                                      ].join(' '),
                                      scheme: 'gatsby',
                                      activeClassName: style.linkActive,
                                  }));
                              }, [items]),
                              className: style.navbarLeft,
                          }
                        : null,
                    buttons?.length
                        ? {
                              align: 'right',
                              items: useMemo(() => {
                                  return buttons.map((i) => ({
                                      ...i,
                                      Tag: Link,
                                      title: i.title,
                                      label: i.title,
                                      type: 'secondaryButton',
                                      scheme: 'button',
                                      extraClassName: style.linkItem,
                                      linkClassName: style.link,
                                      activeClassName: style.linkActive,
                                  }));
                              }, [buttons]),
                              className: style.navbarRight,
                          }
                        : null,
                ]}
            />
        </header>
    );
});
