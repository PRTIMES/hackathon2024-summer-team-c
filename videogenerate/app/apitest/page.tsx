"use client";

import { useEffect, useState } from "react";
import { testBase64Image } from "./testImage";
// import { json } from "stream/consumers";

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

// type ReleaseData = {
//   id: string;
//   title: string;
//   content: string;
//   // その他のフィールドを必要に応じて追加してください
// };
export default function Page() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hackathon.stg-prtimes.net/api/companies/112/releases/1078", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c`,
      },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (data !== null) {
    const article1 = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.body,
    };
  }

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
  };

  const getVideo = async (thumbnail: string, subtitles: Subtitle[]) => {
    const req = {
      thumbnail: thumbnail,
      subtitles: subtitles,
    };
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    const { video } = await response.json();
    setVideo(video);
  };

  return (
    <div className="flex flex-col items-center">
      {data !== null && (
        <>
          <p>{JSON.stringify(data.title)}</p>
          <p>{JSON.stringify(data.subtitle)}</p>
          <button
            onClick={async () =>
              await getSubtitles({
                title: data.title,
                subtitle: data.subtitle,
                content: data.body,
              })
            }
          >
            Get Subtitles
          </button>
          <ul>
            {subtitles.map((subtitle) => (
              <li key={subtitle.id}>{subtitle.content} </li>
            ))}
          </ul>
        </>
      )}
      {subtitles.length > 0 && (
        <>
          <button onClick={() => getVideo(testBase64Image, subtitles)}>
            Get Video
          </button>
          {video && (
            <video controls width="600">
              <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
            </video>
          )}
        </>
      )}
    </div>
  );
}
