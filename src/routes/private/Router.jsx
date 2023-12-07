import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import Carts from '../../pages/Carts/Carts';

const ROUTE_LIST = [
    {
        path: '/homepage/keranjang',
        element: <BuyerLayout><Carts/></BuyerLayout>,
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