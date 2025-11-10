import axios from "axios";
import { ICompareService, CompareItem } from "../../core/ports/ICompareService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const CompareService: ICompareService = {
  async getComparison(): Promise<CompareItem[]> {
    const res = await axios.get(`${API_URL}/routes/comparison`);
    return res.data;
  },
};
