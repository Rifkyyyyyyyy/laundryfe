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


export default {
    getAllCashiers
}