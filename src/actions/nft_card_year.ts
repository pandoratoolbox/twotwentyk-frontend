import api from "../config/api";
import { INftCardYear } from "../models/nft_card_year";

export const getMyNftCardYear = async (token: string) => {
  try {
    const res = await api.get<INftCardYear[]>("/me/nft_card_year", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
