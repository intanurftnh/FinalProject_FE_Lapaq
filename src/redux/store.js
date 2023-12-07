import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export default store;
