import api from '../config/api';
import { INftCardPrediction } from '../models/nft_card_prediction';

export const getMyNftCardPrediction = async (token: string) => {
    try {
      const res = await api.get<INftCardPrediction[]>("/me/nft_card_prediction", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };