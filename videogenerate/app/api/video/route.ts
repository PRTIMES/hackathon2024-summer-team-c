import { testVideoBase64 } from "./testVideoData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subtitles = url.searchParams.get("subtitles");

  // クエリパラメータが存在しない場合のエラーハンドリング
  if (!subtitles) {
    return new Response('Query parameter "subtitles" is required', {
      status: 400,
    });
  }
  return Response.json({
    video: testVideoBase64,
  });
}
