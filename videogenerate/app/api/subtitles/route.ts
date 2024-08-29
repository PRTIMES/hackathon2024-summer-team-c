import { NextResponse } from "next/server";
import { testSubtitles } from "./testSubtitlesData";

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const data = await request.json();

    // 例: リクエストデータを処理する
    const { title, subtitle, content } = data;

    // 任意の処理 (例: データベースへの保存など)
    console.log(title, subtitle, content);

    // レスポンスを返す
    return Response.json({
      subtitles: testSubtitles,
    });
  } catch (error) {
    // エラーハンドリング
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
