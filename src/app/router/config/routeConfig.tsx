import { RouteProps } from "react-router-dom";

import { MainPage } from "pages/MainPage";

export enum AppRoutes {
  MAIN = "main",
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: "/",
    element: <MainPage />,
  },
};
