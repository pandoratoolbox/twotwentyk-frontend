import api from '../config/api';
import { INftCardTrigger } from '../models/nft_card_trigger';

export const getMyNftCardTrigger = async () => {
    try {
      const res = await api.get<INftCardTrigger[]>("/me/nft_card_trigger");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };