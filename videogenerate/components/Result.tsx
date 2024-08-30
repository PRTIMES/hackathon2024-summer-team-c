import { PvData, ReleaseData } from '@/app/page';
import React, { useState } from 'react';

// APIからデータを取得する関数に型を付けます
const getSingleItem = async (companyId: string, releaseId: string): Promise<ReleaseData> => {
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

  const jsonData: ReleaseData = await response.json();
  return jsonData;
};

const getPvData = async (companyId: string, releaseId: string): Promise<PvData> => {
  const response = await fetch(`https://hackathon.stg-prtimes.net/api/companies/${companyId}/releases/${releaseId}/statistics`, {
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

  const jsonData: PvData = await response.json();
  return jsonData;
};

type ResultProps = {
  data: ReleaseData | null;
  setData: (data: ReleaseData | null) => void;
  pvdata: PvData | null;
  setPvdata: (data: PvData | null) => void;
};

const Result: React.FC<ResultProps> = ({ data, setData, pvdata, setPvdata}) => {
  const [companyId, setCompanyId] = useState<string>(''); 
  const [releaseId, setReleaseId] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null); 

  const handleClick = async () => {
    try {
      const result = await getSingleItem(companyId, releaseId);
      setData(result); 
      setError(null); // エラーをクリア
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    try {
      const pvresult = await getPvData(companyId, releaseId);
      setPvdata(pvresult); 
      setError(null); // エラーをクリア
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
      <div className="result-container p-6 bg-gray-100 rounded-xl shadow-md space-y-4 m-4 flex-1 max-w-[calc(50%-2rem)]">
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

        <button onClick={handleClick} className="w-full mt-4 text-white px-4 py-2 rounded-lg bg-black hover:bg-gray-500">
          記事内容を自動表示する
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="result-container p-6 space-y-4 m-4 flex-1 max-w-[calc(50%-2rem)]">
      {pvdata && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 mr-2 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m0 0V9h1v2m0 2h1v4h-1v2h-1v-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8h-3.2c-.55 0-1.1-.45-1.1-1 0-.55.45-1 1-1h.8c1.15 0 2.1-.94 2.1-2.1V3m0 0H7c-1.38 0-2.5 1.12-2.5 2.5v17C4.5 23.88 5.62 25 7 25h10.9c1.38 0 2.5-1.12 2.5-2.5V10.6a.2.2 0 00-.2-.2H13m8-6.5L17 8.5M11.6 15.4l-5.6-5.6m.7-4.2l2.8 2.8m4.2-.7l5.6 5.6"
            />
          </svg>
          直近1年のPV/UU、いいね総数
        </h2>
        <p className="mt-4 text-xl text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 16v-2m8-8h-2M4 12H2m18.364 4.636L18.5 15.5m-13 2.828l1.414-1.414M18.5 8.5l1.414-1.414M5.414 8.5L4 7.086"
            />
          </svg>
          PV : {pvdata.page_view}
        </p>
        <p className="mt-2 text-xl text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2 text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 16v-2m8-8h-2M4 12H2m18.364 4.636L18.5 15.5m-13 2.828l1.414-1.414M18.5 8.5l1.414-1.414M5.414 8.5L4 7.086"
            />
          </svg>
          ユニークユーザー : {pvdata.unique_user}
        </p>
        <p className="mt-2 text-xl text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2 text-pink-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 16v-2m8-8h-2M4 12H2m18.364 4.636L18.5 15.5m-13 2.828l1.414-1.414M18.5 8.5l1.414-1.414M5.414 8.5L4 7.086"
            />
          </svg>
          いいね数 : {pvdata.like}
        </p>
      </div>      
      )}
      </div>
    </div>
  );
}

export default Result;
