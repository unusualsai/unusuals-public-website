/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';

import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import CssClassNames from '../../scss/CssClassNames';
import moduledStyles from './styles.module.scss';
const { className } = new CssClassNames(moduledStyles, ['utility']);

// TODO: This is really ugly
let allowClose = true;
let modalsOpen = 0;

export class Modal extends PureComponent {
    state = {
        preShow: false,
        show: false,
    };

    constructor(props) {
        super(props);

        this.modalRef = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (typeof window !== 'undefined') {
            if (this.state.preShow && !prevState.preShow) {
                window.document.body.setAttribute('data-modal-open', 'true');
            } else if (
                !this.state.preShow &&
                prevState.preShow &&
                !modalsOpen
            ) {
                window.document.body.removeAttribute('data-modal-open');
            }
        }

        if (this.state.show !== prevState.show) {
            if (this.state.show) {
                modalsOpen += 1;
                if (this.modalRef) {
                    disableBodyScroll(this.modalRef);
                }
            } else {
                modalsOpen -= 1;
                
                allowClose = true;
                if (this.modalRef) {
                    enableBodyScroll(this.modalRef);
                }

                if (!modalsOpen) {
                    clearAllBodyScrollLocks();
                }
            }

            if (this.props.onToggle) {
                this.props.onToggle(this.state.show);
            }
        }
    }

    componentWillUnmount() {
        if (this.state.show) {
            if (this.modalRef) {
                enableBodyScroll(this.modalRef);
                window.document.body.removeAttribute('data-modal-open');
            }
        }
    }

    toggle = () => {
        if (!allowClose) {
            allowClose = true;
            return;
        }

        if (this.state.show) {
            this.setState({ show: false });
            setTimeout(() => {
                this.setState({ preShow: false });
            }, 400);
        } else {
            this.setState({ preShow: true });
            setTimeout(() => {
                this.setState({ show: this.state.preShow });
            }, 400);
        }
    };

    toggleFromBackground = () => {
        if (this.props.disableBackgroundClose) {
            return;
        }

        this.toggle();
    };

    unallowClose = () => {
        if (this.props.disableBackgroundClose) {
            return;
        }
        
        allowClose = false;
    };

    render() {
        const { show, preShow } = this.state;
        const {
            children,
            header = null,
            footer = null,
            wrapperClassName = '',
            closeButtonClassName = '',
            contentClassName = '',
            bodyClassName = '',
            dialogClassName = '',
            headerClassName = '',
            footerClassName = '',
            showClassName = '',
            size,
        } = this.props;

        return (
            <>
                {preShow ? (
                    <div
                        {...className(
                            `modal-backdrop backdrop-fade-opacity ${
                                show ? 'show' : ''
                            }`,
                        )}
                    />
                ) : null}
                <div
                    ref={(el) => (this.modalRef = el)}
                    {...className(
                        `modal fade fade-opacity ${wrapperClassName} ${
                            show ? 'show' : ''
                        } ${
                            show && showClassName ? showClassName : ''
                        }`,
                    )}
                    tabIndex="-1"
                    onClick={this.toggleFromBackground}
                    onKeyDown={this.toggleFromBackground}
                    style={preShow ? { display: 'block' } : {}}
                    role="dialog">
                    <div
                        onClick={this.unallowClose}
                        onKeyDown={this.unallowClose}
                        {...className(
                            `modal-dialog modal-dialog-centered modal-${
                                size ? size : 'lg'
                            } ${dialogClassName}`,
                        )}
                        role="document">
                        <div
                            {...className(`modal-content ${contentClassName}`)}>
                            {header ? (
                                <div
                                    {...className(
                                        `modal-header ${headerClassName}`,
                                    )}>
                                    {header}
                                    <button
                                        type="button"
                                        data-dismiss="modal"
                                        onClick={this.toggle}
                                        aria-label="Close"
                                        {...className(closeButtonClassName)}>
                                        <span>×</span>
                                    </button>
                                </div>
                            ) : null}
                            {children ? (
                                <div
                                    {...className(
                                        `modal-body ${bodyClassName}`,
                                    )}>
                                    {children}
                                </div>
                            ) : null}
                            {footer ? (
                                <div
                                    {...className(
                                        `modal-footer justify-content-center ${footerClassName}`,
                                    )}>
                                    {footer}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
