import { testVideoBase64 } from "./testVideoData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const data = await request.json();

    // 例: リクエストデータを処理する
    const { subtitles } = data;
    console.log(subtitles);

    return NextResponse.json({
      video: testVideoBase64,
    });
  } catch (error) {
    // エラーハンドリング
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
