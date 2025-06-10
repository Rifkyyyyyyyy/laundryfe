import Client from "../../client";


const getMemberByOutletId = async (page, limit, outletId) => {
  try {
    const response = await Client.get('/member/outlet/' + outletId, {
      params: { page, limit },
    });

    if (response.status === 200 && response.data.status && response.data.data) {

      return response.data.data;
    }


  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat ambil data member'
    );
  }
};

const getAllMember = async (page, limit) => {
  try {
    const response = await Client.get('/member', {
      params: { page, limit },
    });

    if (response.status === 200 && response.data.status && response.data.data) {

      return response.data.data;
    }


  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat ambil data member'
    );
  }
};




const searchMemberByOutletId = async (searchTerm, page, limit, outletId) => {
  try {
    const response = await Client.get('/member/search/' + outletId, {
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
      'Terjadi kesalahan saat ambil data member'
    );
  }
};


const searchMembers = async (searchTerm, page = 1, limit = 5) => {
  try {
    console.log(`${searchTerm} - ${page} - ${limit}`);
    const response = await Client.get('/members/search/', {
      params: { page, limit, searchTerm },
    });

    if (response.status === 200 && response.data?.status && response.data?.data) {
      return response.data.data;
    }

    // Jika kondisi tidak terpenuhi, return default empty data atau throw error
    throw new Error('Data member tidak ditemukan');
  } catch (error) {
    console.log(`error : ${error}`);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat ambil data member'
    );
  }
};



const createMember = async (userId, outletId, membershipLevel, membershipDuration) => {
  try {
    console.log('Payload dikirim ke backend:', {
      userId,
      outletId,
      membershipLevel,
      membershipDuration
    });

    const response = await Client.post(`/member`, {
      userId,
      outletId,
      membershipLevel,
      membershipDuration
    });
    if (response.status === 201 && response.data.status && response.data.data) {
      return response.data.data;
    }
  } catch (error) {
    console.log(`error : ${error}`);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat membuat member'
    );
  }
};



const updateMember = async (id, membershipLevel, membershipDuration) => {
  try {
    const response = await Client.patch('/member/' + id, {
      membershipLevel,
      membershipDuration
    });


    if (response.status === 200 && response.data.status && response.data.data) {
      console.log(`data yang diterima : ${JSON.stringify(response.data.data)}`);
      return response.data.data;
    }


  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat update member'
    );
  }
};



export default {
  getMemberByOutletId,
  searchMemberByOutletId,
  createMember,
  getAllMember,
  searchMembers ,
  updateMember
}