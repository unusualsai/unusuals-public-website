import React from 'react';

import { Link as GatsbyLink, navigate as gatsbyNavigate } from 'gatsby';

export default function Link({
    to,
    href,
    children,
    activeClassName,
    ...props
}) {
    if (!to && !href) {
        return children;
    }

    let finalLink = to ? to : href;
    let onClick = props.onClick;

    if (finalLink.startsWith('/')) {
        finalLink = finalLink.substr(1);
    }

    const isGatsby = !(
        finalLink.startsWith('http') ||
        finalLink.startsWith('mailto') ||
        props.download ||
        finalLink.startsWith('#')
    );

    if (
        isGatsby &&
        finalLink &&
        !finalLink.endsWith('/') &&
        finalLink.indexOf('#') === -1
    ) {
        finalLink = `${finalLink}/`;
    }

    if (isGatsby && props.target === '_blank') {
        onClick = (e) => {
            e.preventDefault();
            window.open(`/${finalLink}`);

            if (props.onClick) {
                props.onClick(e);
            }
        };
    }

    return isGatsby ? (
        <GatsbyLink
            to={`/${finalLink}`}
            activeClassName={activeClassName}
            {...props}
            onClick={onClick}>
            {children}
        </GatsbyLink>
    ) : (
        <a
            href={finalLink}
            target="_blank"
            rel="noopener noreferrer"
            {...props}>
            {children}
        </a>
    );
}

export const navigate = (...args) => gatsbyNavigate(...args);
