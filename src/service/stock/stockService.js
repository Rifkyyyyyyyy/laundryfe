import Client from "../../client";


const getStockByOutlet = async (page, limit, outletId) => {
    try {
        const response = await Client.get(`/stock/outlet/${outletId}`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data inventory tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data inventory'
        );
    }
};


const getAllStock = async (page, limit) => {
    try {
        const response = await Client.get(`/stock`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data inventory tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data inventory'
        );
    }
};


export default  {
    getStockByOutlet ,
    getAllStock
}