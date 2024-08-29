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

// const INITIAL_ITEMS = [
//   { id: crypto.randomUUID(), name: "ソータブルアイテム　A" },
//   { id: crypto.randomUUID(), name: "ソータブルアイテム　B" },
//   { id: crypto.randomUUID(), name: "ソータブルアイテム　C" },
//   { id: crypto.randomUUID(), name: "ソータブルアイテム　D" },
//   { id: crypto.randomUUID(), name: "ソータブルアイテム　E" },
// ];

export default function Home() {
  const [data, setData] = useState(null);
  // const [items, setItems] = useState(INITIAL_ITEMS);

  return (
    <>
      <Header />
      <Result data={data} setData={setData} />
      {data && <ArticleForm data={data} />}
      {/*<Subtitle/>*/}
      {/*<Video/>*/}
      <Test />
      <Snslink />
      {/*{data && <Pvresult data={data}/>} */}
    </>
  );
}
