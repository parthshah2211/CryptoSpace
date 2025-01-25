import React, { useEffect, useState } from "react";

const LivePrice = ({ cryptoName }: { cryptoName: string }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoName}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data[cryptoName]) {
        const newPrice = parseFloat(data[cryptoName]);
        setPrevPrice(price); // Set previous price
        setPrice(newPrice); // Update price

        // Determine if the price went up or down
        if (prevPrice !== null) {
          if (newPrice > prevPrice) {
            setPriceChange("up");
          } else if (newPrice < prevPrice) {
            setPriceChange("down");
          } else {
            setPriceChange(null);
          }
        }

        // Reset the color highlight after 2 seconds
        setTimeout(() => setPriceChange(null), 2000);
      }
    };

    return () => {
      ws.close(); // Cleanup on unmount
    };
  }, [cryptoName, price, prevPrice]);

  return (
    <div>
      <h1 className="text-xl font-bold">Live {cryptoName} Price:</h1>
      <div
        className={`inline-block px-4 py-2 rounded ${
          priceChange === "up"
            ? "bg-green-100"
            : priceChange === "down"
            ? "bg-red-100"
            : "bg-transparent"
        }`}
      >
        <p
          className={`text-lg font-semibold ${
            priceChange === "up"
              ? "text-green-600"
              : priceChange === "down"
              ? "text-red-600"
              : "text-black"
          }`}
        >
          {price !== null ? `$${price.toFixed(2)}` : "Loading..."}
          {priceChange === "up" && <span> ↑</span>}
          {priceChange === "down" && <span> ↓</span>}
        </p>
      </div>
    </div>
  );
};

export default LivePrice;
