import React  from "react";
import { useSelector } from "react-redux";
import { getSelectedCrypto } from "../../redux/slices/selectedCryptoSlice";
import LivePrice from "../../components/LivePrice";
import { useCryptoDataList } from "../../api/cryptoAPI";
const Overview = () => {
  const cryptoName = useSelector(getSelectedCrypto);
  const {
   data: cryptoDetail,
   error,
 } = useCryptoDataList({
   queryKey: ["cryptoDetail", cryptoName.name],
   cryptoName: cryptoName.name,
 });
   const logoUrl = cryptoDetail
     ? `https://assets.coincap.io/assets/icons/${cryptoDetail.symbol.toLowerCase()}@2x.png`
     : null;
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        {error?.message && <p className="text-red-500">{error?.message}</p>}
        {cryptoDetail ? (
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-6">
              {logoUrl && (
                <div className="p-4 bg-gray-200 rounded-full">
                  <img
                    src={logoUrl}
                    alt={cryptoDetail.name}
                    className="w-16 h-16"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{cryptoDetail.name}</h1>
                <p className="text-gray-500 text-sm">
                  {cryptoDetail.symbol.toUpperCase()} | Rank #
                  {cryptoDetail.rank}
                </p>
              </div>
            </div>
            <div className="mb-6">
               <LivePrice cryptoName={cryptoDetail.id} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-blue-100 p-4 rounded-lg">
                <div className="text-blue-500 text-2xl">💹</div>
                <div>
                  <p className="text-sm text-gray-500">Market Cap</p>
                  <p className="text-lg font-semibold">
                    ${(cryptoDetail.marketCapUsd)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-green-100 p-4 rounded-lg">
                <div className="text-green-500 text-2xl">🪙</div>
                <div>
                  <p className="text-sm text-gray-500">Circulating Supply</p>
                  <p className="text-lg font-semibold">
                    {(cryptoDetail.supply)}{" "}
                    {cryptoDetail.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-red-100 p-4 rounded-lg">
                <div className="text-red-500 text-2xl">🔗</div>
                <div>
                  <p className="text-sm text-gray-500">Total Supply</p>
                  <p className="text-lg font-semibold">
                    {(cryptoDetail.maxSupply || 0)}{" "}
                    {cryptoDetail.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-yellow-100 p-4 rounded-lg">
                <div className="text-yellow-500 text-2xl">🏅</div>
                <div>
                  <p className="text-sm text-gray-500">All-Time High</p>
                  <p className="text-lg font-semibold">$68,000</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">
                About {cryptoDetail.name}
              </h2>
              <p className="text-gray-600">
                {cryptoDetail.name} is a decentralized digital currency that
                allows peer-to-peer transactions without the need for a central
                authority. It is widely regarded as the pioneer of blockchain
                technology and cryptocurrency.
              </p>
            </div>
          </div>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </>
  );
};

export default Overview;
