import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async"; // Async dropdown
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoWebSocket from "../../components/CryptoTable/CryptoTable";
import {  useSelector } from "react-redux";
import store from "../../redux/store";
import { getSelectedCrypto, setSelectedCrypto } from "../../redux/slices/selectedCryptoSlice";
import { useCryptoDataList } from "../../api/cryptoAPI";

const Dashboard = () => {
    const cryptoName = useSelector(getSelectedCrypto);
const [selectedCryptoOption, setSelectedCryptoOption] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [selectedCryptoPrice, setSelectedCryptoPrice] = useState<any>();
   const navigate = useNavigate();
 const {
   data: cryptoDetails,
 } = useCryptoDataList({
   queryKey: ["cryptoDetail", cryptoName.name],
   cryptoName: cryptoName.name,
 });

  useEffect(() => {
    setSelectedCryptoOption({
      label: cryptoName.name,
      value: cryptoName.name,
    });
  }, [cryptoName.name]);

  useEffect(() => {
    if (!selectedCryptoOption?.value) return;
    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${selectedCryptoOption.value}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "data");
      setSelectedCryptoPrice(parseFloat(data[selectedCryptoOption.value]));
    };

    ws.onerror = () => setError("WebSocket connection failed.");

    return () => ws.close();
  }, [selectedCryptoOption?.value]);

  const handleCryptoChange = (selectedOption: any) => {
     store.dispatch(
       setSelectedCrypto({
         name: selectedOption.value,
         symbol: "",
       })
     );
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
            value={selectedCryptoOption}
            onChange={handleCryptoChange}
            placeholder="Search and select a cryptocurrency..."
            className="w-1/2"
          />
          {selectedCryptoOption && (
            <div className="flex flex-col items-start">
              <p className="text-xl font-semibold">
                Current Price:{" "}
                {selectedCryptoPrice !== undefined
                  ? `$${selectedCryptoPrice}`
                  : "Loading..."}
              </p>
              <p
                className={`text-lg ${
                  cryptoDetails?.changePercent24Hr &&
                  cryptoDetails?.changePercent24Hr >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                24h Change:{" "}
                {cryptoDetails?.changePercent24Hr !== undefined
                  ? `${cryptoDetails?.changePercent24Hr}%`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Volume:{" "}
                {cryptoDetails?.volumeUsd24Hr !== undefined
                  ? `$${cryptoDetails?.volumeUsd24Hr / 1e6}M`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Market Cap:{" "}
                {cryptoDetails?.marketCapUsd !== undefined
                  ? `$${parseFloat(cryptoDetails?.marketCapUsd)}B`
                  : "Loading..."}
              </p>
              <p className="text-lg">
                Supply:{" "}
                {cryptoDetails?.supply !== undefined
                  ? `${cryptoDetails?.supply}`
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
