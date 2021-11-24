import React, { memo } from 'react';

import { BaseLink } from '../BaseLink';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, ['utility']);

export const Tabs = memo(({ items = [], linkClassName, activeClassName, liClassName, tabIndex, ...props}) => {
    return (
        <ul {...className(`nav nav-tabs ${props.className ? props.className : ''}`)} >
          {items.map(({active, ...item}, i) => (
            <li key={i} {...className(`nav-item ${liClassName ? liClassName : ''}`)}>
              <BaseLink 
                  {...tabIndex && {tabIndex}}
                  {...item}
                  {...item.scheme === 'gatsby' && {activeLinkClass: activeClassName}}
                  {...className(`nav-link ${active ? 'active' : ''} ${active && activeClassName ? activeClassName : ''} ${linkClassName ? linkClassName : ''}`, null, 'extraClassName')}                  
              />
            </li>
          ))}
        </ul>
    );
});