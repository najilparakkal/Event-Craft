import { authAxiosInstance } from "../vendor/axios/AxiosInstance";

export const fetchUsers = async (list: string) => {
  try {
    const response = await authAxiosInstance.post("admin/Users", { list });
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchVendors = async (list: string) => {
  try {
    const response = await authAxiosInstance.post("admin/Vendors", { list });
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const blockorUnBlock = async (id: string) => {
  try {
    await authAxiosInstance.put("admin/block", { id });
  } catch (error) {
    console.log(error);
  }
};
export const blockorUnBlockUsers = async (id: string) => {
  try {
    await authAxiosInstance.patch("admin/blockUser", { id });
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (datas: any) => {
  try {
    await authAxiosInstance.post("admin/addCategory", datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await authAxiosInstance.get("admin/getCategory");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (_id: string) => {
  try {
    await authAxiosInstance.patch("admin/removeCategory", {
      data: { _id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async () => {
  try {
    const { data } = await authAxiosInstance.get("admin/request");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectVendor = async (id: string, reason: string) => {
  try {
    console.log(id, reason);

    const { data } = await authAxiosInstance.post("admin/rejectVendor", {
      id,
      reason,
    });
    return data.success;
  } catch (error) {
    console.log(error);
  }
};
export const acceptVendor = async (dataa: string) => {
  try {
    const { data } = await authAxiosInstance.post("admin/acceptVendor", {
      dataa,
    });

    return data.success;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDetails = async () => {
  try {
    const response = await authAxiosInstance.get("admin/dashboard");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCanelldBookings = async () => {
  try {
    const response = await authAxiosInstance.get("admin/cancelBookings");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const refundUser = async ( bookingId: string,paymentId:string) => {
  try {
    const response = await authAxiosInstance.patch(
      `admin/refund/${bookingId}`,
      { paymentId }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};


export const bills = async()=>{
  try {
    const response = await authAxiosInstance.get('admin/bills');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}