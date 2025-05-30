
import Client from "../../client";

const loginServices = async (email, password) => {
  try {
    const response = await Client.post('/login', { email, password });

    if (response.status === 200 && response.data.status) {
      return response.data.data; // langsung return user-nya
    } else {
      throw new Error(response.data.message || 'Login gagal'); // throw langsung message dari backend
    }
  } catch (error) {
    // lempar error-nya langsung, biar ditangani di action
    throw new Error(error.response?.data?.message || error.message || 'Terjadi kesalahan saat login');
  }
};


const registerCashiers = async (data) => {
  try {
    const response = await Client.post('/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    if (response.status === 201 && response.data.success && response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Terjadi kesalahan saat membuat kasir');
  }
}


export default {
  loginServices,
  registerCashiers
}