import { NextResponse } from "next/server";
import { testVideoBase64 } from "./testVideoData";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    return await fetch("http://localhost:80/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      video: testVideoBase64,
    });
  }
}
