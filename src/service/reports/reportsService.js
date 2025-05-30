import Client from "../../client";


const createReports = async (formData) => {
    try {
        const response = await Client.post(`/reports`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        if (response.status === 201 && response.data.status && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membuat data laporan'
        );
    }
};


const getReportsByOutlet = async (page, limit, outletId) => {
    try {
        const response = await Client.get(`/reports/outlet/${outletId}`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data laporan tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data laporan'
        );
    }
};

const getAllReports = async (page, limit) => {
    try {
        const response = await Client.get(`/reports`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data laporan tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data laporan'
        );
    }
};


export const answerReports = async (reportId, ownerId, message) => {
    try {
        const response = await Client.post(`/reports/${reportId}/feedback`, {
            ownerId,
            message,
        });

        if (response.status === 201 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Failed to send feedback');
    } catch (error) {
        console.error('error:', error);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membalas data laporan'
        );
    }
};


const markAsDoneReports = async (reportId) => {
    try {
        const response = await Client.put(`/reports/${reportId}/resolve`);
        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat mengubah data laporan'
        );
    }
}

export default {
    getReportsByOutlet,
    getAllReports, answerReports,
    markAsDoneReports,
    createReports
}