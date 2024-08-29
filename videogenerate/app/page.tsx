"use client";
import ArticleForm from "@/components/ArticleForm";
import Subtitle from "@/components/Subtitle";
import Video from "@/components/Video";
import Link from "@/components/Link";
import Header from "@/components/Header";
import Result from "@/components/Result";
/*import Pvresult from "@/components/Pvresult";*/
import React, { useState } from 'react';


export default function Home() {
  const [data, setData] = useState(null);
  return (
    <>
      <Header/>
      <Result data={data} setData={setData} />
      {data && <ArticleForm data={data}/>}
      <Subtitle/>
      <Video/>
      <Link/>   
      {/*{data && <Pvresult data={data}/>} */}
    </>
  );
}
