import { Route, Routes } from 'react-router-dom';
import BuyerLayout from '../../layouts/BuyerLayout';
import SellerLayout from '../../layouts/SellerLayout';
import OrderHistoryLayout from '../../layouts/OrderHistoryLayout';
import LandingPage from '../../pages/LandingPage/LandingPage';
import SignIn from '../../pages/BuyerSignIn/SignIn';
import SignUp from '../../pages/BuyerSignUp/SignUp';
import Homepage from '../../pages/Homepage/Homepage';
import SearchPage from '../../pages/SearchPage/SearchPage';
import CatalogProduct from '../../pages/CatalogProduct/CatalogProduct';
import Checkout from '../../pages/Checkout/Checkout';
import Carts from '../../pages/Carts/Carts';
import ProfileBuyer from '../../pages/ProfileBuyer/ProfileBuyer';
import EditProfileBuyer from '../../pages/EditProfileBuyer/EditProfileBuyer';
import OrderHistory from '../../pages/OrderHistory/OrderHistory';
import TransactionOrder from '../../pages/TransactionOrder/TransactionOrder';
import TransactionReturn from '../../pages/TransactionReturn/TransactionReturn';
import TransactionReview from '../../pages/TransactionReview/TransactionReview';
import ShopLogin from '../../pages/ShopLogin/ShopLogin';
import ShopRegister from '../../pages/ShopRegister/ShopRegister';
import Dashboard from '../../pages/Dashboard/Dashboard';
import ProductList from '../../pages/ProductList/ProductList';
import AddProduct from '../../pages/AddProduct/AddProduct';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';
import EditProduct from '../../pages/EditProduct/EditProduct';
import ProfileSeller from '../../pages/ProfileSeller/ProfileSeller';
import EditProfileSeller from '../../pages/EditProfileSeller/EditProfileSeller';
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
        path: '/',
        element: <LandingPage/>,
    },
    {
        path: '/welcome/sign-in',
        element: <SignIn/>,
    },
    {
        path: '/welcome/sign-up',
        element: <SignUp/>,
    },
    {
        path: '/homepage',
        element: <BuyerLayout><Homepage/></BuyerLayout>,
    },
    {
        path: '/homepage/search',
        element: <SearchPage/>,
    },
    {
        path: '/homepage/search/produk/detail/:_id',
        element: <BuyerLayout><CatalogProduct/></BuyerLayout>,
    },
    {
        path: '/homepage/search/produk/checkout/:_id',
        element: <BuyerLayout><Checkout/></BuyerLayout>,
    },
    {
        path: '/homepage/keranjang',
        element: <BuyerLayout><Carts/></BuyerLayout>,
    },
    {
        path: '/homepage/profile',
        element: <BuyerLayout><ProfileBuyer/></BuyerLayout>,
    },
    {
        path: '/homepage/profile/edit',
        element: <BuyerLayout><EditProfileBuyer/></BuyerLayout>,
    },
    {
        path: '/homepage/riwayat',
        element: <BuyerLayout><OrderHistory/></BuyerLayout>,
    },
    {
        path: '/homepage/transaksi',
        element: <BuyerLayout><TransactionOrder/></BuyerLayout>,
    },
    {
        path: '/homepage/transaksi/return',
        element: <TransactionReturn/>,
    },
    {
        path: '/homepage/transaksi/review',
        element: <TransactionReview/>,
    },
    {
        path: '/homepage/masuk-toko',
        element: <ShopLogin/>,
    },
    {
        path: '/homepage/daftar-toko',
        element: <ShopRegister/>,
    },
    {
        path: '/homepage/dashboard',
        element: <SellerLayout><Dashboard/></SellerLayout>,
    },
    {
        path: '/homepage/dashboard/produk-saya',
        element: <SellerLayout><ProductList/></SellerLayout>,
    },
    {
        path: '/homepage/dashboard/produk-saya/tambah-produk',
        element: <AddProduct/>,
    },
    {
        path: '/homepage/dashboard/produk-saya/detail/:_id',
        element: <ProductDetails/>,
    },
    {
        path: '/homepage/dashboard/produk-saya/detail/edit/:_id',
        element: <EditProduct/>,
    },
    {
        path: '/homepage/dashboard/profile',
        element: <SellerLayout><ProfileSeller/></SellerLayout>,
    },
    {
        path: '/homepage/dashboard/profile/edit',
        element: <EditProfileSeller/>,
    },
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