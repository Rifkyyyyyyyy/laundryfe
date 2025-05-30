import Client from "../../client";



const getOrderByOutletService = async (page, limit, outletId) => {
    try {
        const response = await Client.get('orders/outlet/' + outletId, {
            params: {
                page, limit
            }
        });

        if (response.status === 200 && response.data.status && response.data.data) {
            return response.data.data;
        }

    } catch (error) {
        console.log(`err : ${error}`);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat ambil data order'
        );
    }
}


const createOrderService = async ({
    processedBy,
    customerName,
    customerPhone,
    customerEmail,
    outletId,
    items,
    pickupDate,
    note,
    paymentType = 'cash',
    serviceType = 'regular',
    memberCode,
}) => {
    try {
        const response = await Client.post('/orders/cashiers', {
            processedBy,
            customerName,
            customerPhone,
            customerEmail,
            outletId,
            items,
            pickupDate,
            note,
            paymentType,
            serviceType,
            memberCode
        })

        if (response.status === 201 && response.data.status && response.data.data) {
            return response.data.data;
        }

    } catch (error) {
        console.log(`error : ${error}`);
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan saat membuat orderan'
        );
    }
}

const calculateTotalOrderService = async ({
    items,
    serviceType = 'regular',
    memberLevel = null,
  }) => {
    try {
        console.log({ items, serviceType, memberLevel });
      const response = await Client.post('/orders/total', {
        items,
        serviceType,
        memberLevel,
      });
  
      if (response.status === 200 && response.data.status && response.data.data) {
        return response.data.data;
      }
  
    } catch (error) {
        console.log(`err : ${error}`);
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan saat menghitung total order'
      );
    }
  }
  

export default {
    getOrderByOutletService,
    createOrderService ,
    calculateTotalOrderService
}
