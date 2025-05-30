import Client from "../../client";


const getTrackingByOutlet = async (page, limit, outletId) => {
    try {
        const response = await Client.get(`/tracking/outlet/${outletId}`, {
            params: {
                page, limit
            }
        });
        console.log("Tracking API response:", response.data);

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        // Jika tidak memenuhi kondisi, log juga
        console.warn("Unexpected response structure:", response.data);
        return null; // agar jelas
    } catch (error) {
        console.error("Tracking API error:", error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Gagal mengambil data tracking'
        );
    }
};



export default {
    getTrackingByOutlet
}