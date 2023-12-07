import { Route, Routes } from 'react-router-dom';
import OrderHistoryLayout from '../../layouts/OrderHistoryLayout';
import OrderProcess from '../../pages/OrderProcess/OrderProcess';
import OrderProcessSuccess from '../../pages/OrderProcessSuccess/OrderProcessSuccess';
import OrderCancel from '../../pages/OrderCancel/OrderCancel';
import OrderCancelSuccess from '../../pages/OrderCancelSuccess/OrderCancelSuccess';
import OrderReturn from '../../pages/OrderReturn/OrderReturn';
import OrderReturnSuccess from '../../pages/OrderReturnSuccess/OrderReturnSuccess';
import OrderReview from '../../pages/OrderReview/OrderReview';
import OrderReviewDetail from '../../pages/OrderReviewDetail/OrderReviewDetail';

const ROUTE_LIST = [
    {
        path: '/homepage/dashboard/riwayat/pemrosesan',
        element: <OrderHistoryLayout><OrderProcess/></OrderHistoryLayout>,
    },
    {
        path: '/homepage/dashboard/riwayat/pemrosesan/selesai',
        element: <OrderProcessSuccess/>,
    }, 
    {
        path: '/homepage/dashboard/riwayat/pembatalan',
        element: <OrderHistoryLayout><OrderCancel/></OrderHistoryLayout>,
    },
    {
        path: '/homepage/dashboard/riwayat/pembatalan/selesai/:_id',
        element: <OrderCancelSuccess/>,
    },
    {
        path: '/homepage/dashboard/riwayat/pengembalian',
        element: <OrderHistoryLayout><OrderReturn/></OrderHistoryLayout>,
    },
    {
        path: '/homepage/dashboard/riwayat/pengembalian/selesai/:_id',
        element: <OrderReturnSuccess/>,
    },
    {
        path: '/homepage/dashboard/riwayat/penilaian',
        element: <OrderHistoryLayout><OrderReview/></OrderHistoryLayout>,
    },
    {
        path: '/homepage/dashboard/riwayat/penilaian/detail/:_id',
        element: <OrderReviewDetail/>,
    },   
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