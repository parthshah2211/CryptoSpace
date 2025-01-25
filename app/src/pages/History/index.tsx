import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnDef,
  PaginationState,
  flexRender,
} from "@tanstack/react-table";
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
import { useSelector } from "react-redux";
import { getSelectedCrypto } from "../../redux/slices/selectedCryptoSlice";
import { useCryptoDataHistory } from "../../api/cryptoAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface HistoryRow {
  date: string;
  price: number;
  volume: number;
}

const columnHelper = createColumnHelper<HistoryRow>();


const columns: ColumnDef<HistoryRow, any>[] = [
  columnHelper.accessor("date", {
    header: "Date",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("price", {
    header: "Price (USD)",
    sortingFn: "basic",
  }),
  columnHelper.accessor("volume", {
    header: "Volume (24h)",
    sortingFn: "basic",
  }),
];

const History: React.FC = () => {
  const cryptoDetail = useSelector(getSelectedCrypto);
  const [days, setDays] = useState(15); // State to manage the number of days

  const { data: cryptoDataHistory } = useCryptoDataHistory({
    queryKey: [cryptoDetail.name, days],
    cryptoId: cryptoDetail.name,
    days,
  });
  const cryptoId = cryptoDetail.name;
  const [data, setData] = useState<HistoryRow[]>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const prices: [number, number][] = cryptoDataHistory?.prices;
        const totalVolumes: [number, number][] =
          cryptoDataHistory.total_volumes;

        const rows: HistoryRow[] = prices.map((entry, idx) => {
          const timestamp = entry[0];
          const price = entry[1];
          const volume = totalVolumes[idx]?.[1] || 0;

          return {
            date: new Date(timestamp).toLocaleDateString(),
            price,
            volume,
          };
        });

        setData(rows);
        const chartLabels = rows.map((r) => r.date);
        const chartPrices = rows.map((r) => r.price);
        const newChartData = {
          labels: chartLabels,
          datasets: [
            {
              label: `${cryptoId.toUpperCase()} Price (USD)`,
              data: chartPrices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: false,
            },
          ],
        };
        setChartData(newChartData);

        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch CoinGecko data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <p>Loading {cryptoId} data...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <div className="p-4 bg-white shadow-md rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold capitalize">
            {cryptoId} History (Last {days} days)
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="daysInput" className="text-sm font-medium">
              Days:
            </label>
            <input
              id="daysInput"
              type="number"
              className="w-20 px-2 py-1 border rounded"
              value={days}
              disabled
              onChange={(e) => setDays(Number(e?.target?.value))}
              min="1"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `${cryptoId.toUpperCase()} Price Chart`,
              },
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Price (USD)" } },
            },
          }}
        />
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortDir = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 border cursor-pointer select-none text-left"
                  >
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {sortDir === "asc" && " 🔼"}
                      {sortDir === "desc" && " 🔽"}
                    </>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default History;

