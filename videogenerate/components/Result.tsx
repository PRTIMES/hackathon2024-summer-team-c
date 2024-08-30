import { ReleaseData } from '@/app/page';
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

type ResultProps = {
  data: ReleaseData | null;
  setData: (data: ReleaseData | null) => void;
};

const Result: React.FC<ResultProps> = ({ data, setData }) => {
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
  };

  return (
    <div className="flex flex-wrap justify-center">
  <div className="result-container p-6 max-w-lg bg-gray-100 rounded-xl shadow-md space-y-4 m-4">
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

  <div className="result-container p-6 max-w-lg bg-gray-100 rounded-xl shadow-md space-y-4 m-4">
    <p>このサイトではすでにリリースした記事をもとに一瞬でショート動画を作成することができます。またその内容の編集から字幕の編集、サムネイルの設置など動画を作成するにあたって必要なコンテンツはすべて入力することができ、それをもとに動画を作成できます</p>
  </div>
</div>
  );
}

export default Result;
