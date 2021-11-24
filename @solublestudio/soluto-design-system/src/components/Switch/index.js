import React, { forwardRef } from 'react';

import { Checkbox } from '../Checkbox';

export const Switch = forwardRef((props, ref) => (
    <Checkbox ref={ref} {...props} isSwitch={true}></Checkbox>
));
