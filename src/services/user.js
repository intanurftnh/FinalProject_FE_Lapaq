import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const buyerId = async (_id) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/${_id}`);
        console.log(response.data);
        return response.data;     
      } catch (error) {
        console.error('Gagal mengambil data ke server:', error);
        return null;
      }
}

const editBuyerId = async (_id, body, token) => {
  try {
      const response = await axios.patch(`${API_URL}/api/users/${_id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;     
  } catch (error) {
      console.error('Gagal update data ke server:', error);
      return null;
  }
}

const sellerId = async (_id) => {
    try {
        const response = await axios.get(`${API_URL}/users/seller/${_id}`);
        console.log(response.data);
        return response.data;     
      } catch (error) {
        console.error('Gagal mengambil data ke server:', error);
        return null;
      }
}

const editSellerId = async (_id, body, token) => {
  try {
      const response = await axios.patch(`${API_URL}/users/seller/${_id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);
      return response.data;     
  } catch (error) {
      console.error('Gagal update data ke server:', error);
      return null;
  }
}

export {
  buyerId,
  editBuyerId,
  sellerId,
  editSellerId
}