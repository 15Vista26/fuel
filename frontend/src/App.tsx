import RoutesPage from "./adapters/ui/routes/RoutesPage";
import ComparePage from "./adapters/ui/compare/ComparePage";
import BankingPage from "./adapters/ui/banking/BankingPage";
import PoolingPage from "./adapters/ui/pooling/PoolingPage";

function App() {
  return (
    <div>
      <nav className="p-3 bg-gray-800 text-white flex gap-4">
        <a href="/" onClick={() => location.href = "/"}>Routes</a>
        <a href="/compare" onClick={() => location.href = "/compare"}>Compare</a>
        <a href="/banking" onClick={() => location.href = "/banking"}>Banking</a>
        <a href="/pooling" onClick={() => location.href="/pooling"}>Pooling</a>
      </nav>

      {location.pathname === "/" && <RoutesPage />}
      {location.pathname === "/compare" && <ComparePage />}
      {location.pathname === "/banking" && <BankingPage />}
      {location.pathname === "/pooling" && <PoolingPage />}
    </div>
  );
}

export default App;
