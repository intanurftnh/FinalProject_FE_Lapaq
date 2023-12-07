import { Route, Routes } from 'react-router-dom';
import SignIn from '../../pages/BuyerSignIn/SignIn';
import SignUp from '../../pages/BuyerSignUp/SignUp';

const ROUTE_LIST = [
    {
        path: '/welcome/sign-in',
        element: <SignIn/>,
    },
    {
        path: '/welcome/sign-up',
        element: <SignUp/>,
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