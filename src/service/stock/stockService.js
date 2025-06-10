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


const createStockService = async (data) => {
    try {
        const response = await Client.post('/stock', data);
        if (response.status === '201' && response.data.status && response.data.data) {
            return response.data.data;
        }
        throw new Error('Gagal menambahkan data inventory')
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membuat data inventory'
        );
    }
}


const updateStockService = async (itemId, stock) => {
    try {

        const response = await Client.patch('/stock/' + itemId, { jumlah: stock });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }
        throw new Error('Gagal mengupdate data inventory');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat memgupdate data inventory'
        );
    }
};

const deleteStock = async (id) => {
    try {
        const response = await Client.delete(`/stock/${id}`);

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Gagal menghapus data inventory');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat menghapus data inventory'
        );
    }
};


export default {
    getStockByOutlet,
    getAllStock,
    createStockService,
    updateStockService ,
    deleteStock
}