import React, { memo } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, ['utility']);

export const Table = memo(({
    headers,
    rows,
    rowHeaders,
    extraClass = ''
}) => {
    return (
        <table {...className(`table ${extraClass}`)}>
            {headers && headers.length ? (
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th 
                                key={i} 
                                scope="col"
                                dangerouslySetInnerHTML={{__html: h ? h : ''}}
                            />
                        ))}
                    </tr>
                </thead>
            ) : null}
            {rows && rows.length ? (
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            {rowHeaders && rowHeaders.length ? (
                                <th 
                                    scope="row"
                                    dangerouslySetInnerHTML={{ __html: rowHeaders[i] ? rowHeaders[i] : ' ' }}
                                />
                            ) : null}
                            {r.map((c, ii) => (
                                ['string', 'number'].indexOf(typeof c) !== -1 ? (
                                    <td 
                                        key={ii}
                                        dangerouslySetInnerHTML={{__html: c ? c : ''}}
                                    />
                                ) : (
                                    <td key={ii}>{c}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            ) : null}
        </table>
    );
});