import api from "../config/api";
import { INftCardCategory } from "../models/nft_card_category";

export const getMyNftCardCategory = async (token: string) => {
  try {
    const res = await api.get<INftCardCategory[]>("/me/nft_card_category", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
