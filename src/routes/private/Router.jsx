import { Route, Routes } from 'react-router-dom';
import ShopLogin from '../../pages/ShopLogin/ShopLogin';
import ShopRegister from '../../pages/ShopRegister/ShopRegister';

const ROUTE_LIST = [
    {
        path: '/homepage/masuk-toko',
        element: <ShopLogin/>,
    },
    {
        path: '/homepage/daftar-toko',
        element: <ShopRegister/>,
    }
];

const RoutePrivate = () => {
    return (
        <Routes>
            {ROUTE_LIST.map((route, index) => (
                <Route
                    key={`route-${index}`}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    );
};

export default RoutePrivate;