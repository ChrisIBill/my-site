import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import ErrorPage from "../Pages/ErrorPage";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Calculator from "../Pages/Calculator";
import Settings from "../Pages/Settings";

export const navData = [
  {
    id: 0,
    text: "Home",
    link: "/",
  },
  {
    id: 1,
    text: "About",
    link: "about",
  },
  {
    id: 2,
    text: "Calculator",
    link: "calculator",
  },
  {
    id: 3,
    text: "Settings",
    link: "settings",
  },
];

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Calculator",
        element: <Calculator />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
    ],
  },
]);

export const Router2 = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {},
    ],
  },
]);
