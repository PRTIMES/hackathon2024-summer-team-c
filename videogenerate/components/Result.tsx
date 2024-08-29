import React, { useState } from 'react';

const getSingleItem = async (companyId, releaseId) => {
  const response = await fetch(`https://hackathon.stg-prtimes.net/api/companies/${companyId}/releases/${releaseId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer 37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const jsonData = await response.json();
  return jsonData;
};

const Result = ({ data, setData }) => {
  const [companyId, setCompanyId] = useState(''); 
  const [releaseId, setReleaseId] = useState(''); 
  const [error, setError] = useState(null); 

  const handleClick = async () => {
    try {
      const result = await getSingleItem(companyId, releaseId);
      setData(result); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="result-container p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <label
        htmlFor="company-id"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        企業IDを入力してください
      </label>
      <input
        id="company-id"
        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="企業IDを入力..."
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />

      <label
        htmlFor="release-id"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        リリースIDを入力してください
      </label>
      <input
        id="release-id"
        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="リリースIDを入力..."
        value={releaseId}
        onChange={(e) => setReleaseId(e.target.value)}
      />

      <button onClick={handleClick} className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        記事内容を自動表示する
      </button>

    </div>
  );
}

export default Result;
