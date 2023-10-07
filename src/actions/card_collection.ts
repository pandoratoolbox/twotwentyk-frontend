import api from "../config/api";
import { ICardCollection } from "../models/card_collection";

export const getCardCollectionData = async () => {
  try {
    const res = await api.get<ICardCollection[]>("/card_collection");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};
