import React from "react";
import '../styles.css';
import DarkModeToggle from './DarkModeToggle.jsx';

const Header = ({ title = 'Spoiler Alert!'}) => {
    console.log('Header is rendering');
    return (
        
    <header>
        <a href="/Dashboard"><h1>{ title }</h1></a>
        <DarkModeToggle />
    </header>
    )

};

export default Header;