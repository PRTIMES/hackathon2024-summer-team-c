"use client";

import { useState } from "react";

// type SubtitlesResponse = {
//   subtitles: Subtitle[];
// };

// type VideoResponse = {
//   video: string;
// };

type Article = {
  title: string;
  subtitle: string;
  content: string;
};

type Subtitle = {
  id: number;
  content: string;
};

export default function Test() {
  const article1 = {
    title: "人工知能",
    subtitle: "AI",
    content: "人工知能（AI）は、コンピュータが人間の知能を模倣する能力です。",
  };
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const getSubtitles = async (article: Article) => {
    const response = await fetch("/api/subtitles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });

    const { subtitles } = await response.json();
    setSubtitles(subtitles);
    return subtitles;
    // setSubtitles(subtitles);
  };

  const getVideo = async (subtiles: Subtitle[]) => {
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subtitles),
    });

    const { video } = await response.json();
    setVideo(video);
  };
  return (
    <>
      <button onClick={async () => await getSubtitles(article1)}>
        Get Subtitles
      </button>
      <ul>
        {subtitles.map((subtitle) => (
          <li key={subtitle.id}>{subtitle.content} </li>
        ))}
      </ul>
      <button onClick={() => getVideo(subtitles)}>Get Video</button>
      {video && (
        <video controls width="600">
          <source src={`${video}`} type="video/mp4" />
        </video>
      )}
    </>
  );
}
