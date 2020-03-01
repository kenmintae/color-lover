import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <h1>This is main page</h1>
  },
  {
    path: "/cart",
    exact: false,
    component: lazy(() => import("views/Cart").catch(() => import("views/NotFound")))
  },
  {
    path: "/listing",
    exact: false,
    component: lazy(() => import("views/Listing").catch(() => import("views/NotFound")))
  }
]

const Loading = () => <h1>Loading.....</h1>

export default function Routes() {
  return (
    <Suspense fallback={Loading}>
      <Switch>
        {
          routes.map(({ component, path, exact }) => <Route path={path} component={component} exact={exact} />)
        }
      </Switch>
    </Suspense>
  )
}