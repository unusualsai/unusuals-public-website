import React from 'react';

export default function Link({
    to,
    href,
    children,
    activeClassName,
    target,
    ...props
}) {
    if (!to && !href) {
        return children;
    }

    let finalLink = to ? to : href;

    if (finalLink.startsWith('/')) {
        finalLink = finalLink.substr(1);
    }

    const isInternal = !(
        finalLink.startsWith('http') || finalLink.startsWith('mailto')
    );

    if (
        isInternal &&
        finalLink &&
        !finalLink.endsWith('/') &&
        finalLink.indexOf('#') === -1
    ) {
        finalLink = `${finalLink}/`;
    }

    return (
        <a
            href={finalLink}
            {...(props.target === '_blank' && {
                target: '_blank',
                rel: 'noopener noreferrer',
            })}
            {...props}>
            {children}
        </a>
    );
}

export const navigate = (...args) => {
    return typeof window !== undefined && window.open(...args);
};
