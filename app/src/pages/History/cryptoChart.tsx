import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataPoint {
  // Based on CoinGecko's 'prices' array
  x: string; // date as string
  y: number; // price
}

interface Props {
  cryptoId?: string; // e.g., 'bitcoin', 'ethereum', etc.
  days?: number;     // how many days of data to fetch (default 7)
}

const CryptoLineChart: React.FC<Props> = ({
  cryptoId = "bitcoin",
  days = 7,
}) => {
  // State for chart data, loading, and error
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from CoinGecko on mount or when cryptoId/days changes
  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days,
            },
          }
        );

        const apiData = response.data.prices;

        const chartPoints: ChartDataPoint[] = apiData.map((point: any) => ({
          x: new Date(point[0]).toLocaleDateString(), // convert timestamp to date
          y: point[1], // price
        }));

        const labels = chartPoints.map((p) => p.x);
        const values = chartPoints.map((p) => p.y);

        const newChartData = {
          labels,
          datasets: [
            {
              label: `${cryptoId} Price (USD)`,
              data: values,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: false,
            },
          ],
        };

        setChartData(newChartData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load chart data");
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [cryptoId, days]);

  if (isLoading) {
    return <p>Loading {cryptoId} chart...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
 return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 capitalize">
        {cryptoId} Price Chart (Last {days} Days)
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: true,
              text: `${cryptoId.toUpperCase()} Chart`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price (USD)",
              },
              beginAtZero: false,
            },
          },
        }}
      />
    </div>
  );
};

export default CryptoLineChart;
