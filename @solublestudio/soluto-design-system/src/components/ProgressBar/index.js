import React, { PureComponent } from 'react';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'text' ]);

export class ProgressBar extends PureComponent {
    render() {
        const {
            percentage = 0,
            wrapperClassName = '',
            barClassName = ''
        } = this.props;
        
        return (
            <div {...className(`progress ${wrapperClassName ? wrapperClassName : ''}`)}>
                <div 
                    {...className(`progress-bar ${barClassName ? barClassName : ''}`)} 
                    role="progressbar" 
                    style={{ width: `${percentage}%` }} 
                    aria-valuenow={percentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100" 
                />
            </div>
        );
    }
} 

 