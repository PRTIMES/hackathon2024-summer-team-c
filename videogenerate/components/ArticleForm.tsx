"use client";
import DropImageZone from "./DropImageZone";
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
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
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
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
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
          className="block my-2.5 text-sm font-medium text-gray-900 dark:text-white"
        >
          記事のサムネイル
        </label>
        {/* <input
          id="article-title"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Leave a comment..."
        ></input> */}

        <DropImageZone />

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="text-white bg-[#317EC6] hover:bg-[#2163a8] focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            生成
          </button>
        </div>
      </form>
    </div>
  );
}