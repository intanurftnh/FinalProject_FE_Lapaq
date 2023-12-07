import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const addOrder = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}/product/order`, body, {
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

const getOrder = async (user_buyer_id, token) => {
  try {
    const response = await axios.get(`${API_URL}/product/order/${user_buyer_id}`,{
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal mengambil data ke server:', error);
    return null;
  }
}

const getOrderSeller = async (user_seller_id, token) => {
  try {
    const response = await axios.get(`${API_URL}/product/order/seller/${user_seller_id}`,{
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal mengambil data ke server:', error);
    return null;
  }
}

const addCart = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}/product/cart`, body, {
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

const listCart = async (user_buyer_id, token) => {
  try {
    const response = await axios.get(`${API_URL}/product/cart/${user_buyer_id}`,{
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

const addComment = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}/comment`, body, {
      headers: {
        'Content-Type': 'application/json', // Atur tipe konten sebagai form data
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;     
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

export {
  addOrder,
  getOrder,
  getOrderSeller,
  addCart,
  listCart,
  addComment
}