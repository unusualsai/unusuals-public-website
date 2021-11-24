import React, { forwardRef } from 'react';

import { Checkbox } from '../Checkbox';

export const Radio = forwardRef((props, ref) => (
    <Checkbox ref={ref} {...props} isRadio={true}></Checkbox>
));
