import ArticleForm from "@/components/ArticleForm";
import Subtitle from "@/components/Subtitle";
import Video from "@/components/Video";
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
