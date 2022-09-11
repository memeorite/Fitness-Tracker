import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/posts'>Posts</Link>
                <Link to='/profile'>Profile</Link>
                {
                    token ? (
                        <Link to='/' onClick={() => logout()}>Logout</Link>
                    ) : (
                        <>
                            <Link to='/register'>Register</Link>
                            <Link to='/login'>Login</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;