import React from "react";

function Dashboard({ symbolInfo }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Details for {symbolInfo.symbol}</h2>
      <table className="w-full bg-gray-50 border border-gray-300 rounded-md">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">Last Price:</td>
            <td className="px-4 py-2">${symbolInfo.lastPrice}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">Open Price:</td>
            <td className="px-4 py-2">${symbolInfo.openPrice}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">High Price:</td>
            <td className="px-4 py-2">${symbolInfo.highPrice}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">Low Price:</td>
            <td className="px-4 py-2">${symbolInfo.lowPrice}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">Price Change:</td>
            <td className="px-4 py-2">${symbolInfo.priceChange}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2 font-semibold">Price Change Percentage:</td>
            <td className="px-4 py-2">{symbolInfo.priceChangePercent}%</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Volume:</td>
            <td className="px-4 py-2">{symbolInfo.volume}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Quote Volume:</td>
            <td className="px-4 py-2">${symbolInfo.quoteVolume}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
