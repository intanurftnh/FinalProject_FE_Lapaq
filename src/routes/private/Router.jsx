import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import Checkout from '../../pages/Checkout/Checkout';

const ROUTE_LIST = [
    {
        path: '/homepage/search/produk/checkout/:_id',
        element: <BuyerLayout><Checkout/></BuyerLayout>,
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