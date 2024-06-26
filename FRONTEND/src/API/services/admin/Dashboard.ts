import { authAxiosInstance } from "../AxiosInstance";

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
    const response = await authAxiosInstance.put("admin/block", { id });
  } catch (error) {
    console.log(error);
  }
};
export const blockorUnBlockUsers = async (id: string) => {
  try {
    const response = await authAxiosInstance.patch("admin/blockUser", { id });
  } catch (error) {
    console.log(error);
  }
};
