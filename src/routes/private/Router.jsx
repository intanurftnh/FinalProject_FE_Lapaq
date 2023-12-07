import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import OrderHistory from '../../pages/OrderHistory/OrderHistory';

const ROUTE_LIST = [
    {
        path: '/homepage/riwayat',
        element: <BuyerLayout><OrderHistory/></BuyerLayout>,
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