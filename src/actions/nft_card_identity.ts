import api from '../config/api';
import { INftCardIdentity } from '../models/nft_card_identity';

export const getMyNftCardIdentity = async () => {
    try {
      const res = await api.get<INftCardIdentity[]>("/me/nft_card_identity");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };