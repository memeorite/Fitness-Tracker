import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Posts</Link>
                <Link to='/profile'>Profile</Link>
            </nav>
        </header>
    )   
}

export default Navbar;