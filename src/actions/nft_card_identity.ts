import api from "../config/api";
import { INftCardIdentity } from "../models/nft_card_identity";
import { NftCardIdentityFilters } from "../models/filters";

export const getMyNftCardIdentity = async (filters: NftCardIdentityFilters | null) => {
  try {
    let q_params = new URLSearchParams();
  
    if (filters) {
      if (filters.card_series_id) {
        q_params.append("card_series_id", filters.card_series_id.toString());
      }

      if (filters.celebrities) {
        q_params.append("celebrities", filters.celebrities.join(","));
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

    const res = await api.get<INftCardIdentity[]>("/me/nft_card_identity", {params:q_params});
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};


export const updateMyNftCardIdentity = async (id: number, cName: string) => {
  try {
  
    const res = await api.put(`/nft_card_identity/${id}`, {celebrity_name:cName});
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
