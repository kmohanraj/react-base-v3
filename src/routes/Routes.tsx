import { Suspense } from "react";
import Branches from "components/organisms/branches/Branches";
import Customers from "components/organisms/customers/Customers";
import DashboardPage from "components/organisms/dashborad/DashboardPage";
import Groups from "components/organisms/groups/Groups";
import Organizations from "components/organisms/organizations/Organizations";
import Users from "components/organisms/users/Users";
import { IRouteConfig } from "types/routes.types";
import AppRoutes from "./AppRoutes";
import Login from "components/organisms/users/Login";

const Routes = () => {
  const config: IRouteConfig[] = [
    { path: '/login', component: Login },
    { path: '/', component: DashboardPage , isLoginRequired: true },
    { path: '/organizations', component: Organizations, isLoginRequired: true },
    { path: '/branches', component: Branches, isLoginRequired: true },
    { path: '/users', component: Users, isLoginRequired: true },
    { path: '/customers', component: Customers, isLoginRequired: true },
    { path: '/groups', component: Groups, isLoginRequired: true }
  ]

  return (
    <Suspense>
      <AppRoutes routeConfig={config} />
    </Suspense>
  )
}

export default Routes;