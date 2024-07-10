import React, { memo } from 'react';
// eslint-disable-next-line import/newline-after-import
import logo from './logonextdns.png'
type Props = {
    className?: string;
};

export const Logo = memo(({ className }: Props) => {
    return <img src={logo} alt="Logo" width={200} height={100} className='header-logo'/>;
});

Logo.displayName = 'Logo';
