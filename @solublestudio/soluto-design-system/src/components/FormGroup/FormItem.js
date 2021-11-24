/* eslint-disable jsx-a11y/no-onchange */
import React, { forwardRef } from 'react'

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'transition' ]);

const FormItem = forwardRef(({
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    label = null,
    extraClassName, 
    id, 
    name, 
    placeholder, 
    options, 
    rows, 
    required, 
    error, 
    success, 
    isCustomCheckbox = false, 
    pattern,
    extraAtts,
    size,
    ...props
}, ref) => {
    let inputItem = null;
    
    switch(type) {
        case 'select':
            inputItem = (
                <select 
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    {...onBlur && { onBlur }}
                    {...className(`custom-select ${size ? `custom-select-${size}` : ''} ${error ? 'is-invalid' : ''} ${success ? 'is-valid': ''}`, extraClassName)}
                    id={id}
                    {...name && {name}}
                    {...props['aria-label'] && !label && {'aria-label': props['aria-label']} }
                    {...extraAtts && { ...extraAtts }}
                >
                    <option disabled="disabled" value="">{placeholder}</option>
                    {options && typeof options.map !== 'undefined' ? 
                        (options.map((value, k) => (<option key={k} value={value}>{value}</option>))) :
                        (Object.keys(options).map((value, k) => (<option key={k} value={value}>{options[value]}</option>)))}
                </select>                                        
            );
            break;
        case 'textarea': 
            inputItem = (
                <textarea 
                    ref={ref}
                    value={value} 
                    onChange={onChange}
                    onFocus={onFocus}
                    {...onBlur && { onBlur }}
                    type={type} 
                    {...className(`form-control ${size ? `form-control-${size}` : ''} ${error ? 'is-invalid' : ''} ${success ? 'is-valid': ''}`, extraClassName)} 
                    id={id} 
                    {...name && {name}}
                    placeholder={placeholder}
                    rows={rows}
                    required={required}
                    {...props['aria-label'] && !label && {'aria-label': props['aria-label']} }
                /> 
            );
            break;    
        case 'checkbox': 
        case 'radio':
            inputItem = (
                <input 
                    ref={ref}
                    value={value} 
                    onChange={onChange}
                    onFocus={onFocus}
                    type={type} 
                    {...className(`${isCustomCheckbox ? 'custom-control-input' : 'form-check-input'} ${error ? 'is-invalid' : ''} ${success ? 'is-valid': ''}`, extraClassName)} 
                    id={id}
                    {...name && {name}}
                    placeholder={placeholder}
                    required={required} 
                    {...props['aria-label'] && !label && {'aria-label': props['aria-label']} }
                />                         
            );
            break;
        default: 
            inputItem = (
                <input 
                    ref={ref}
                    value={value} 
                    onChange={onChange}
                    onFocus={onFocus}
                    {...onBlur && { onBlur }}
                    type={type} 
                    {...className(`form-control ${size ? `form-control-${size}` : ''} ${error ? 'is-invalid' : ''} ${success ? 'is-valid': ''}`, extraClassName)} 
                    id={id}
                    {...name && {name}}
                    {...pattern && {pattern}}
                    placeholder={placeholder}
                    required={required} 
                    {...extraAtts && { ...extraAtts }}
                    {...props['aria-label'] && !label && {'aria-label': props['aria-label']} }
                /> 
            )
    }

    return inputItem;
});

export default FormItem;