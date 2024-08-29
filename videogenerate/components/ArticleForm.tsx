"use client";
import DropImageZone from "./DropImageZone";
import React, { useState } from 'react';

export default function ArticleForm({data}) {
  const [edittitleData, setEdittitleData] = useState<string | null>(data)
  const [editminititleData, setEditminititleData] = useState<string | null>(data)
  const [editbodyData, setEditbodyData] = useState<string | null>(data)

  return (
    <div>
      <h1>手動で記事を生成する場合は、以下のフォームに入力してください。プレスリリースを配信していなくても動画を作成できます</h1>

      <form className="max-w-sm mx-auto">
        <label
          htmlFor="article-body"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        />

        <label
          htmlFor="article-title"
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のタイトル
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <textarea
            id="article-title"
            className="w-full h-full bg-transparent border-none outline-none resize-none"
            value={edittitleData.title} // data.body を value に設定
            onChange={(event) => {
              setEdittitleData({
                ...edittitleData,
                title: event.target.value
              })
            }} // 必要に応じて onChange ハンドラを追加
          />
        </div>


        <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサブタイトル
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <textarea
            id="article-title"
            className="w-full h-full bg-transparent border-none outline-none resize-none"
            value={editminititleData.subtitle} // data.body を value に設定
            onChange={(event) => {
              setEditminititleData({
                ...editminititleData,
                subtitle: event.target.value
              })
            }} // 必要に応じて onChange ハンドラを追加
          />
        </div>

        <label
          htmlFor="article-body"
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事の内容
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-[500px]">
          <textarea
            id="article-body"
            className="w-full h-full bg-transparent border-none outline-none resize-none"
            value={editbodyData.body} // data.body を value に設定
            onChange={(event) => {
              setEditbodyData({
                ...editbodyData,
                body: event.target.value
              })
            }} // 必要に応じて onChange ハンドラを追加
          />
        </div>




        <label
          htmlFor="article-title"
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサムネイル
        </label>
        {/* <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input> */}

        <DropImageZone/>

        <div className="flex justify-center mt-4">
        </div>
      </form>
    </div>
  );
}
