import About from "src/Pages/About";
import Calculator from "src/Pages/Calculator";
import ErrorPage from "src/Pages/ErrorPage";
import Home from "src/Pages/Home";
import Settings from "src/Pages/Settings";

interface Page {
  path: string;
  id: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  resources?: Page[];
}
type Pages = Page[];

export default class PagesData {
  Pages: Pages = [
    {
      path: "/",
      id: "home",
      element: <Home />,
      errorElement: <ErrorPage />,
      resources: [
        {
          path: "About",
          id: "about",
          element: <About />,
        },
        {
          path: "Calculator",
          id: "calculator",
          element: <Calculator />,
        },
        {
          path: "Settings",
          id: "settings",
          element: <Settings />,
        },
      ],
    },
  ];

  constructor() {}

  getPages = () => {
    return this.Pages;
  };

  getPage = (pageId: string) => {
    return this.Pages.find(({ id }) => id === pageId);
  };

  getResources = (pageId: string) => {
    const resources = this.Pages.find(({ id }) => id === pageId)?.resources;
    return resources;
  };

  getResource = (resourceId: string, pageId: string) => {
    const resource = this.Pages.find(
      ({ id }) => id === pageId
    )?.resources?.find(({ id }) => id === resourceId);
    return resource;
  };
}
