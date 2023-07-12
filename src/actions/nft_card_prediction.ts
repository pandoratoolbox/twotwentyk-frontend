import api from '../config/api';
import { INftCardPrediction } from '../models/nft_card_prediction';
import { NftCardPredictionFilters } from '../models/filters';


export const getMyNftCardPrediction = async (filters: NftCardPredictionFilters | null) => {
    try {
      let q_params = new URLSearchParams();
  
      if (filters) {
        if (filters.card_series_id) {
          q_params.append("card_series_id", filters.card_series_id.toString());
        }
  
        if (filters.celebrities) {
          q_params.append("celebrities", filters.celebrities.join(","));
        }
  
        if (filters.triggers) {
          q_params.append("triggers", filters.triggers.join(","));
        }
  
        if (filters.rarities) {
          q_params.append("rarities", filters.rarities.join(","));
        }
  
        if (filters.status) {
          q_params.append("status", filters.status.join(","));
        }
      }

      const res = await api.get<INftCardPrediction[]>("/me/nft_card_prediction", {params:q_params});
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };