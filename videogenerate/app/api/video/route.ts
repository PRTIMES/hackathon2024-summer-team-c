import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // リクエストボディを取得
    const data = await request.json();
    console.log(data);
    // console.log(JSON.stringify(data));
    // const data = { thumbnail: "test" };

    return await fetch("http://localhost:80/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // エラーハンドリング
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
