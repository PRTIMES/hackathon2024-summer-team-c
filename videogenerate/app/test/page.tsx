"use client";

import { useState } from "react";

type Article = {
  title: string;
  subtitle: string;
  content: string;
};

type Subtitle = {
  id: number;
  content: string;
};

type Props = {
  base64Image: string | null;
  setBase64Image: (value: string | null) => void;
}

export default function Test({base64Image}: Props) {
  const article1: Article = {
    title: "人工知能",
    subtitle: "AI",
    content: "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
  };

  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const getSubtitles = async (article: Article) => {
    try {
      const response = await fetch("/api/subtitles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });

      const data = await response.json();
      setSubtitles(data.subtitles);
      return data.subtitles;
    } catch (error) {
      console.error("Error fetching subtitles:", error);
    }
  };

  const getVideo = async (base64Image: string | null,subtitles: Subtitle[]) => {
    if (!base64Image) {
      console.error("Base64 image is not set");
      return;
    }
    if (!subtitles) {
      console.error("subtitles is not set");
      return;
    }


    const videoRequest = {
      base64Image,
      subtitles
    };

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoRequest),
      });

      const data = await response.json();
      setVideo(data.video);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <>
      <button onClick={async () => await getSubtitles(article1)} className="w-auto mt-4 bg-[#2a4b7a] text-white px-4 py-2 rounded-lg hover:bg-[#1E90FF]">
        Get Subtitles
      </button>
      <ul>
        {subtitles.map((subtitle) => (
          <li key={subtitle.id}>{subtitle.content} </li>
        ))}
      </ul>
      <button onClick={() => getVideo(base64Image,subtitles)} className="w-auto mt-4 bg-[#2a4b7a] text-white px-4 py-2 rounded-lg hover:bg-[#1E90FF]">Get Video</button>
      {video && (
        <video controls width="600">
          <source src={`${video}`} type="video/mp4" />
        </video>
      )}
    </>
  );
}
