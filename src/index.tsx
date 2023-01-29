import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import PagesData from "./lib/pageData";
import ErrorPage from "./Pages/ErrorPage";
import Contact from "./Pages/Contact";
import reportWebVitals from "./reportWebVitals";

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]); */
const Router = new PagesData();
const Pages = Router.getRouter();
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <script src="path/to/dist/feather.js"></script>
        <RouterProvider router={Pages} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
