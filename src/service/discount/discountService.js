import Client from "../../client";

const getAllDiscountService = async (page, limit) => {
    try {
        const response = await Client.get('/discount', {
            params: { page, limit }
        });
        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data diskon'
        );
    }
}

const getAllDiscountByOutletService = async (page , limit , outletId ) => {
    try {
        const response = await Client.get('/discount/by-outlet/' + outletId , {
            params : {page , limit}
        });
        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            `Terjadi kesalahan saat ambil data diskon dengan outlet ${outletId}`
        );
    }
}

const createDiscountService = async (data) => {
    try {
        const response = await Client.post('/discount', data);

        if (response.status === 201 && response.data.status && response.data.data) {
            return response.data.data;
        }
    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membuat diskon'
        );
    }
};


const updateDiscountServices = async (data, outletId) => {

}


const deleteDiscountServices = async (discountId) => {

}


export default {
    getAllDiscountByOutletService,
    getAllDiscountService,
    createDiscountService,
    updateDiscountServices,
    deleteDiscountServices
}
