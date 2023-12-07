import { Route, Routes } from 'react-router-dom';
import SellerLayout from '../../layouts/SellerLayout';
import ProfileSeller from '../../pages/ProfileSeller/ProfileSeller';
import EditProfileSeller from '../../pages/EditProfileSeller/EditProfileSeller';

const ROUTE_LIST = [
    {
        path: '/homepage/dashboard/profile',
        element: <SellerLayout><ProfileSeller/></SellerLayout>,
    },
    {
        path: '/homepage/dashboard/profile/edit',
        element: <EditProfileSeller/>,
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