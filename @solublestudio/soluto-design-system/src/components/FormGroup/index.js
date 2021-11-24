/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';

import validEmail from '../../utils/validEmail';
import FormItem from './FormItem';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, [ 'utility', 'transition', 'text' ]);

export class FormGroup extends PureComponent {
    state = {
        value: '',
        error: false,
        success: false,
        msg: null,
        id: `fm${Math.random().toString(36).substring(2, 15)}`
    }

    updateInputValue = evt => {
        const { type } = this.props;
        
        this.setState({
            value: type === 'checkbox' || type === 'radio' ? evt.target.checked : evt.target.value,
            error: false,
            success: false
        });

        if (this.props.onChange) {
            this.props.onChange(evt);
        }
    }

    setValue(value) {
        if (this.refItem) {
            if (this.props.type === 'checkbox' || this.props.type === 'radio') {
                this.refItem.checked = value;
            } else {
                this.refItem.value = value;
            }
        }

        this.setState({
            value,
            error: false,
            success: false
        });
    }

    getValue() {
        return this.state.value;
    }

    setSuccess = (msg, duration = 3500) => {
        this.setState({
            success: true,
            msg
        });

        setTimeout(() => {
            this.setState({
                success: false,
                msg: null,
                value: ''
            })
        }, duration);
    }

    clearError = () => {
        this.setState({
            error: false,
            msg: null
        });
    }

    setError = (msg) => {
        this.setState({
            error: true,
            msg
        })
    }

    validate() {
        const { type = 'text', defaultMessages = {}, required } = this.props;
        
        if (!this.state.value && required) {
            this.setState({
                error: true,
                msg: defaultMessages.required || 'This field is mandatory'
            });

            return false;
        }

        if (type === 'email') {
            const validate = validEmail(this.state.value);
            if (!validate) {
                this.setState({
                    error: true,
                    msg: defaultMessages.email || '* Please provide a valid email'
                });
            }
            return validate;
        }

        return true;
    }

    handleOnFocus = (e) => {
        e.preventDefault();
        this.setState({
            error: false,
            success: false,
            msg: null
        });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    isFocused = () => {
        return typeof window !== 'undefined' && window.document.activeElement === this.refItem;
    }

    switchCheckboxOnPressSpace = (e) => {
        if (e.keyCode === 32 && this.refItem) {
            e.preventDefault();
            const newChecked = this.refItem.checked ? false : true;

            this.refItem.checked = newChecked;
            this.updateInputValue({
                target: {
                    checked: newChecked
                }
            });
        }
    }

    render() {
        const { label, labelPosition = 'before', type = 'text', onlySuccess = false, validatorClassName = '', labelClassName = '', required = false, ...props } = this.props;
        const { error, id, success, msg } = this.state;
        const isCheckbox = type === 'checkbox' || type === 'radio';
        const isCustomCheckbox = isCheckbox && labelPosition !== 'before';
        
        return(
            <>
                {success && msg && onlySuccess
                    ? (
                        <div {...className(`valid-feedback valid-msg`)}><span dangerouslySetInnerHTML={{__html: msg}} /></div> 
                    )
                    : (
                        <div {...className(`${isCheckbox ? (isCustomCheckbox ? `custom-control custom-${type === 'radio' ? 'radio' : 'checkbox'}` : 'form-check') : 'form-group'} ${this.props.className ? this.props.className : ''}`)}>
                            {label && labelPosition === 'before' && (
                                <label 
                                    htmlFor={id} 
                                    {...className(`${isCheckbox ? 'form-check-label' : ''} 
                                    ${labelClassName ? labelClassName : ''}`)}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />)}
                            <FormItem 
                                ref={el => this.refItem = el}
                                {...props}
                                label={label}
                                type={type}
                                {...this.state} 
                                onChange={this.updateInputValue} 
                                onFocus={this.handleOnFocus}
                                required={isCustomCheckbox ? false : required}
                                isCustomCheckbox={isCustomCheckbox}
                            />
                            {label && labelPosition !== 'before' && (
                                <label 
                                    htmlFor={id} 
                                    {...className(`${isCheckbox ? (isCustomCheckbox ? 'custom-control-label' : 'form-check-label') : ''} ${labelClassName ? labelClassName : ''}`)} 
                                    {...isCustomCheckbox && { tabIndex: 0 }}
                                    onKeyDown={isCustomCheckbox ? this.switchCheckboxOnPressSpace : null}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />)}
                            {error && msg && (
                                <div {...className(`invalid-feedback ${validatorClassName ? validatorClassName: ''}`)}>
                                    <span dangerouslySetInnerHTML={{__html: msg}} />
                                </div>)
                            }
                            {success && msg && !onlySuccess && (
                                <div {...className(`valid-feedback ${validatorClassName ? validatorClassName: ''}`)}>
                                    <span dangerouslySetInnerHTML={{__html: msg}} />
                                </div>)
                            }
                        </div>
                    )
                }
            </>
        )
    }
} 