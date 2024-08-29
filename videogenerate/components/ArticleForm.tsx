"use client";
import React, { useState } from 'react';

export default function ArticleForm({data}) {

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
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のタイトル
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <input
              id="article-title"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Leave a comment..."
            />
            {data && (
              <h2>{data.title}</h2>
            )}
        </div>

        <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサブタイトル
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <input
              id="article-title"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Leave a comment..."
            />
            {data && (
              <h2>{data.subtitle}</h2>
            )}
        </div>

        <label
          htmlFor="article-body"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事の内容
        </label>
        <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <input
              id="article-title"
              className="w-full bg-transparent border-none outline-none"
              placeholder="Leave a comment..."
            />
            {data && (
              <h2>{data.body}</h2>
            )}
        </div>

        <label
          htmlFor="article-title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサムネイル
        </label>
        <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          生成
        </button>
      </form>
    </div>
  );
}
