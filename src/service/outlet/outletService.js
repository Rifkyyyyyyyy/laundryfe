import Client from "../../client";


const getAllOutlet = async (page, limit) => {
    try {
        const response = await Client.get('/outlet', {
            params: { page, limit },
        });

        console.log(JSON.stringify(response.data.data));

        if (response.status === 200 && response.data.status && response.data.data) {

            return response.data.data;
        }


    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data outlet'
        );
    }
};


const getListOutletsName = async () => {
    try {
        try {
            const response = await Client.get('/outlet/list');

            if (response.status === 200 && response.data.status && response.data.data) {

                return response.data.data;
            }


        } catch (error) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Terjadi kesalahan saat ambil data outlet'
            );
        }
    } catch (error) {

    }
}


const createOutlets = async (data) => {
    try {
        try {
            const response = await Client.post('/outlet', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201 && response.data.status && response.data.data) {

                return response.data.data;
            }


        } catch (error) {
            throw new Error(
                error.response?.data?.message ||
                error.message ||
                'Terjadi kesalahan saat membuat outlet'
            );
        }
    } catch (error) {

    }
}



export default {
    getAllOutlet,
    getListOutletsName,
    createOutlets
}