import api from '../config/api';
import { INftCardCrafting } from '../models/nft_card_crafting';

export const getMyNftCardCrafting = async () => {
    try {
      const res = await api.get<INftCardCrafting[]>("/me/nft_card_crafting");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };