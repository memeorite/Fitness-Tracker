import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Stranger's Things: A place to buy and sell gently used items!</h1>
            <button>
                <Link to='/posts/create-post'>Add a Post</Link>
            </button>
        </div>
    )
}

export default Home;