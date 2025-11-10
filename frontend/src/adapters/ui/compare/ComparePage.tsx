import { useQuery } from "@tanstack/react-query";
import { CompareService } from "../../infrastructure/CompareService";

export default function ComparePage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["compare"],
    queryFn: CompareService.compare,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Compare Routes</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Baseline GHG</th>
            <th className="p-2 border">Comparison GHG</th>
            <th className="p-2 border">% Difference</th>
            <th className="p-2 border">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border">{row.baseline.ghgIntensity}</td>
              <td className="p-2 border">{row.comparison.ghgIntensity}</td>
              <td className="p-2 border">{row.percentDiff.toFixed(2)}%</td>
              <td className="p-2 border">
                {row.compliant ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
