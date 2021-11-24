import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

// TODO: Quitar este link, ya tenemos el NavItem

export default function Link({to, href, children, activeClassName, ...props}) {
    if (!to && !href) {
        return children;
    }

    let finalLink = to ? to : href;
    let onClick = props.onClick;
    
    if (finalLink.startsWith('/')) {
        finalLink = finalLink.substr(1);
    }

    const isGatsby = !(finalLink.startsWith('http') || finalLink.startsWith('mailto'));

    if (isGatsby && finalLink && !finalLink.endsWith('/') && finalLink.indexOf('#') === -1) {
        finalLink = `${finalLink}/`;
    }
    
    if (isGatsby && props.target === '_blank') {
        onClick = e => {
            e.preventDefault();
            window.open(`/${finalLink}`);

            if (props.onClick) {
                props.onClick(e);
            }
        }
    }

    const link = isGatsby ? (
        <GatsbyLink  
            to={`/${finalLink}`}
            activeClassName={activeClassName}
            {...props} 
            onClick={onClick}
        >
            {children}
        </GatsbyLink>
    ) : (
        <a href={finalLink} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    )

    return link;
}