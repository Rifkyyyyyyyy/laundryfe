import Client from "../../client";


const getAllUser = async (page, limit) => {
    try {
        const response = await Client.get('/customers', {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {

            return response.data.data;
        }


    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data user'
        );
    }
};



const searchUser = async (searchTerm, page, limit) => {
    try {
        const response = await Client.get('/customers/search', {
            params: { page, limit, searchTerm },
        });

        console.log(`data member : ${JSON.stringify(response.data.data, null, 2)}`);


        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }


    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data user'
        );
    }
};





export default {
    getAllUser,
    searchUser
}