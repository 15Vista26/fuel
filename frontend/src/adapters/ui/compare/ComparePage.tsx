import { useQuery } from "@tanstack/react-query";
import { CompareService } from "../../infrastructure/CompareService";
import CompareTable from "./CompareTable";
import CompareChart from "./CompareChart";

export default function ComparePage() {
  const { data = [], isLoading } = useQuery(["comparison"], CompareService.getComparison);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">Compare Routes</h1>
      <CompareTable items={data} />
      <CompareChart items={data} />
    </div>
  );
}
