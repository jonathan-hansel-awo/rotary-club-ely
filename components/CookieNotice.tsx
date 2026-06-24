/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_NOTICE_KEY = "rotary-ely-cookie-notice-seen";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenNotice = window.localStorage.getItem(COOKIE_NOTICE_KEY);

    if (!hasSeenNotice) {
      setIsVisible(true);
    }
  }, []);

  function handleOkay() {
    window.localStorage.setItem(COOKIE_NOTICE_KEY, "true");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white p-5 shadow-2xl ring-1 ring-slate-900/10 md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-rotary-blue">
            Cookies on this website
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            We use essential cookies and similar technologies to keep this
            website working properly. You can learn more in our Cookie Policy.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
          <Link
            href="/cookie-policy"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-rotary-blue hover:text-rotary-blue"
          >
            Learn more
          </Link>

          <button
            type="button"
            onClick={handleOkay}
            className="inline-flex items-center justify-center rounded-full bg-rotary-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rotary-blue-dark"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}