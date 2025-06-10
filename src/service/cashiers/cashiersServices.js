import Client from "../../client";


const getAllCashiers = async (page, limit) => {
  try {
    const response = await Client.get('/cashiers', {
      params: { page, limit },
    });

    console.log("API full response:", response.data); // Tetap biar bisa cek di masa depan

    // GANTI DI SINI
    if (response.status === 200 && response.data.status && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Gagal mengambil data kasir');
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat ambil data kasir'
    );
  }
};


const deleteCashiers = async (id) => {
  try {
    const response = await Client.delete('/users/' + id);



    // Karena response.data.data biasanya kosong/null di delete, cukup cek status dan success flag
    if (response.status === 200 && response.data.status === true) {
      return true;  // atau return sesuatu yang meyakinkan kalau delete berhasil
    }

    throw new Error(response.data.message || 'Gagal menghapus kasir');
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat menghapus kasir'
    );
  }
};


const updateCashiers = async (
  id, 
  value
) => {
  try {
   
    const response = await Client.put(`/users/` + id, value, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // kalau ada header lain, bisa ditambah di sini
      }
    });

    if (response.status === 200 && response.data.status === true) {
      return response.data.data;  // atau true, sesuai kebutuhan pemakaian
    }

    throw new Error(response.data.message || 'Gagal mengupdate kasir');
  } catch (error) {
    console.log(`error : ${error}`);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat mengupdate kasir'
    );
  }
};



export default {
  getAllCashiers,
  deleteCashiers,
  updateCashiers
}