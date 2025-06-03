import Client from "../../client";

// Ambil produk berdasarkan outlet (dengan pagination)
const getPaymentByOutletService = async (page, limit, outletId) => {
    try {
        const response = await Client.get(`/payments/outlet/${outletId}`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.success && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data pembayaran tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||

            'Terjadi kesalahan saat ambil data pembayaran'
        );
    }
};


const getAllPaymentsService = async (page , limit) => {
    try {
        const response = await Client.get(`/payments`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.success && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data pembayaran tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||

            'Terjadi kesalahan saat ambil data pembayaran'
        );
    }
}


export default {
    getPaymentByOutletService ,
    getAllPaymentsService
}