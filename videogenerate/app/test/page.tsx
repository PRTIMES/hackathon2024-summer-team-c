"use client";

import { useState } from "react";
// sortable
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { SortableItem } from "@/components/SortableItem";
// import { SortableItemProp } from "./type/sortable";

// type SubtitlesResponse = {
//   subtitles: Subtitle[];
// };

// type VideoRequest = {
//   thumbnail: string,
//   subtitles: Subtitle[]
// }

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
  };

  const getVideo = async (thumbnail: string, subtitles: Subtitle[]) => {
    const videoRequest = {
      thumbnail,
      subtitles
    }
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoRequest),
    });

    const { video } = await response.json();
    setVideo(video);
  };

  return (
    <>
      <button onClick={async () => await getSubtitles(article1)}>
        Get Subtitles
      </button>
      {/* <ul>
        {subtitles.map((subtitle) => (
          <li key={subtitle.id}>{subtitle.content} </li>
        ))}
      </ul> */}

      <div>
        <DndContext
          onDragEnd={(event) => {
            const { active, over } = event;
            if (over == null) {
              return;
            }
            if (active.id !== over.id) {
              setSubtitles((subtitles) => {
                const oldIndex = subtitles.findIndex(
                  (subtitle) => subtitle.id === active.id
                );
                const newIndex = subtitles.findIndex(
                  (subtitle) => subtitle.id === over.id
                );
                return arrayMove(subtitles, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext items={subtitles}>
            <div>
              {subtitles.map((subtitle) => (
                <div className="border m-3">
                  <SortableItem
                    id={subtitle.id}
                    content={subtitle.content}
                    key={subtitle.id}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="text-red-500">{JSON.stringify(subtitles)}</div>
      </div>

      <button onClick={() => getVideo("thumbnailBase64", subtitles)}>
        Get Video
      </button>
      {video && (
        <video controls width="600">
          <source src={`${video}`} type="video/mp4" />
        </video>
      )}
    </>
  );
}
