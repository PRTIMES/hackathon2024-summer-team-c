"use client";
import ArticleForm from "@/components/ArticleForm";
//import Subtitle from "@/components/Subtitle";
//import Video from "@/components/Video";
import Snslink from "@/components/Snslink";
import Header from "@/components/Header";
import Result from "@/components/Result";
//import Pvresult from "@/components/Pvresult";
import React, { useState } from 'react';
import Test from "./test/page";


export default function Home() {
  const [data, setData] = useState(null);
  return (
    <>
      <Header/>
      <Result data={data} setData={setData} />
      {data && <ArticleForm data={data}/>}
      {/*<Subtitle/>*/}
      {/*<Video/>*/}
      <Test/>
      <Snslink/>   
      {/*{data && <Pvresult data={data}/>} */}
    </>
  );
}
