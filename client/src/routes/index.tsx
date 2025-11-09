import BaseLayout from "@/layouts/base-layout";
import { Route, Routes } from "react-router-dom";
import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import AppLayout from "@/layouts/app-layout";
import RouteGuard from "./route-guard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth / public routes */}
      <Route path="/" element={<RouteGuard requireAuth = {false}/>}>
        <Route element={<BaseLayout />}>
          {authRoutesPaths?.map((router) => (
            <Route
              key={router.path}
              path={router.path}
              element={router.element}
            />
          ))}
        </Route>
      </Route>

      <Route path="/" element={<RouteGuard requireAuth/>}>
        <Route element={<AppLayout />}>
          {protectedRoutesPaths?.map((router) => (
            <Route
              key={router.path}
              path={router.path}
              element={router.element}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
