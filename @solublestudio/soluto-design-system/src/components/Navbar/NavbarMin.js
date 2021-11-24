import React, { PureComponent } from 'react';

import { NavItem } from './NavItem';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'transition' ]); 


export class NavbarMin extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClickBrand = this.handleClickBrand.bind(this);
    }

    handleClickBrand(e) {
        const { href = '/' } = this.props;

        if (href === window.location.pathname) {
            e.preventDefault();
        }
    }

    render () {
        const { 
            extraClass = '',
            wrapperClassName = () => {},
            logo = null,
            logoNavbarShown = null,
            logoAlt = '',
            dark = false,
            navs = [],
            scheme = null,
            Tag = null,
            href = '/'
        } = this.props;

        const NavbarBrandTag = scheme === 'gatsby' ? Tag : 'a';
        const navbarBrandParams = scheme === 'gatsby' ? { to: href } : { href };

        return (
            <nav id="navbar" {...className(`
                navbar
                ${dark ? 'navbar-dark' : 'navbar-light'} 
                ${extraClass}
            `, wrapperClassName(false, false))}
            >
                <NavbarBrandTag 
                    {...className('navbar-brand')}
                    {...navbarBrandParams}
                    onClick={this.handleClickBrand}
                >
                    {logo ? (<img src={logo} {...className(logoNavbarShown ? 'navbar-brand-default' : '')} alt={logoAlt} />) : `LOGO`}
                </NavbarBrandTag>

                {navs.map((nav, i) => (
                    <ul key={i} {...className(`navbar-nav ${nav.align === 'center' ? 'navbar-center' : 'navbar-right'} ${i === 0 ? 'first' : ''} modal-open-fix`)}>
                        {nav.items.map((item, k) => (
                            <NavItem 
                                key={k} 
                                {...item}
                            />
                        ))}
                    </ul>
                ))}
            </nav>
        )
    }
}