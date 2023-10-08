import api from "../config/api";
import { ICardSeries } from "../models/card_series";

export const getCardSeriesData = async () => {
  try {
    const res = await api.get<ICardSeries[]>("/card_series");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Server Error!" };
  }
};
