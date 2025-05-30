import Client from "../../client";

const getTotalProductToDo = async (outletId) => {
    try {
        const response = await Client.get(`/outlets/${outletId}/trackings/summary`);
        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Gagal mengambil data total'
        );
    }
}



export default {
    getTotalProductToDo
}