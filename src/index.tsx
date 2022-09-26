/// <reference path="./index.d.ts" />

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import APIContext from './hooks/api/context';

Object.prototype.mergeobject = function (object: any) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            // @ts-ignore
            if (typeof this[key] === "object" && typeof object[key] === "object") {
                // @ts-ignore
                this[key].mergeobject(object[key]);
                continue;
            }
            // @ts-ignore
            this[key] = object[key];
        }
    }
    return this;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const api_options = {
  base_url: 'http://localhost:3001'
}

root.render(
  <APIContext options={api_options}>
    <App />
  </APIContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
