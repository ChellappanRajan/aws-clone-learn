"use client";

import { useEffect, useState } from "react";
import { AwsService } from "@/lib/aws-services";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AwsService[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetch(`/api/services?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data: { services: AwsService[] }) => setResults(data.services))
        .catch((error) => {
          if (error.name !== "AbortError") console.error(error);
        });
    }, 200);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <label htmlFor="service-search" className="sr-only">
        Search for services
      </label>
      <input
        id="service-search"
        type="search"
        value={query}
        onChange={(event) => {
          const value = event.target.value;
          setQuery(value);
          if (!value.trim()) setResults([]);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder="Search for services"
        className="w-full rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
      {isOpen && query.trim() && (
        <ul className="absolute z-10 mt-1 w-full max-h-80 overflow-y-auto rounded border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
              No services match &ldquo;{query}&rdquo;
            </li>
          ) : (
            results.map((service) => (
              <li
                key={service.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <ServiceIcon service={service} />
                <div className="min-w-0">
                  <p className="truncate text-sm text-zinc-900 dark:text-zinc-100">
                    {service.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {service.category}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
