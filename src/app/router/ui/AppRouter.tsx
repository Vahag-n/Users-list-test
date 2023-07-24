import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routeConfig } from "../config/routeConfig";

export const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={"Loading..."}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
