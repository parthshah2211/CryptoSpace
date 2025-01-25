import {  useQuery } from "@tanstack/react-query";
import { axiosGet } from "./axios";

export const useCryptoDataList = (params: { queryKey: any; cryptoName: string }) => {
  const { queryKey, cryptoName } = params;
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchCryptoData(cryptoName),
    
    select: (response) => {
      return formatDecimalsToThree(response.data);
    },
  });
};
export const useCryptoDataHistory = (params: {
  queryKey: any;
  cryptoId: string | number;
  days:number;
}) => {
  const { queryKey, cryptoId,days } = params;
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchCryptoHistory(cryptoId, days),

    select: (response) => {
      return response;
    },
  });
};
const fetchCryptoData = async (cryptoName: string) => {
  const { data } = await axiosGet(
    `https://api.coincap.io/v2/assets/${cryptoName}`
  );
  return data;
};
const fetchCryptoHistory = async (cryptoId: string | number, days:number) => {
  const { data } = await axiosGet(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
    {
      params: { vs_currency: "usd", days: days },
    }
  );
  return data;
};

function formatDecimalsToThree(obj: any): any {
  
  for (const key in obj) {
    if (typeof obj[key] === "string" && !isNaN(Number(obj[key]))) {
      obj[key] = parseFloat(Number(obj[key]).toFixed(2));
    }
  }
  return obj; 
}