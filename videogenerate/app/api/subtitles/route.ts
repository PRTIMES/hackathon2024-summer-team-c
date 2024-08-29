import { NextResponse } from "next/server";
import { testSubtitles } from "./testSubtitlesData";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    return await fetch("http://localhost:80/subtitles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      subtitles: testSubtitles,
    });
  }
}
