import Client from "../../client";


const getLaundryService = async () => {
    try {
        const response = await Client.get('/category');

        if (response.status === 200 && response.data.status && response.data.data) {

            return response.data.data;
        }


    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data layanan'
        );
    }
};



const getAllLaundryService = async () => {
    try {
        const response = await Client.get('/category/all');

        if (response.status === 200 && response.data.status && response.data.data) {

            return response.data.data;
        }


    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data layanan'
        );
    }
};

export default {
    getLaundryService ,
    getAllLaundryService
}