import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PoolingService } from "../../infrastructure/PoolingService";

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const [selected, setSelected] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { data: members = [], isLoading } = useQuery(["adjustedCB", year], () =>
    PoolingService.getAdjusted(year)
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const createMutation = useMutation(
    () => PoolingService.createPool(selected, year),
    {
      onSuccess: () => queryClient.invalidateQueries(["adjustedCB", year]),
    }
  );

  if (isLoading) return <p className="p-4">Loading...</p>;

  const poolMembers = members.filter((m) => selected.includes(m.shipId));
  const poolSum = poolMembers.reduce((s, m) => s + m.cb_before, 0);
  const isValid = poolMembers.length > 1 && poolSum >= 0;

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-semibold">Pooling</h1>

      <div>
        <label className="block mb-1">Year</label>
        <select className="border p-2" value={year} onChange={(e) => setYear(Number(e.target.value))}>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2"></th>
            <th className="border p-2">Ship</th>
            <th className="border p-2">CB Before</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.shipId}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selected.includes(m.shipId)}
                  onChange={() => toggleSelect(m.shipId)}
                />
              </td>
              <td className="border p-2">{m.shipId}</td>
              <td className="border p-2">{m.cb_before.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`p-3 rounded ${poolSum >= 0 ? "bg-green-100" : "bg-red-100"}`}>
        Pool CB Total: <b>{poolSum.toFixed(2)}</b>
      </div>

      <button
        disabled={!isValid}
        onClick={() => createMutation.mutate()}
        className={`w-full px-4 py-2 rounded text-white ${
          isValid ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Create Pool
      </button>
    </div>
  );
}
