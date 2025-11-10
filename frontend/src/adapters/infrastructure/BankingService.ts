import axios from "axios";
import { IBankingService, ComplianceBalance } from "../../core/ports/IBankingService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const BankingService: IBankingService = {
  async getCB(year: number): Promise<ComplianceBalance> {
    const res = await axios.get(`${API_URL}/compliance/cb?year=${year}`);
    return res.data;
  },

  async bank(amount: number, year: number): Promise<ComplianceBalance> {
    const res = await axios.post(`${API_URL}/banking/bank`, { amount, year });
    return res.data;
  },

  async apply(amount: number, year: number): Promise<ComplianceBalance> {
    const res = await axios.post(`${API_URL}/banking/apply`, { amount, year });
    return res.data;
  },
};
