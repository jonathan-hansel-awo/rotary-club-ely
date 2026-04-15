/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // User cancelled — no action needed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-grey-200 px-4 py-2.5 text-sm font-medium text-grey-700 transition-all hover:border-rotary-blue hover:text-rotary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      Share this event
    </button>
  );
}