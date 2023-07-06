import api from "../config/api";
import { ICardPacks } from "../models/card_packs";

export const getMyNftCardPack = async () => {
  try {
    const res = await api.get<ICardPacks[]>("/me/card_pack");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
