import React, { PureComponent, createRef } from 'react';

import {
    enableBodyScroll,
    disableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { NavItem } from './NavItem';

import getWindowScroll from '../../utils/getWindowScroll';
import animateScroll from '../../utils/animateScroll';

import { Collapse } from 'react-collapse';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [
    'utility',
    'transition',
]);

export class Navbar extends PureComponent {
    state = {
        isScrolled: false,
        navbarShown: false,
        navbarAnimating: false,
        hideNavbar: false,
        activeDropdown: null,
        showOverlay: false,
        showOverlayComplete: false,
        forceCloseDropdown: false,
    };

    constructor(props) {
        super(props);

        this.navbar = createRef();

        this.handleClickBrand = this.handleClickBrand.bind(this);
        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleDropdownOpen = this.handleDropdownOpen.bind(this);
        this.handleDropdownClose = this.handleDropdownClose.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);

        this.lastY = null;
    }

    componentDidMount() {
        if (this.props.isFixed) {
            this.handleWindowScroll();
        }

        if (typeof window !== 'undefined' && this.props.isFixed) {
            window.addEventListener('scroll', this.handleWindowScroll);
        }

        if (typeof window !== 'undefined') {
            window.document.body.dataset.navbarShown =
                this.state.navbarShown && !this.state.navbarAnimating
                    ? 'true'
                    : 'false';
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined' && this.props.isFixed) {
            window.removeEventListener('scroll', this.handleWindowScroll);
        }

        clearAllBodyScrollLocks();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.navbarShown !== this.state.navbarShown &&
            this.navbar.current
        ) {
            let element = this.navbar.current.querySelector(
                '.scrollable-content',
            );
            if (!element) {
                element = this.navbar.current;
            }

            if (this.state.navbarShown) {
                disableBodyScroll(element);
            } else {
                enableBodyScroll(element);
            }
        }

        if (!prevState.showOverlay && this.state.showOverlay) {
            this.setState({
                showOverlayComplete: true,
            });
        } else if (
            prevState.showOverlayComplete &&
            !this.state.showOverlayComplete
        ) {
            setTimeout(() => {
                this.setState({
                    showOverlay: false,
                });
            }, 200);
        }

        if (typeof window !== 'undefined') {
            window.document.body.dataset.navbarShown =
                this.state.navbarShown && !this.state.navbarAnimating
                    ? 'true'
                    : 'false';
        }

        if (
            this.props.onToggleScroll &&
            prevState.isScrolled !== this.state.isScrolled
        ) {
            this.props.onToggleScroll(this.state.isScrolled);
        }
    }

    handleWindowScroll = () => {
        const { scrollToHide = 20 } = this.props;
        const { y } = getWindowScroll();

        if (!this.state.isScrolled && y >= scrollToHide) {
            this.setState({
                isScrolled: true,
            });
        } else if (this.state.isScrolled && y < scrollToHide) {
            this.setState({
                isScrolled: false,
            });
        }

        if (y > this.lastY && this.state.isScrolled) {
            if (!this.state.hideNavbar) {
                this.setState({
                    hideNavbar: true,
                });
            }
        } else {
            if (
                this.state.hideNavbar &&
                this.navbar.current.dataset.hide !== 'true'
            ) {
                this.setState({
                    hideNavbar: false,
                });
            }
            if (this.navbar.current.dataset.hide === 'true') {
                this.setState({
                    hideNavbar: true,
                });
            }
        }

        this.lastY = y;
    };

    toggleCollapse = (isToggle) => () => {
        this.setState((state) => ({
            ...(state.navbarShown && { navbarShown: false }),
            ...(isToggle && { navbarShown: !state.navbarShown }),
            navbarAnimating: true,
        }));
    };

    handleExpanded(e) {
        this.setState({
            navbarAnimating: false,
        });
    }

    handleClickBrand(e) {
        const { href = '/', onClickBrand = null } = this.props;

        if (onClickBrand) {
            onClickBrand();
        }

        if (href === window.location.pathname) {
            e.preventDefault();
            animateScroll(0);
        }
    }

    handleDropdownOpen(name) {
        if (this.props.onDropdownOpen) {
            this.props.onDropdownOpen();
        }

        this.setState({
            activeDropdown: name,
            showOverlay: true,
        });
    }

    closeDropdown() {
        this.setState({
            forceCloseDropdown: true,
        });
    }

    handleDropdownClose(name) {
        setTimeout(() => {
            if (name === this.state.activeDropdown) {
                if (this.props.onDropdownClose) {
                    this.props.onDropdownClose();
                }

                this.setState({
                    showOverlayComplete: false,
                    forceCloseDropdown: false,
                });
            }
        }, 100);
    }

    render() {
        const {
            extraClass = '',
            isTransparent = false,
            hideOnScroll = false,
            showBrand = true,
            isFixed = true,
            wrapperClassName = () => {},
            logo = null,
            logoDom = null,
            logoNavbarShown = null,
            brandParams = {},
            logoAlt = '',
            dark = false,
            scrollDark = false,
            darkForce = false,
            lightForce = false,
            navs = [],
            scheme = null,
            Tag = null,
            href = '/',
            navbarExtraContent = null,
            customTogglerIcon = null,
            customTogglerIconOpen = null,
            customToggler = null,
            dropdownClassName = null,
            dropdownCollapseClassName = null,
            dropdownOverlay,
            dropdownOverlayMobile,
            dropdownOverlayClassName,
            NavbarBrandTag,
            blockScrollStyle,
            togglerClassName,
        } = this.props;

        const FinalNavbarBrandTag = NavbarBrandTag
            ? NavbarBrandTag
            : scheme === 'gatsby' || Tag
            ? Tag
            : 'a';
        const navbarBrandParams =
            scheme === 'gatsby'
                ? { ...brandParams, to: href }
                : { ...brandParams, href };

        return (
            <>
                <nav
                    ref={this.navbar}
                    id="navbar"
                    {...className(
                        `
                    navbar navbar-expand-lg 
                    ${
                        (isFixed && showBrand) || this.state.navbarShown
                            ? 'position-fixed fixed-top'
                            : ''
                    }
                    ${
                        darkForce
                            ? 'navbar-dark'
                            : lightForce
                            ? 'navbar-light'
                            : dark &&
                              (!this.state.isScrolled ||
                                  (this.state.isScrolled && scrollDark))
                            ? 'navbar-dark'
                            : 'navbar-light'
                    } 
                    ${isTransparent ? 'navbar-transparent' : ''}
                    ${extraClass}
                    ${
                        this.state.hideNavbar && hideOnScroll
                            ? 'navbar-hide'
                            : ''
                    }
                    ${this.state.navbarShown ? 'navbar-shown' : ''}
                    ${
                        !blockScrollStyle && this.state.isScrolled
                            ? 'navbar-scroll'
                            : ''
                    }
                    ${this.state.navbarAnimating ? 'navbar-animating' : ''}
                `,
                        wrapperClassName(
                            this.state.isScrolled,
                            this.state.navbarShown,
                            this.state.navbarAnimating,
                        ),
                    )}>
                    <FinalNavbarBrandTag
                        id="navbar-brand"
                        {...className(
                            `navbar-brand ${
                                showBrand || this.state.navbarShown
                                    ? ''
                                    : 'hide'
                            }`,
                        )}
                        {...navbarBrandParams}
                        onClick={this.handleClickBrand}>
                        <div>
                            {logoDom ? (
                                logoDom
                            ) : (
                                <>
                                    {logo ? (
                                        <img
                                            data-logo
                                            src={logo}
                                            {...className(
                                                logoNavbarShown
                                                    ? 'navbar-brand-default'
                                                    : '',
                                            )}
                                            alt={logoAlt}
                                        />
                                    ) : (
                                        `LOGO`
                                    )}
                                    {logoNavbarShown ? (
                                        <img
                                            data-logo-shown
                                            {...className('navbar-brand-shown')}
                                            src={logoNavbarShown}
                                            alt=""
                                        />
                                    ) : null}
                                </>
                            )}
                        </div>
                    </FinalNavbarBrandTag>

                    <button
                        {...className(
                            `navbar-toggler ${
                                customToggler ? customToggler : ''
                            } ${togglerClassName ? togglerClassName : ''}`,
                        )}
                        type="button"
                        onClick={this.toggleCollapse(true)}
                        aria-pressed={this.state.navbarShown}
                        aria-expanded={this.state.navbarShown}
                        aria-label={
                            this.state.navbarShown
                                ? 'Cerrar menú'
                                : 'Abrir menú'
                        }>
                        <span
                            {...className(
                                `navbar-toggler-icon ${
                                    customTogglerIcon ? customTogglerIcon : ''
                                } ${
                                    this.state.navbarShown &&
                                    customTogglerIconOpen
                                        ? customTogglerIconOpen
                                        : ''
                                }`,
                            )}></span>
                    </button>

                    <div {...className('navbar-collapse-space')} />

                    {navs || navbarExtraContent ? (
                        <Collapse
                            isOpened={this.state.navbarShown}
                            onRest={this.handleExpanded}
                            theme={{
                                collapse: `${
                                    className('navbar-collapse').className
                                } collapse-wrapper`,
                                content: `${
                                    className('navbar-show-height').className
                                } scrollable-content`,
                            }}>
                            {navs
                                ? navs
                                      .filter((n) => !!n)
                                      .map((nav, i) => (
                                          <ul
                                              key={i}
                                              {...className(
                                                  `navbar-nav ${
                                                      nav.align === 'center'
                                                          ? 'navbar-center'
                                                          : nav.align === 'left'
                                                          ? 'navbar-left'
                                                          : 'navbar-right'
                                                  } ${i === 0 ? 'first' : ''} ${
                                                      nav.className
                                                          ? nav.className
                                                          : ''
                                                  } modal-open-fix`,
                                              )}>
                                              {nav.items.map((item, k) => {
                                                  return (
                                                      <NavItem
                                                          key={k}
                                                          {...item}
                                                          isTransparent={
                                                              isTransparent
                                                          }
                                                          onClickAlways={
                                                              this
                                                                  .toggleCollapse
                                                          }
                                                          dropdownClassName={
                                                              dropdownClassName
                                                          }
                                                          dropdownCollapseClassName={
                                                              dropdownCollapseClassName
                                                          }
                                                          navbarShown={
                                                              this.state
                                                                  .navbarShown
                                                          }
                                                          dropdownActive={
                                                              this.state
                                                                  .activeDropdown
                                                          }
                                                          onOpen={
                                                              this
                                                                  .handleDropdownOpen
                                                          }
                                                          onClose={
                                                              this
                                                                  .handleDropdownClose
                                                          }
                                                          forceCloseDropdown={
                                                              this.state
                                                                  .forceCloseDropdown
                                                          }
                                                          {...(item.typeShown && {
                                                              type:
                                                                  this.state
                                                                      .navbarShown ||
                                                                  (isTransparent &&
                                                                      !this
                                                                          .state
                                                                          .isScrolled)
                                                                      ? item.typeShown
                                                                      : item.type,
                                                          })}
                                                      />
                                                  );
                                              })}
                                          </ul>
                                      ))
                                : null}
                            {navbarExtraContent}
                        </Collapse>
                    ) : null}
                </nav>
                {this.state.navbarShown && !isFixed ? (
                    <div data-navbar-height={true} />
                ) : null}
                {this.state.showOverlay &&
                (dropdownOverlay || dropdownOverlayMobile) ? (
                    <div
                        id="dropdown-overlay"
                        {...className(
                            `${
                                dropdownOverlay && !dropdownOverlayMobile
                                    ? 'd-none d-lg-block'
                                    : !dropdownOverlay && dropdownOverlayMobile
                                    ? 'd-lg-none'
                                    : ''
                            } ${moduledStyles.overlay} ${
                                this.state.showOverlayComplete
                                    ? moduledStyles['overlay--shown']
                                    : ''
                            } ${
                                dropdownOverlayClassName
                                    ? dropdownOverlayClassName
                                    : ''
                            }`,
                        )}
                    />
                ) : null}
            </>
        );
    }
}
