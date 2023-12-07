import { Route, Routes } from 'react-router-dom';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';
import EditProduct from '../../pages/EditProduct/EditProduct';

const ROUTE_LIST = [
    {
        path: '/homepage/dashboard/produk-saya/detail/:_id',
        element: <ProductDetails/>,
    },
    {
        path: '/homepage/dashboard/produk-saya/detail/edit/:_id',
        element: <EditProduct/>,
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