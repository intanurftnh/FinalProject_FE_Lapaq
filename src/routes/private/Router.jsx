import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import ProfileBuyer from '../../pages/ProfileBuyer/ProfileBuyer';
import EditProfileBuyer from '../../pages/EditProfileBuyer/EditProfileBuyer';

const ROUTE_LIST = [
    {
        path: '/homepage/profile',
        element: <BuyerLayout><ProfileBuyer/></BuyerLayout>,
    },
    {
        path: '/homepage/profile/edit',
        element: <BuyerLayout><EditProfileBuyer/></BuyerLayout>,
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