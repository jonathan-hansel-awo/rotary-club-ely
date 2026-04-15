"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  "All",
  "Aquafest",
  "Fireworks",
  "Community",
  "Social",
  "Fundraising",
  "Other",
];
const STATUSES = ["All", "Upcoming", "Past"];

export default function EventFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "All";
  const activeStatus = searchParams.get("status") || "All";

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === "All") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params.toString();
    },
    [searchParams],
  );

  const handleCategory = (category: string) => {
    router.push(`${pathname}?${createQueryString({ category })}`, {
      scroll: false,
    });
  };

  const handleStatus = (status: string) => {
    router.push(`${pathname}?${createQueryString({ status })}`, {
      scroll: false,
    });
  };

  return (
    <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-grey-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold
                  ${
                    activeCategory === category
                      ? "bg-rotary-gold text-grey-900 shadow-sm"
                      : "bg-grey-100 text-grey-700 hover:bg-grey-200"
                  }
                `}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Status toggle */}
          <div className="flex gap-2 shrink-0">
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => handleStatus(status)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold
                  ${
                    activeStatus === status
                      ? "bg-rotary-blue text-white shadow-sm"
                      : "bg-grey-100 text-grey-700 hover:bg-grey-200"
                  }
                `}
                aria-pressed={activeStatus === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
