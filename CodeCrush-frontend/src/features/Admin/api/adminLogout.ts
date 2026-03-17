
import adminApiClient from "../../../services/apiAdmin";

export const adminLogoutApi = async () => {
  const res = await adminApiClient.post("/logout", {}, { withCredentials: true });
  return res.data;
};