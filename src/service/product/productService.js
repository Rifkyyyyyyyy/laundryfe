import Client from "../../client";

// Ambil produk berdasarkan outlet (dengan pagination)
const getProductsByOutlet = async (page, limit, outletId) => {
    try {
        const response = await Client.get(`/product/outlet/${outletId}`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data produk tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||

            'Terjadi kesalahan saat ambil data produk'
        );
    }
};


const getSimplyProductsByOutlet = async (outletId) => {
    try {
        const response = await Client.get(`/product/all/${outletId}`);

        console.log(`data dari api : ${response.data}`);

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data produk tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||

            'Terjadi kesalahan saat ambil data produk'
        );
    }
};

const getSimplyProducts = async () => {
    try {
        const response = await Client.get(`/product/all`);

        console.log(`data dari api : ${response.data}`);

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data produk tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||

            'Terjadi kesalahan saat ambil data produk'
        );
    }
};





const getAllProducts = async (page, limit) => {
    try {
        const response = await Client.get(`/product`, {
            params: { page, limit },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

        throw new Error('Data produk tidak ditemukan');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data produk'
        );
    }
};




// Hapus produk berdasarkan ID (No Content - 204)
const deleteProductsById = async (productId) => {
    try {
        await Client.delete(`/product/${productId}`);
        return true;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Gagal menghapus produk'
        );
    }
};

// Update produk berdasarkan ID
const updateProducts = async (productId, name, description, price, unit, category) => {
    try {
        const response = await Client.patch(`/product/${productId}`, {
            name,
            description,
            price,
            unit,
            category
        });

        if (response.status === 200 && response.data.status) {
            return response.data.data;
        }

        throw new Error('Gagal memperbarui produk');
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat update produk'
        );
    }
};

// Tambah produk baru
const createProducts = async (data) => {
    try {
        const response = await Client.post('/product', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });


        if (response.status === 201 && response.data.status) {
            return response.data.data;
        }

        throw new Error('Gagal membuat produk');
    } catch (error) {
        console.log(`err : ${error}`);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membuat produk'
        );
    }
};


export default {
    getProductsByOutlet,
    deleteProductsById,
    updateProducts,
    createProducts,
    getAllProducts,
    getSimplyProductsByOutlet ,
    getSimplyProducts
};
