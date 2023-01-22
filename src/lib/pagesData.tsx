import { createBrowserRouter, createRoutesFromElements, Route, RouteObject } from "react-router-dom";
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

// export const Pages = createRoutesFromElements(
//   <Route id="Home" path="/" element={<Home />} errorElement={<ErrorPage />}>
//     <Route id="Calculator" path="Calculator" element={<Calculator />} />
//     <Route id="Calculator" path="Calculator" element={<Calculator />} />
//     <Route id="Settings" path="/Settings" element={<Settings />} />
//   </Route>
// )

// export const Router2 = createBrowserRouter(Pages, {
//   basename: "ErrorPage",
// })
export const Router = createBrowserRouter([
  {
    path: "/",
    id: "0",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "About",
        id: '1',
        element: <About />,
      },
      {
        path: "Calculator",
        id: '2',
        element: <Calculator />,
      },
      {
        path: "Settings",
        id: '3',
        element: <Settings />,
      },
    ],
  },
]);