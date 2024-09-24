import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import TabMenu from './TabMenu';

interface ChildProps2 {
    handleMenuOpenTab: (data: boolean) => void;
    isMenuOpenTab: boolean;
}
const Sidebar: React.FC<ChildProps2>= ({ isMenuOpenTab, handleMenuOpenTab }) => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);


    const { pathname } = useLocation();

    const closeMenu = () => {
        handleMenuOpenTab(false);
    };


    return (
        <>
            <TabMenu pathname={pathname} isMenuOpen={isMenuOpenTab} closeMenu={closeMenu} />
        </>
    );
};

export default Sidebar;
