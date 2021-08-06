import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter } from "react-router-dom";
import App from '@layouts/App';
// import App from '@pages/Main';
// import App from '@pages/LogIn';
// import App from '@pages/SignUp';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#app'),
);