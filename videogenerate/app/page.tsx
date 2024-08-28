import ArticleForm from "@/components/ArticleForm";
import Subtitle from "@/components/subtitle";
import Video from "@/components/video";
import Link from "@/components/Link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header/>
      <ArticleForm />
      <Video/>
      <Link/>
      <Subtitle/>
    </>
  );
}