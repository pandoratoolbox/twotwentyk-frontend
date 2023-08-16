import api from '../config/api';
import { ICategory } from '../models/category';


export const getCategories = async () => {
    try {
      const res = await api.get<ICategory[]>("/category");
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error };
    }
  };