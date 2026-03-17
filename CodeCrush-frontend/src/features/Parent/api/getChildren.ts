import apiClient from "../../../services/apiClient";

export const getChildren = async() => {
    try {
        const response = await apiClient.get("/children");
        return {
            success: true,
            data: response.data
        };

    } catch ( error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch children"
        }
    }
}