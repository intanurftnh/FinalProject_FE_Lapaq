import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import CatalogProduct from '../../pages/CatalogProduct/CatalogProduct';

const ROUTE_LIST = [
    {
        path: '/homepage/search/produk/detail/:_id',
        element: <BuyerLayout><CatalogProduct/></BuyerLayout>,
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