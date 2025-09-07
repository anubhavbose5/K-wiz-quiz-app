"use client";

import Image from "next/image";

type MediaRendererProps = {
  type?: "text" | "image" | "video" | "audio" | "youtube";
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function MediaRenderer({
  type,
  url,
  alt,
  width,
  height,
}: MediaRendererProps) {
  if (!type || !url || type === "text") return null;

  switch (type) {
    case "image":
      return (
        <div className="mt-4 flex justify-center">
          <Image
            src={url}
            alt={alt || "question media"}
            width={width || 800}
            height={height || 600}
            className="rounded-lg ai-glow object-contain"
            priority
          />
        </div>
      );

    case "video":
      return (
        <video
          controls
          preload="metadata"
          src={url}
          className="mt-4 max-h-80 w-full rounded-lg mx-auto ai-glow"
        >
          Your browser does not support the video tag.
        </video>
      );

    case "audio":
      return (
        <audio
          controls
          preload="metadata"
          src={url}
          className="mt-4 w-full rounded-lg ai-glow"
        >
          Your browser does not support the audio element.
        </audio>
      );

    case "youtube":
      // Supports YouTube embeds, responsive container
      return (
        <div className="mt-4 relative w-full max-w-2xl mx-auto ai-glow aspect-video">
          <iframe
            src={url}
            title="YouTube video"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );

    default:
      return null;
  }
}
