import React, { memo } from 'react';
// eslint-disable-next-line import/newline-after-import
import logo from './NextDNS-ngang.png';
type Props = {
    className?: string;
};

export const Logo = memo(({ className }: Props) => {
    return <img src={logo} alt="Logo" height={30} className="header-logo" />;
});

Logo.displayName = 'Logo';
