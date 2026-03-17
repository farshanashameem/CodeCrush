import adminApiClient from "../../../services/apiAdmin";

export const toggleBlockParent = async ( parentId: string ) => {
    try {
        const response = await adminApiClient.patch(`/parent/${parentId}/toggle-block`);
        return response.data;
    } catch ( error: any ) {
        throw error.response?.data || { message: "Failed to block/unblock parent"};
    }
}

export const toggleDeleteParent = async ( parentId: string ) => {
    try {
        const response = await adminApiClient.patch(`/parent/${parentId}/toggle-delete`);
        return response.data;
    } catch ( error: any ) {
        throw error.response?.data || { message: "Failed to delete/restore parent"};
    }
}