import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import "./css/index.css";
import routes from './routes';
import ContextProviderWrapper from "./context/ContextProviderWrapper";

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProviderWrapper>
        <RouterProvider router={router}/>
    </ContextProviderWrapper>
);
