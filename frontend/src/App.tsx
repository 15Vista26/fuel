import { useState } from "react";
import RoutesPage from "./adapters/ui/routes/RoutesPage";
import ComparePage from "./adapters/ui/compare/ComparePage";
import BankingPage from "./adapters/ui/banking/BankingPage";
import PoolingPage from "./adapters/ui/pooling/PoolingPage";

export default function App() {
  const [tab, setTab] = useState("routes");

  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <button onClick={() => setTab("routes")}>Routes</button>
        <button onClick={() => setTab("compare")}>Compare</button>
        <button onClick={() => setTab("banking")}>Banking</button>
        <button onClick={() => setTab("pooling")}>Pooling</button>
      </nav>

      {tab === "routes" && <RoutesPage />}
      {tab === "compare" && <ComparePage />}
      {tab === "banking" && <BankingPage />}
      {tab === "pooling" && <PoolingPage />}
    </div>
  );
}
