import { Route, Routes } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';
import ProductList from '../../pages/ProductList/ProductList';
import AddProduct from '../../pages/AddProduct/AddProduct';

const ROUTE_LIST = [
    {
        path: '/homepage/dashboard/produk-saya',
        element: <SellerLayout><ProductList/></SellerLayout>,
    },
    {
        path: '/homepage/dashboard/produk-saya/tambah-produk',
        element: <AddProduct/>,
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