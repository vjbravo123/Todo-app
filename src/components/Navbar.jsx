import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../state/ActionCreators/index';
import "../css/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.mode === 'dark');
  const mode = useSelector(state => state.mode);
  
  // Use local state variable to control dark mode toggling
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);

  // Function to toggle dark mode
  // Navbar.js

  const toggleDarkMode = () => {
    const newMode = localDarkMode ? 'light' : 'dark';
    dispatch(setDarkMode(newMode));
    setLocalDarkMode(!localDarkMode);
  
    // Change body background color based on the mode
    document.body.style.backgroundColor = newMode === 'dark' ? '#1B1A55' : '#ffffff';
  };
  


  return (
    <nav className="navbar">
      <div className="containerr">
        <div className="navbar-brand">My Todos List</div>
        <div className="dark-mode-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={localDarkMode} // Use localDarkMode for checked state
            onChange={toggleDarkMode}
          />
          <label htmlFor="darkModeToggle" className="dark-mode-label">
            <div className="toggle">
              <div className="toggle-track"></div>
              <div className="toggle-thumb"></div>
            </div>
            {(mode==="light") ? "Dark Mode" :"Light Mode"}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
