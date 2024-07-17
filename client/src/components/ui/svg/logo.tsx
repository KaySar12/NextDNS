import React, { memo } from 'react';
// eslint-disable-next-line import/newline-after-import
import logo from './111.png';
type Props = {
    className?: string;
};

export const Logo = memo(({ className }: Props) => {
    return <img src={logo} alt="Logo" width={65} height={65} className="header-logo" />;
});

Logo.displayName = 'Logo';
