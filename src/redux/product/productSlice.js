import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
    },
});

export const {
    setProducts,
    addProduct,
} = productSlice.actions;

export default productSlice.reducer;
