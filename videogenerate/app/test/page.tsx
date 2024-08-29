"use client";

import { useState } from "react";
// sortable
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { SortableItem } from "@/components/SortableItem";

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

export default function Test({ base64Image }: Props) {
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

  const getVideo = async (base64Image: string | null, subtitles: Subtitle[]) => {
    if (!base64Image) {
      console.error("Base64 image is not set");
      return;
    }
    if (!subtitles || subtitles.length === 0) {
      console.error("Subtitles are not set");
      return;
    }

    const videoRequest = {
      base64Image,
      subtitles,
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
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 p-32">
      <button
        onClick={async () => await getSubtitles(article1)}
        className="w-auto mt-4 text-white px-4 py-2 rounded-lg bg-black hover:bg-gray-500"
      >
        Get Subtitles
      </button>

      <div className="w-full">
        <DndContext
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over) {
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
                <div className="border m-3" key={subtitle.id}>
                  <SortableItem id={subtitle.id} content={subtitle.content} />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <button
        onClick={() => getVideo(base64Image, subtitles)}
        className="w-auto mt-4 text-white px-4 py-2 rounded-lg bg-black hover:bg-gray-500"
      >
        Get Video
      </button>

      {video && (
        <video controls width="600" className="mt-4">
          <source src={`${video}`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
