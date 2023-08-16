import api from '../config/api';
import { ICelebrity } from '../models/celebrity';

export const getCelebrities = async () => {
    try {
      const res = await api.get<ICelebrity[]>("/celebrity");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };