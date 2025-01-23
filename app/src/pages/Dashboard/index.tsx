import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async"; // Async dropdown
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoWebSocket from "../../components/CryptoTable/CryptoTable";
import {  useSelector } from "react-redux";
import store from "../../redux/store";
import { getSelectedCrypto, setSelectedCrypto } from "../../redux/slices/selectedCryptoSlice";

interface CryptoDetails {
  price?: number;
  volume?: number;
  marketCap?: number;
  supply?: number;
  change?: number;
}

const Dashboard = () => {
    const cryptoName = useSelector(getSelectedCrypto);
  const [selectedCrypto, setSelectedCryptoValue] = useState<any>();
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  


  useEffect(() => {
    setSelectedCryptoValue(cryptoName.name);
  }, [cryptoName.name]);

  useEffect(() => {
    if (!selectedCrypto) return;

    
    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${selectedCrypto.value}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data[selectedCrypto.value]) {
        setCryptoDetails((prev) => ({
          ...prev,
          price: parseFloat(data[selectedCrypto.value]),
        }));
      }
    };

    ws.onerror = () => setError("WebSocket connection failed.");

    return () => ws.close();
  }, [selectedCrypto]);

  const fetchAdditionalDetails = async (cryptoId: string) => {
    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${cryptoId}`
      );
      const data = response.data.data;
      setCryptoDetails((prev) => ({
        ...prev,
        volume: parseFloat(data.volumeUsd24Hr),
        marketCap: parseFloat(data.marketCapUsd),
        supply: parseFloat(data.supply),
        change: parseFloat(data.changePercent24Hr),
      }));
    } catch (err) {
      setError("Failed to fetch additional data.");
    }
  };

  const handleCryptoChange = (selectedOption: any) => {
     store.dispatch(
       setSelectedCrypto({
         name: selectedOption.value,
         symbol: "",
       })
     );
    setSelectedCryptoValue(selectedOption);
    setCryptoDetails({});
    fetchAdditionalDetails(selectedOption.value); 
  };

  const fetchCryptoOptions = async (inputValue: string) => {
    const response = await axios.get("https://api.coincap.io/v2/assets");
    const options = response.data.data.map((crypto: any) => ({
      value: crypto.id,
      label: crypto.name,
    }));
    return options.filter((option: any) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">Cryptocurrency Dashboard</h1>
        <div className="flex items-center gap-6">
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={fetchCryptoOptions}
            onChange={handleCryptoChange}
            placeholder="Search and select a cryptocurrency..."
            className="w-1/2"
          />
          {selectedCrypto && (
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold">
                Current Price:{" "}
                {cryptoDetails.price !== undefined
                  ? `$${cryptoDetails.price.toFixed(2)}`
                  : "Loading..."}
              </p>
              <p
                className={`text-lg ${
                  cryptoDetails.change && cryptoDetails.change >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                24h Change:{" "}
                {cryptoDetails.change !== undefined
                  ? `${cryptoDetails.change.toFixed(2)}%`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Volume:{" "}
                {cryptoDetails.volume !== undefined
                  ? `$${(cryptoDetails.volume / 1e6).toFixed(2)}M`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Market Cap:{" "}
                {cryptoDetails.marketCap !== undefined
                  ? `$${(cryptoDetails.marketCap / 1e9).toFixed(2)}B`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Supply:{" "}
                {cryptoDetails.supply !== undefined
                  ? `${cryptoDetails.supply.toFixed(0)}`
                  : "Loading..."}
              </p>
              <button
                onClick={() => {
                  navigate(`/overview`);
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Read More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h2>
        <CryptoWebSocket />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Market News</h2>
        <p className="text-lg">
          Stay updated with the latest news and trends in the cryptocurrency
          market. Check out our curated articles and analysis!
        </p>
        <ul className="mt-4 space-y-3">
          <li className="text-blue-600 underline">
            <a
              href="https://cryptonews.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Crypto Market Trends 2025
            </a>
          </li>
          <li className="text-blue-600 underline">
            <a
              href="https://coindesk.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin and Ethereum Predictions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
