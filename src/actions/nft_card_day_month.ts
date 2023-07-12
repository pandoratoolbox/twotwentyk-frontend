import api from "../config/api";
import { INftCardDayMonth } from "../models/nft_card_day_month";
import { NftCardDayMonthFilters } from "../models/filters";


export const getMyNftCardDayMonth = async (filters: NftCardDayMonthFilters | null) => {
  try {
        let q_params = new URLSearchParams();
  
      if (filters) {
        if (filters.card_series_id) {
          q_params.append("card_series_id", filters.card_series_id.toString());
        }
  
        if (filters.day) {
          q_params.append("day", filters.day.toString());
        }

        if (filters.month) {
          q_params.append("month", filters.month.toString());
        }
  
  
        if (filters.rarities) {
          q_params.append("rarities", filters.rarities.join(","));
        }
  
        if (filters.status) {
          q_params.append("status", filters.status.join(","));
        }
      }
  
    const res = await api.get<INftCardDayMonth[]>("/me/nft_card_day_month", { params: q_params});
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
