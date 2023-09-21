import api from '../config/api';
import { INftCardTrigger } from '../models/nft_card_trigger';
import { NftCardTriggerFilters } from '../models/filters';

export const getMyNftCardTrigger = async (filters: NftCardTriggerFilters | null) => {
    try {
      let q_params = new URLSearchParams();
  
      if (filters) {
  
        if (filters.categories) {
          q_params.append("categories", filters.categories.join(","));
        }
  
        if (filters.tiers) {
          q_params.append("tiers", filters.tiers.join(","));
        }
  
        if (filters.rarities) {
          q_params.append("rarities", filters.rarities.join(","));
        }
  
        if (filters.status) {
          q_params.append("status", filters.status.join(","));
        }
      }
      const res = await api.get<INftCardTrigger[]>("/me/nft_card_trigger", {params:q_params});
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };