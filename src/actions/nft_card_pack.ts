import api from "../config/api";
import { ICardPack } from "../models/card_pack";

export const getMyNftCardPack = async () => {
  try {
    const res = await api.get<ICardPack[]>("/me/card_pack");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
