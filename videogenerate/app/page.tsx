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

// Articleの型を定義します
type ReleaseData = {
  id: string;
  title: string;
  content: string;
  // その他のフィールドを必要に応じて追加してください
};


export default function Home() {
  const [data, setData] = useState<ReleaseData | null>(null); // Articleまたはnull
  const [base64Image, setBase64Image] = useState<string | null>(null);

  return (
    <>
      <Header />
      <Result data={data} setData={setData} />
      {data && <ArticleForm data={data} base64Image={base64Image} setBase64Image={setBase64Image} />}
      {/*<Subtitle/>*/}
      {/*<Video/>*/}
      <Test base64Image={base64Image} setBase64Image={setBase64Image}/>
      <Snslink/>   
      {/*{data && <Pvresult data={data}/>} */}
    </>
  );
}
