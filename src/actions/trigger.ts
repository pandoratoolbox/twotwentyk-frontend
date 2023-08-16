import api from "../config/api";
import { ITrigger } from "../models/trigger";

export const getTriggers = async () => {
    try {
      const res = await api.get<ITrigger[]>("/trigger");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };