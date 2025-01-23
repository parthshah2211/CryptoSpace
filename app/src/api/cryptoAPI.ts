import { Query, useQuery } from "@tanstack/react-query";
import { axiosGet } from "./axios";

export const useCryptoDataList = (params: {
  refetchInterval?:
    | number
    | false
    | ((
        query: Query<() => Promise<any>, Error, () => Promise<any>, any>
      ) => number | false | undefined)
    | undefined;
  queryKey: any;
}) => {
  const { refetchInterval, queryKey } = params;
  return useQuery({
    queryKey: queryKey,
    refetchInterval: refetchInterval,

    queryFn: () => fetchCryptoData,
    // select: (res) => {
    //   if (res.data?.data?.length) {
    //     return res.data; // Assuming data is in res.data.data
    //   }
    //   return [];
    // },

    experimental_prefetchInRender: true,
  });
};
// Fetch cryptocurrency data
const fetchCryptoData = async () => {
  const { data } = await axiosGet(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: false,
      },
    }
  );
  return data;
};