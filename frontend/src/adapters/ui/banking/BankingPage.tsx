import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BankingService } from "../../infrastructure/BankingService";
import { useState } from "react";

export default function BankingPage() {
  const [year, setYear] = useState(2024);
  const [amount, setAmount] = useState(0);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["cb", year], () => BankingService.getCB(year));

  const bankMutation = useMutation(() => BankingService.bank(amount, year), {
    onSuccess: () => queryClient.invalidateQueries(["cb", year]),
  });

  const applyMutation = useMutation(() => BankingService.apply(amount, year), {
    onSuccess: () => queryClient.invalidateQueries(["cb", year]),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  const cb = data?.cb_before ?? 0;
  const positive = cb > 0;
  const negative = cb < 0;

  return (
    <div className="p-6 space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Banking</h1>

      <div>
        <label className="block mb-1">Select Year</label>
        <select className="border p-2 w-full" value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <p className="text-lg">Current CB: <span className={positive ? "text-green-600" : negative ? "text-red-600" : ""}>{cb.toFixed(2)}</span></p>
      </div>

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button
        disabled={!positive}
        onClick={() => bankMutation.mutate()}
        className={`px-4 py-2 rounded w-full ${positive ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"}`}
      >
        Bank Surplus
      </button>

      <button
        disabled={!negative}
        onClick={() => applyMutation.mutate()}
        className={`px-4 py-2 rounded w-full ${negative ? "bg-orange-600 text-white" : "bg-gray-300 cursor-not-allowed"}`}
      >
        Apply Banked Surplus
      </button>
    </div>
  );
}
