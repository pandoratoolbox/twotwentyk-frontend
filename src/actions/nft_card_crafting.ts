import api from "../config/api";
import { INftCardCrafting } from "../models/nft_card_crafting";
import { NftCardCraftingFilters } from "../models/filters";

export const getMyNftCardCrafting = async (filters: NftCardCraftingFilters | null) => {
  try {
      let q_params = new URLSearchParams();
  
      if (filters) {
        if (filters.card_series_id) {
          q_params.append("card_series_id", filters.card_series_id.toString());
        }
  
        if (filters.rarities) {
          q_params.append("rarities", filters.rarities.join(","));
        }
  
        if (filters.status) {
          q_params.append("status", filters.status.join(","));
        }
      }
  
    const res = await api.get<INftCardCrafting[]>("/me/nft_card_crafting", { params: q_params});
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
