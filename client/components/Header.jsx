import React from "react";
import '../styles.css';

const Header = ({ title = 'Spoiler Alert!'}) => {
    console.log('Header is rendering');
    return (
        
    <header>
        <a href="/Dashboard"><h1>{ title }</h1></a>
    </header>
    )

};

export default Header;