import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {CloudinaryContext} from "cloudinary-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CloudinaryContext cloudName={"xojiakbar-cloudinary"}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CloudinaryContext>
        </Provider>
    </React.StrictMode>
)