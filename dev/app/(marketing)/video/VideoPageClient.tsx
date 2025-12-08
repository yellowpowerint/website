'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Video as VideoIcon, ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '@/components/sections/VideoPlayer';
import { MEDIA_VIDEOS, type MediaVideo } from '@/lib/constants/media';

const PAGE_SIZE = 9;

export function VideoPageClient() {
  const [selectedVideo, setSelectedVideo] = useState<MediaVideo | null>(null);
  const [displayedVideos, setDisplayedVideos] = useState<MediaVideo[]>(() =>
    MEDIA_VIDEOS.slice(0, Math.min(PAGE_SIZE, MEDIA_VIDEOS.length))
  );
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(MEDIA_VIDEOS.length > PAGE_SIZE);

  useEffect(() => {
    if (selectedVideo || !hasMore) return;

    const handleScroll = () => {
      if (isFetching || !hasMore) return;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        setIsFetching(true);
        // Simulate loading more videos by cycling through the existing list
        setTimeout(() => {
          setDisplayedVideos((prev) => {
            const nextStart = prev.length;
            const nextEnd = Math.min(nextStart + PAGE_SIZE, MEDIA_VIDEOS.length);
            const next = MEDIA_VIDEOS.slice(nextStart, nextEnd);
            const combined = [...prev, ...next];

            if (nextEnd >= MEDIA_VIDEOS.length) {
              setHasMore(false);
            }

            return combined;
          });
          setIsFetching(false);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedVideo, isFetching, hasMore]);

  const handleSelectVideo = (video: MediaVideo) => {
    setSelectedVideo(video);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Detail layout: main video on the left, upcoming videos on the right
  if (selectedVideo) {
    const sidebarVideos = MEDIA_VIDEOS.filter((video) => video.id !== selectedVideo.id);

    return (
      <div className="min-h-screen bg-[#0b1120] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all videos
          </button>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)] items-start">
            <div className="space-y-4">
              <VideoPlayer video={selectedVideo} autoplay />
            </div>

            <aside className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {sidebarVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelectVideo(video)}
                  className="group flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5"
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
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // Grid view: YouTube-style homepage with 3 videos per row and infinite scroll
  return (
    <div className="min-h-screen bg-[#0b1120] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <VideoIcon className="h-10 w-10 text-gold-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Video Gallery</h1>
              <p className="mt-1 text-sm md:text-base text-gray-300 max-w-2xl">
                Browse our latest videos. Scroll down to load more and click any thumbnail to watch
                it in a larger player.
              </p>
            </div>
          </div>
        </header>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video, index) => (
              <button
                key={`${video.id}-${index}`}
                type="button"
                onClick={() => handleSelectVideo(video)}
                className="group text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-800">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {video.duration && (
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold">
                      {video.duration}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-sm font-semibold text-gray-100 line-clamp-2 group-hover:text-gold-400">
                  {video.title}
                </h2>
                <p className="mt-1 text-xs text-gray-400">{video.category}</p>
              </button>
            ))}
          </div>

          {isFetching && (
            <div className="mt-6 text-center text-sm text-gray-400">Loading more videos...</div>
          )}
          {!isFetching && !hasMore && (
            <div className="mt-6 text-center text-sm text-gray-500">
              You have reached the end of the video list.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
