import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const getUserToken = () => {
    const token = Cookies.get('token');
    if (!token) {
        return null;
    }

    const decoded = jwtDecode(token);
    if (!decoded) {
        return null;
    }

    return {
        token: token,
        user: decoded.user
    }
}

const getUserTokenSeller = () => {
    const token = Cookies.get('tokenSeller');
    if (!token) {
        return null;
    }

    const decoded = jwtDecode(token);
    if (!decoded) {
        return null;
    }

    return {
        token: token,
        user_id: decoded.user_id,
    }
}

const deleteTokenUser = () => {
    Cookies.remove('token, tokenSeller')
}

const deleteTokenSeller = () => {
    Cookies.remove('tokenSeller')
}

export {
    getUserToken,
    getUserTokenSeller,
    deleteTokenUser,
    deleteTokenSeller
}