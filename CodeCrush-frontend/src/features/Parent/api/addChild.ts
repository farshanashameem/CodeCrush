import apiClient from "../../../services/apiClient";
import type { AddChildPayload } from "../types";


export const addChild = async( data:AddChildPayload) => {
    try {

        const response = await apiClient.post("/children", data);

        return {
            success: true,
            data: response.data
        }
    } catch ( error: any ) {
         console.log("ADD CHILD ERROR:", error.response?.data)
        return {
            success: false,
            message: error.response?.data?.message || " Failed to add child"
        }
    }
}