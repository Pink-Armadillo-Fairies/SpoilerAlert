import React from "react";
import '../styles.css';

const Header = ({ title = 'Yo! Im the Header!'}) => {

    return (
    <header>
        <h1>{ title }</h1>
    </header>
    )

};

export default Header;

// remember to import the Header component in the file where you want to use it, import Header from './Header.jsx';
// and then use it like this: <Header title ='Currently Watching' />