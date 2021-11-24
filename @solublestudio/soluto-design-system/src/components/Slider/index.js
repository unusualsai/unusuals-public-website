import React from 'react';

let TinySlider = ({ children }) => (<div>{children}</div>);

if (typeof window !== 'undefined') {
    TinySlider = require('tiny-slider-react').default;
}

export const Slider = ({ settings = {}, children, parentRef = null, ...props }) => (
    <TinySlider settings={settings} ref={parentRef} {...props}>
        {children}
    </TinySlider>
);