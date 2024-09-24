import React, { Component } from 'react';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

import enhanceWithClickOutside from 'react-click-outside';

import './Dropdown.css';

type DropdownProps = {
    label: string;
    children: React.ReactNode;
    controlClassName: string;
    menuClassName: string;
    baseClassName: string;
    icon?: string;
}

type DropdownState = {
    isOpen: boolean;
}

class CustomDropdown extends Component<DropdownProps, DropdownState> {
    state = {
        isOpen: false,
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

    hideDropdown = () => {
        this.setState({ isOpen: false });
    };

    handleClickOutside = () => {
        if (this.state.isOpen) {
            this.hideDropdown();
        }
    };

    render() {
        const {
            label,
            controlClassName,
            menuClassName = 'dropdown-menu-tab',
            baseClassName = 'dropdown',
            icon,
            children,
        } = this.props;

        const { isOpen } = this.state;

        const dropdownClass = classnames({
            [baseClassName]: true,
            show: isOpen,
        });

        const dropdownMenuClass = classnames({
            [menuClassName]: true,
            show: isOpen,
        });

        const ariaSettings = isOpen ? 'true' : 'false';

        return (
            <div className={dropdownClass}>
                <a className={controlClassName} aria-expanded={ariaSettings} onClick={this.toggleDropdown}>
                    {icon && (
                        <svg className="nav-icon">
                            <use xlinkHref={`#${icon}`} />
                        </svg>
                    )}
                    {label}
                </a>

                <div className={dropdownMenuClass} >
                    {children}
                </div>
            </div>
        );
    }
}

export default withTranslation()(enhanceWithClickOutside(CustomDropdown));
