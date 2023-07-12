import api from "../config/api";
import { INftCardCategory } from "../models/nft_card_category";
import { NftCardCategoryFilters } from "../models/filters";

export const getMyNftCardCategory = async (
  filters: NftCardCategoryFilters | null
) => {
  try {
    let q_params = new URLSearchParams();

    if (filters) {
      if (filters.card_series_id) {
        q_params.append("card_series_id", filters.card_series_id.toString());
      }

      if (filters.categories) {
        q_params.append("categories", filters.categories.join(","));
      }

      if (filters.rarities) {
        q_params.append("rarities", filters.rarities.join(","));
      }

      if (filters.status) {
        q_params.append("status", filters.status.join(","));
      }
    }

    const res = await api.get<INftCardCategory[]>("/me/nft_card_category", {
      params: q_params,
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
