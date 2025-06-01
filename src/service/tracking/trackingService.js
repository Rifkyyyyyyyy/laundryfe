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



const updateTracking = async (id, status) => {
    try {
        const response = await Client.put(`/tracking/${id}`, { status });
        console.log("Calling updateTracking with id:", id, "status:", status);

  
      if (response.status === 200 && response.data.status) {
        return response.data.message;  // atau data lainnya sesuai response dari backend
      }
  
      console.warn("Unexpected response structure:", response.data);
      return null;
    } catch (error) {
      console.error("Update Tracking API error:", error);
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Gagal memperbarui status tracking'
      );
    }
  };

  

export default {
    getTrackingByOutlet ,
    updateTracking
}