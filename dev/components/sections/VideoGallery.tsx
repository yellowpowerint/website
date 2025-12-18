"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MEDIA_VIDEOS, type MediaVideo } from "@/lib/constants/media";

const MAIN_VIDEO_SUMMARY = `This field video captures laser monitoring work in progress as coordinates are taken at the Benso site. It highlights the practical setup on location, the measurement workflow, and the coordination required to record accurate points efficiently.

By documenting the process from the ground, the clip gives a clear view of how on-site teams collect and verify coordinate information to support safe, well-planned operations.`;

function getSummaryForVideo(video: MediaVideo): string {
  if (video.id === "vid-001") {
    return MAIN_VIDEO_SUMMARY;
  }
  return video.description;
}

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<MediaVideo>(MEDIA_VIDEOS[0]);

  const handleSelectVideo = (video: MediaVideo) => {
    setSelectedVideo(video);
  };

  return (
    <section className="py-16 bg-[#0b1120] text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Video Gallery</h2>
            <p className="mt-2 text-sm md:text-base text-gray-300 max-w-2xl">
              Watch highlights from our operations, equipment demonstrations, project stories, and
              community initiatives across West Africa.
            </p>
          </div>
          <Link
            href="/video"
            className="hidden md:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-semibold"
          >
            Watch more videos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)] items-start">
          {/* Main video area */}
          <div className="space-y-4">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="relative aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                {selectedVideo.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-400">
                <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 font-medium">
                  {selectedVideo.category}
                </span>
                {selectedVideo.duration && (
                  <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1">
                    Duration: {selectedVideo.duration}
                  </span>
                )}
                <span>
                  Published {new Date(selectedVideo.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Scrollable summary */}
              <div className="mt-2 bg-white/5 border border-white/10 rounded-lg p-4 max-h-48 md:max-h-56 overflow-y-auto text-sm leading-relaxed text-gray-100">
                {getSummaryForVideo(selectedVideo)
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-3" : undefined}>
                      {paragraph}
                    </p>
                  ))}
              </div>

              <Link
                href="/video"
                className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-semibold mt-3"
              >
                Watch more videos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar video list */}
          <aside className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4">More videos</h3>
            <div className="space-y-3 overflow-y-auto max-h-[460px] pr-2">
              {MEDIA_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelectVideo(video)}
                  className={`group flex w-full gap-3 rounded-xl p-2 text-left transition-colors ${
                    video.id === selectedVideo.id ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 1024px) 40vw, 160px"
                    />
                    {video.duration && (
                      <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold">
                        {video.duration}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2 group-hover:text-gold-400">
                      {video.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{video.category}</p>
                  </div>
                </button>
              ))}
            </div>

            <Link
              href="/video"
              className="mt-4 inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-sm font-semibold"
            >
              Watch more videos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
