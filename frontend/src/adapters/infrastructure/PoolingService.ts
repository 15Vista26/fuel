import axios from "axios";
import { IPoolingService, PoolMember } from "../../core/ports/IPoolingService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const PoolingService: IPoolingService = {
  async getAdjusted(year: number): Promise<PoolMember[]> {
    const res = await axios.get(`${API_URL}/compliance/adjusted-cb?year=${year}`);
    return res.data;
  },

  async createPool(members: string[], year: number): Promise<PoolMember[]> {
    const res = await axios.post(`${API_URL}/pools`, { year, members });
    return res.data.members;
  },
};
