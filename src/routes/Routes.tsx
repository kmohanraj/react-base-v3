import { Suspense } from "react";
import Dashboard from "components/organisms/dashborad/Dashboard";
import { IRouteConfig } from "types/routes.types";
import Login from "components/organisms/users/Login";
import AppRoutes from "./AppRoutes";

const Routes = () => {
  const config: IRouteConfig[] = [
    { path: "/login", component: Login },
    { path: "/", component: Dashboard, isLoginRequired: true },
    // { path: "/users", component: Users, isLoginRequired: true },
  ];

  return (
    <Suspense>
      <AppRoutes routeConfig={config} />
    </Suspense>
  );
};

export default Routes;
