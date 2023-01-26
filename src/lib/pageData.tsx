import AboutPage from "src/Pages/About";
import Calculator from "src/Pages/Calculator";
import ErrorPage from "src/Pages/ErrorPage";
import Home from "src/Pages/Home";
import SettingsPage from "src/Pages/Settings";
import { List, Settings, Calculate, Info } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

interface Page {
  path: string;
  id: string;
  element: JSX.Element;
  text?: JSX.Element;
  icon?: JSX.Element;
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
          id: "About",
          element: <AboutPage />,
          icon: <SvgIcon className="sidebarIcon" component={Info} />,
          text: <div className="sidebarLinkText">About</div>,
        },
        {
          path: "Calculator",
          id: "Calculator",
          element: <Calculator />,
          icon: <SvgIcon className="sidebarIcon" component={Calculate} />,
          text: <div className="sidebarLinkText">Calculator</div>,
        },
        {
          path: "Settings",
          id: "Settings",
          element: <SettingsPage />,
          icon: <SvgIcon className="sidebarIcon" component={Settings} />,
          text: <div className="sidebarLinkText">Settings</div>,
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
