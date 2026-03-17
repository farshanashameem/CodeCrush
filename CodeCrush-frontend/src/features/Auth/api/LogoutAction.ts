import apiClient from "../../../services/apiClient";

export const LogoutAction = async() => {
    const res = await apiClient.post("auth/logout");
    return res.data;
}