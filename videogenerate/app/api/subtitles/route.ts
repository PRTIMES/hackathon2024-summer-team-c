export async function GET(request: Request) {
  const url = new URL(request.url);
  const content = url.searchParams.get("content");

  // クエリパラメータが存在しない場合のエラーハンドリング
  if (!content) {
    return new Response('Query parameter "content" is required', {
      status: 400,
    });
  }
  return Response.json({
    subtitles: [
      `${content}`,
      "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
      "学習、推論、問題解決、理解、生成などのタスクが含まれます。",
      "AI技術は、医療、金融、製造、交通などで応用されています。",
      "特に、機械学習とディープラーニングの進歩が重要です。",
      "AIは急速に進化し、より高度な自動化と効率化を実現しています。",
      "これにより、社会全体に大きな影響を与えています。",
    ],
  });
}
