// src/features/Admin/api/getParentsApi.ts
import adminApiClient from "../../../services/apiAdmin";
import { store } from "../../../app/store";


export const getParentsApi = async () => {
  try {
 console.log("Access Token:", store.getState().admin.accessToken);
    const res = await adminApiClient.get('/parents');
    
    return res.data.map((parent: any) => ({
      id: parent.id,
      name: parent.name,
      email: parent.email,
      childrenIds: parent.childrenIds || [],
      isBlocked: parent.isBlocked,
      isDeleted: parent.isDeleted,
    }));
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};