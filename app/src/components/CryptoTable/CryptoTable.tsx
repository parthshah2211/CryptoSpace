import React, { useEffect, useState } from "react";

interface CryptoData {
  [key: string]: number; // Dynamic key-value pair for cryptocurrencies and their prices
}

const CryptoWebSocket = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoData>({});
  const [prevPrices, setPrevPrices] = useState<CryptoData>({});
  const [newPrices, setNewPrices] = useState<CryptoData>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
       setNewPrices(data)
      setCryptoPrices((prevPrices) => ({ ...prevPrices, ...data }));
    };
    ws.onerror = () => setError("WebSocket connection failed.");
    return () => ws.close();
  }, []);

  useEffect(() => {
    setTimeout(() => {
        setPrevPrices((prev) => {
          const updatedPrev = { ...prev };
          Object.keys(newPrices).forEach((key) => {
            if (cryptoPrices[key] !== undefined) {
              updatedPrev[key] = cryptoPrices[key];
            }
          });
          return updatedPrev;
        });
    }, 350);
  
  }, [newPrices]);

  const topCryptos = Object.entries(cryptoPrices)
    .sort(([, priceA], [, priceB]) => priceB - priceA) 
    .slice(0, 10);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top 10 Cryptocurrency Prices</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Cryptocurrency</th>
            <th className="border border-gray-300 px-4 py-2">Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {topCryptos.map(([name, price]) => {
            const prevPrice = prevPrices[name];
            const isPriceIncreased =
              prevPrice !== undefined && price > prevPrice;
            const isPriceDecreased =
              prevPrice !== undefined && price < prevPrice;
            return (
              <tr
                key={name}
                className={`hover:bg-gray-50 ${
                  isPriceIncreased
                    ? "bg-green-100"
                    : isPriceDecreased
                    ? "bg-red-100"
                    : ""
                }`}
              >
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {name}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    isPriceIncreased
                      ? "text-green-600"
                      : isPriceDecreased
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  ${Number(price)?.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoWebSocket;
