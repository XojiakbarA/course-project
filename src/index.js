import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {StompSessionProvider} from "react-stomp-hooks";
import {CloudinaryContext} from "cloudinary-react";
import {store} from "./store";
import {API_BASE_URL} from "./utils/constants";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <StompSessionProvider
                url={API_BASE_URL + '/ws/'}
                onConnect={ () => console.log("connected") }
            >
                <CloudinaryContext cloudName={"xojiakbar-cloudinary"}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CloudinaryContext>
            </StompSessionProvider>
        </Provider>
    // </React.StrictMode>
)