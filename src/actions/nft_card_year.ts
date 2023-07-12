import api from "../config/api";
import { INftCardYear } from "../models/nft_card_year";
import { NftCardYearFilters } from "../models/filters";



export const getMyNftCardYear = async (filters: NftCardYearFilters | null) => {
  try {
    let q_params = new URLSearchParams();
  
    if (filters) {
      if (filters.card_series_id) {
        q_params.append("card_series_id", filters.card_series_id.toString());
      }

      if (filters.year) {
        q_params.append("year", filters.year.toString());
      }

      if (filters.rarities) {
        q_params.append("rarities", filters.rarities.join(","));
      }

      if (filters.status) {
        q_params.append("status", filters.status.join(","));
      }
    }
    const res = await api.get<INftCardYear[]>("/me/nft_card_year", {params:q_params});
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
