import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dashboard from "./components/dashboards/dashboard"; 

function App() {
  const [symbolsData, setSymbolsData] = useState([]);
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [symbolInfo, setSymbolInfo] = useState(null);
  const symbolRefs = useRef({});

  useEffect(() => {
    const fetchSymbolsData = async () => {
      try {
        const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
        const symbols = response.data.symbols;
        setSymbolsData(symbols);
        setFilteredSymbols(symbols);
      } catch (error) {
        console.error("Error fetching symbols data:", error);
      }
    };

    fetchSymbolsData();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = symbolsData.filter(symbol =>
      symbol.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSymbols(filtered);
  };

  const handleSymbolSelect = async (event) => {
    const symbol = event.target.value;
    setSelectedSymbol(symbol);

    if (symbol) {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        setSymbolInfo(response.data);
        // Scroll to the selected symbol row
        if (symbolRefs.current[symbol]) {
          symbolRefs.current[symbol].scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (error) {
        console.error("Error fetching symbol info:", error);
        setSymbolInfo(null);
      }
    } else {
      setSymbolInfo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-4xl font-bold">Binance Exchange Info</h1>
      </header>
      <div className="container mx-auto p-6">
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search symbol..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-3 w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedSymbol || ""}
            onChange={handleSymbolSelect}
            className="p-3 w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Symbol</option>
            {filteredSymbols.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-4 py-2 border-b text-left">Symbol</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Base Asset</th>
                <th className="px-4 py-2 border-b text-left">Quote Asset</th>
              </tr>
            </thead>
            <tbody>
              {filteredSymbols.map((symbol) => (
                <React.Fragment key={symbol.symbol}>
                  <tr
                    ref={(el) => (symbolRefs.current[symbol.symbol] = el)}
                    onClick={() => handleSymbolSelect({ target: { value: symbol.symbol } })}
                    className={`cursor-pointer hover:bg-blue-50 ${selectedSymbol === symbol.symbol ? "bg-blue-100" : ""}`}
                  >
                    <td className="px-4 py-2 border-b">{symbol.symbol}</td>
                    <td className="px-4 py-2 border-b">{symbol.status}</td>
                    <td className="px-4 py-2 border-b">{symbol.baseAsset}</td>
                    <td className="px-4 py-2 border-b">{symbol.quoteAsset}</td>
                  </tr>
                  {selectedSymbol === symbol.symbol && symbolInfo && (
                    <tr>
                      <td colSpan="4" className="border-b bg-gray-50">
                        <Dashboard symbolInfo={symbolInfo} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
