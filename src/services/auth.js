import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/login`,body);
        console.log(response.data);
        return response.data;     
      } catch (error) {
        console.error('Gagal menyimpan data ke server:', error);
        return null;
      }
}

const register = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/register`,body);
    console.log(response.data);
    return response.data;
    // Lakukan sesuatu setelah data berhasil disimpan
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

const shopRegister = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}/register/seller`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}

const shopLogin = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}/login/seller`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan data ke server:', error);
    return null;
  }
}


export {
  login,
  register,
  shopRegister,
  shopLogin
}