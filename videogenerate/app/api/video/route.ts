import { testVideoBase64 } from "./testVideoData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const data = await request.json();
    console.log(data);

    // 例: リクエストデータを処理する
    const { thumbnail, subtitles } = data;
    console.log(thumbnail, subtitles);

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
