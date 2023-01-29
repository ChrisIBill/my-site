import AboutPage from "src/Pages/About";
import Calculator from "src/Pages/Calculator";
import ErrorPage from "src/Pages/ErrorPage";
import Home from "src/Pages/Home";
import Weather from "src/Pages/Weather";
import SettingsPage from "src/Pages/Settings";
import { List, Settings, Calculate, Info } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";

interface Page {
    path: string;
    id: string;
    element: JSX.Element;
    text?: JSX.Element;
    icon?: JSX.Element;
    errorElement?: JSX.Element;
    children?: Page[];
}
type Pages = Page[];

export default class PagesData {
    Pages: Pages = [
        {
            path: "/",
            id: "home",
            element: <Home />,
            errorElement: <ErrorPage />,
            children: [
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
                    icon: (
                        <SvgIcon
                            className="sidebarIcon"
                            component={Calculate}
                        />
                    ),
                    text: <div className="sidebarLinkText">Calculator</div>,
                },
                {
                    path: "Weather",
                    id: "Weather",
                    element: <Weather />,
                    icon: (
                        <SvgIcon
                            className="sidebarIcon"
                            component={Calculate}
                        />
                    ),
                    text: <div className="sidebarLinkText">Weather</div>,
                },
                {
                    path: "Settings",
                    id: "Settings",
                    element: <SettingsPage />,
                    icon: (
                        <SvgIcon className="sidebarIcon" component={Settings} />
                    ),
                    text: <div className="sidebarLinkText">Settings</div>,
                },
            ],
        },
    ];

    constructor() {}

    getRouter = () => {
        return createBrowserRouter(this.Pages, {
            basename: "/",
        });
    };

    getPages = () => {
        return this.Pages;
    };

    getPage = (pageId: string) => {
        return this.Pages.find(({ id }) => id === pageId);
    };

    getResources = (pageId: string) => {
        const resources = this.Pages.find(({ id }) => id === pageId)?.children;
        return resources;
    };

    getResource = (resourceId: string, pageId: string) => {
        const resource = this.Pages.find(
            ({ id }) => id === pageId
        )?.children?.find(({ id }) => id === resourceId);
        return resource;
    };
}
