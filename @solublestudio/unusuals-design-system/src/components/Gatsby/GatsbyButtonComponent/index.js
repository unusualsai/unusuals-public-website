import React from 'react';
import { Link } from 'gatsby';

import ButtonComponent from '../../ButtonComponent';

export default function GatsbyButtonComponent(props) {
    return <ButtonComponent Tag={Link} {...props} />;
}
