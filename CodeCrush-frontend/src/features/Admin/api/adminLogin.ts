import adminApiClient from "../../../services/apiClient";

export const adminLogin = async (email: string, password: string) => {

  const res = await adminApiClient.post("/admin/login", {
    email,
    password
  });

  return res.data;

};