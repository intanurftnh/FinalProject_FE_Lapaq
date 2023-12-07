import { Route, Routes } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';
import Dashboard from '../../pages/Dashboard/Dashboard';

const ROUTE_LIST = [
    {
        path: '/homepage/dashboard',
        element: <SellerLayout><Dashboard/></SellerLayout>,
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