import api from "../config/api";
import { INftCardDayMonth } from "../models/nft_card_day_month";

export const getMyNftCardDayMonth = async () => {
  try {
    const res = await api.get<INftCardDayMonth[]>("/me/nft_card_day_month");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
