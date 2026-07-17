import TopNav from "@/components/TopNav";
import RecentlyVisited from "@/components/RecentlyVisited";
import ServicesGrid from "@/components/ServicesGrid";
import { getRecentlyVisitedServices } from "@/lib/aws-services";

export default function Home() {
  const recentlyVisited = getRecentlyVisitedServices();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <TopNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Console Home
        </h1>
        <RecentlyVisited services={recentlyVisited} />
        <ServicesGrid />
      </main>
    </div>
  );
}
