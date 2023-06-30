import api from '../config/api';
import { INftCardTrigger } from '../models/nft_card_trigger';

export const getMyNftCardTrigger = async (token: string) => {
    try {
      const res = await api.get<INftCardTrigger[]>("/me/nft_card_trigger", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };