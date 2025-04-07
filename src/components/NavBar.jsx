import React, { useState } from 'react';
import { TbHelp } from "react-icons/tb";
import HelpWidget from './HelpWidget';

const NavBar = () => {
  // 도움말 위젯 열림/닫힘 상태
  const [openHelp, setOpenHelp] = useState(false);

  const handleHelpClick = () => {
    setOpenHelp(!openHelp);
  };

  return (
    <header className="header-bar">
      <h1 className="logo-text">Practing</h1>
      <div className="help-container">
        <div className="help-btn" onClick={handleHelpClick}>
          <TbHelp color="#fff" size={35} />
          <span className="help-text">도움말</span>
        </div>
        <HelpWidget 
            openHelp={openHelp}
        />
      </div>
    </header>
  );
};

export default NavBar;
