import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as axios from "axios";

// third party plugin
import 'bootstrap';
import "./Assets/vendor/nucleo/css/nucleo.css";
import "./Assets/vendor/font-awesome/css/font-awesome.min.css";
import "./Assets/scss/argon-design-system-react.scss";
import "./Assets/css/style.css"
import "./Assets/css/animate.css"

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// set configuration for axios
axios.defaults.baseURL = "http://localhost:1337";
axios.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {
            const token = localStorage.getItem("apiToken")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    error => Promise.reject(error)
)
