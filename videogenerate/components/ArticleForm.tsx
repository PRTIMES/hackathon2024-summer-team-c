"use client";
import { ReleaseData } from "@/app/page";
import DropImageZone from "./DropImageZone";
import React, { useState } from 'react';


type Props = {
  data: ReleaseData|null;
  base64Image: string | null;
  setBase64Image: (value: string | null) => void;
};

export default function ArticleForm({ data, base64Image, setBase64Image }: Props) {
  const [edittitleData, setEdittitleData] = useState(data?.title);
  const [editminititleData, setEditminititleData] = useState(data?.subtitle);
  const [editbodyData, setEditbodyData] = useState(data?.body);

  return (
    <div className="p-6 rounded-lg shadow-md m-8 mx-auto max-w-6xl border border-black">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 flex flex-col items-center justify-center">
        手動で動画を生成する場合は、以下のフォームに入力してください。プレスリリースを配信していなくても動画を作成できます。
      </h1>

      <form className="space-y-6">
        <div>
        <label
          htmlFor="article-body"
          className="block text-lg font-bold text-gray-700"
        >
          記事の内容
        </label>
          <div className="mt-1">
            <textarea
            placeholder="記事の内容を入力してください"
              id="article-title"
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border border-black resize-none"
              value={edittitleData ?? ""}
              onChange={(event) => setEdittitleData(event.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="article-subtitle"
            className="block text-lg font-bold text-gray-700"
          >
            記事のサブタイトル
          </label>
          <div className="mt-1">
            <textarea
              id="article-subtitle"
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border border-black resize-none"
              value={editminititleData ?? ""}
              onChange={(event) => setEditminititleData(event.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="article-body"
            className="block text-lg font-bold text-gray-700"
          >
            記事の内容
          </label>
          <div className="mt-1">
            <textarea
              id="article-body"
              className="block w-full h-[400px] p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 border border-black resize-none"
              value={editbodyData ?? ""}
              onChange={(event) => setEditbodyData(event.target.value)}
              rows={10}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="article-thumbnail"
            className="block text-lg font-bold text-gray-700"
          >
            記事のサムネイル
          </label>
          <div className="mt-1">
            <DropImageZone base64Image={base64Image} setBase64Image={setBase64Image} />
          </div>
        </div>

        <div className="flex justify-center mt-6">
        </div>
      </form>
    </div>
  );
}
