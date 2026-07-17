import Link from "next/link";
import ServiceSearch from "@/components/ServiceSearch";

export default function TopNav() {
  return (
    <header className="flex items-center gap-4 border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-zinc-100">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 text-sm font-bold text-zinc-900">
          C
        </span>
        <span className="text-sm font-semibold tracking-wide">
          cloud<span className="text-orange-400">console</span>
        </span>
      </Link>

      <ServiceSearch />

      <nav className="ml-auto flex items-center gap-1 text-sm">
        <details className="relative">
          <summary className="list-none cursor-pointer rounded px-3 py-1.5 hover:bg-zinc-800">
            N. Virginia
          </summary>
          <ul className="absolute right-0 z-10 mt-1 w-48 rounded border border-zinc-700 bg-zinc-800 py-1 text-zinc-100 shadow-lg">
            <li className="px-3 py-1.5 hover:bg-zinc-700">
              US East (N. Virginia)
            </li>
            <li className="px-3 py-1.5 hover:bg-zinc-700">US West (Oregon)</li>
            <li className="px-3 py-1.5 hover:bg-zinc-700">EU (Ireland)</li>
            <li className="px-3 py-1.5 hover:bg-zinc-700">
              Asia Pacific (Mumbai)
            </li>
          </ul>
        </details>

        <details className="relative">
          <summary className="list-none cursor-pointer rounded px-3 py-1.5 hover:bg-zinc-800">
            Support
          </summary>
          <ul className="absolute right-0 z-10 mt-1 w-48 rounded border border-zinc-700 bg-zinc-800 py-1 text-zinc-100 shadow-lg">
            <li className="px-3 py-1.5 hover:bg-zinc-700">Documentation</li>
            <li className="px-3 py-1.5 hover:bg-zinc-700">Support center</li>
          </ul>
        </details>

        <details className="relative">
          <summary className="list-none cursor-pointer rounded px-3 py-1.5 hover:bg-zinc-800">
            learner-account
          </summary>
          <ul className="absolute right-0 z-10 mt-1 w-48 rounded border border-zinc-700 bg-zinc-800 py-1 text-zinc-100 shadow-lg">
            <li className="px-3 py-1.5 hover:bg-zinc-700">Account settings</li>
            <li className="px-3 py-1.5 hover:bg-zinc-700">Sign out</li>
          </ul>
        </details>
      </nav>
    </header>
  );
}
