import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    return(
        <h1> Fitness Tracker </h1>
    )
}

const container = document.querySelector('#container')
const root = ReactDOM.createRoot(container);
root.render(<App/>);