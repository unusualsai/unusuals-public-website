import React, { useState, useEffect } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'text' ]);

export const Pagination = ({
    pages,
    pagesDepth,
    pageHref,
    firstPageHref,
    activePage,
    LinkTag,
    pageClassName,
    disabledClassName,
    arrowClassName,
    wrapperClassName,
    activeClassName,
    arrowSvg
}) => {
    const [pagesArray, setPagesArray] = useState([]);

    if (!LinkTag) {
        LinkTag = 'a';
    }

    useEffect(() => {
        if (!pages) {
            setPagesArray([]);
            return;
        }

        let pageItem = pages;
        let thisPageArray = [];
        let minPageDepth = activePage - pagesDepth;
        let maxPageDepth = activePage + pagesDepth;
        if (minPageDepth < 0) {
            minPageDepth = 0;
        }
        
        while (pageItem) {
            if (pageItem >= minPageDepth && pageItem <= maxPageDepth) {
                thisPageArray.push(pageItem);
            }

            pageItem--;
        }

        setPagesArray(thisPageArray.reverse());
    }, [ pages, activePage, pagesDepth ]);

    return (
        <nav aria-label="Navigation">
            <ul {...className(`pagination ${wrapperClassName ? wrapperClassName : ''}`)}>
                <li {...className(`page-item ${activePage == 1 ?  `disabled ${disabledClassName ? disabledClassName : ''}` : ''}`)}>
                    <LinkTag 
                        {...className(`page-link ${arrowClassName ? arrowClassName : ''}`)}
                        href={activePage > 1 && pageHref ? (activePage === 2 && firstPageHref ? firstPageHref : pageHref.replace('{page}', activePage - 1)) : '#'}
                        aria-label="Previous"
                        {...activePage == 1 ? { tabIndex: '-1' } : {}}
                    >
                        {arrowSvg ? arrowSvg : null}
                        <span aria-hidden="true">&laquo;</span>
                        <span {...className('sr-only')}>Previous</span>
                    </LinkTag>
                </li>
                {pagesArray.map((p, i) => (
                    <li key={i} {...className(`page-item ${activePage == p ? `active ${activeClassName ? activeClassName : ''}` : ''}`)}>
                        <LinkTag 
                            {...className(`page-link ${pageClassName ? pageClassName : ''}`)}
                            href={p == 1 && firstPageHref ? firstPageHref : (pageHref ? pageHref.replace('{page}', p) : '#')}
                        >
                            {p}
                            {activePage == p ? (<span {...className('sr-only')}>(current)</span>) : null}
                        </LinkTag>
                    </li>
                ))}     
                <li {...className(`page-item ${activePage == pages ? `disabled ${disabledClassName ? disabledClassName : ''}` : ''}`)}>
                    <LinkTag 
                        {...className(`page-link page-link-next ${arrowClassName ? arrowClassName : ''}`)}
                        href={activePage < pages && pageHref ? pageHref.replace('{page}', activePage + 1) : '#'}
                        aria-label="Next"
                        {...activePage == pages ? { tabIndex: '-1' } : {}}
                    >
                        {arrowSvg ? arrowSvg : null}
                        <span aria-hidden="true">&raquo;</span>
                        <span {...className('sr-only')}>Next</span>
                    </LinkTag>
                </li>
            </ul>
        </nav>
    );
}