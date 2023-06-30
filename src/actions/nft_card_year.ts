import api from '../config/api';
import { INftCardYear } from '../models/nft_card_year';

export const getMyNftCardYear = async () => {
    try {
      const res = await api.get<INftCardYear[]>("/me/nft_card_year");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };