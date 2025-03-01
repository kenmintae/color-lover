import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'components/Loading';

const routes = [
    {
        name: 'HOME PAGE',
        path: '/',
        exact: true,
        component: () => <Redirect to="/listing" />,
    },
    {
        name: 'CART PAGE',
        path: '/cart',
        exact: false,
        component: lazy(() =>
            import('views/Cart').catch(() => import('views/NotFound'))
        ),
    },
    {
        name: 'LISTING PAGE',
        path: '/listing',
        exact: false,
        component: lazy(() =>
            import('views/Listing').catch(() => import('views/NotFound'))
        ),
    },
];

export default function Routes() {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {routes.map(({ component, path, exact, name }) => (
                    <Route
                        key={name}
                        path={path}
                        component={component}
                        exact={exact}
                    />
                ))}
            </Switch>
        </Suspense>
    );
}
