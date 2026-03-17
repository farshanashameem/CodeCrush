import apiClient from "../../../services/apiClient";
import type { Child } from "../types";

export const getChild = async (id: string) => {
  try {
    const { data } = await apiClient.get<{ message: string; data: Child }>(
      `/children/${id}`
    );
    return { success: true, data: data.data };
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};