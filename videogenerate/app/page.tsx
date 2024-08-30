"use client";
import ArticleForm from "@/components/ArticleForm";
//import Subtitle from "@/components/Subtitle";
//import Video from "@/components/Video";
import Snslink from "@/components/Snslink";
import Header from "@/components/Header";
import Result from "@/components/Result";
// import { SortableContext, arrayMove } from "@dnd-kit/sortable";
// import { DndContext } from "@dnd-kit/core";
// import { SortableItem } from "@/components/SortableItem";
// // import { SortableItemProp } from "./type/sortable";
//import Pvresult from "@/components/Pvresult";
import React, { useState } from 'react';
import Test from "./test/page";
import Explain from "@/components/Explain";

// Articleの型を定義します
export type ReleaseData = {
  title: string;
  subtitle: string;
  body: string;
  // その他のフィールドを必要に応じて追加してください
};

export type PvData = {
  page_view: string;
  unique_user: string;
  like: string;
  // その他のフィールドを必要に応じて追加してください
};


export default function Home() {
  const [data, setData] = useState<ReleaseData | null>(null); // Articleまたはnull
  const [pvdata, setPvdata] = useState<PvData | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  return (
    <>
      <Header />
      <Result data={data} setData={setData} pvdata={pvdata} setPvdata={setPvdata} />
      <Explain/>
      {!data && <ArticleForm data={data} base64Image={base64Image} setBase64Image={setBase64Image} />}
      {data && <ArticleForm data={data} base64Image={base64Image} setBase64Image={setBase64Image} />}
      {/*<Subtitle/>*/}
      {/*<Video/>*/}
      <Test data={data} base64Image={base64Image} setBase64Image={setBase64Image}/>
      <Snslink/>   
      {/*{data && <Pvresult data={data}/>} */}
    </>
  );
}
