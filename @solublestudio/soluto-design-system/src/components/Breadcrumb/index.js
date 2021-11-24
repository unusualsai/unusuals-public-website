import React from 'react';

import { BaseLink } from '../BaseLink';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'text' ]);

export function Breadcrumb({
  links = [],
  wrapperClassName = null,
  liClassName = null,
  linkClassName = null
}) {
  return (
    <nav aria-label="breadcrumb" {...wrapperClassName && {className: wrapperClassName}}>
      <ol 
        {...className('breadcrumb')}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {links.map((item, i) => {
          const isLast = links.length - 1 === i;
          
          return (
            <li 
              key={i} 
              {...className(`breadcrumb-item ${liClassName ? liClassName : ''} ${isLast ? 'active':''}`)}
              {...isLast && {'aria-current': 'page'}}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span itemProp="name">{item.title}</span>
              ) : (
                <BaseLink 
                  {...item} 
                  {...linkClassName && { extraClassName: linkClassName }}
                  extraAttributes={{
                    itemProp: 'item',
                    href: item.href
                  }}
                  title={
                    typeof item.title === 'string' ? 
                      (<span itemProp="name">{item.title}</span>) :
                      (<>
                          {item.title}
                          {item.titleAlt ? (
                            <span {...className('d-none')} itemProp="name">{item.titleAlt}</span>
                          ) : null}
                      </>)
                  }
                />
              )}
              <meta itemProp="position" content={i + 1} />
            </li>
          );
        })}
      </ol>
    </nav>
  )
}
