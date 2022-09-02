import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './style.css';
import {
    Navbar,
    Posts,
    Profile,
    Home
} from './components';

import {
    getPosts
} from './api';

const App = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
            const results = await getPosts()
            setPosts(results.data.posts);
    }
    
useEffect(() => {
    fetchPosts()
}, [])
    return (
        <div>
            <Navbar /> 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Posts posts={posts} />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);