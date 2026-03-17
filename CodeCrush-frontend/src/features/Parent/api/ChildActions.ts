import apiClient from "../../../services/apiClient";
import type { AddChildPayload } from "../types";

export const toggleBlockChild = async (childId: string ) => {
    const res = await apiClient.patch(`/children/${childId}/toggle-block`);
    return res.data;
}

export const toggleDeleteChild = async ( childId : string ) => {
    const res = await apiClient.patch(`/children/${childId}/toggle-delete`);
    return res.data;
}

export const updateChild = async( childid: string, data: AddChildPayload) => {
    const res = await apiClient.put(`/children/${childid}`, data );
    return res.data;
}