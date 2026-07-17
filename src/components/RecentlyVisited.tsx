import { AwsService } from "@/lib/aws-services";
import ServiceIcon from "@/components/ServiceIcon";

export default function RecentlyVisited({
  services,
}: {
  services: AwsService[];
}) {
  if (services.length === 0) return null;

  return (
    <section aria-labelledby="recently-visited-heading">
      <h2
        id="recently-visited-heading"
        className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        Recently visited
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <li
            key={service.id}
            className="flex items-center gap-3 rounded border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <ServiceIcon service={service} />
            <span className="truncate text-sm text-zinc-900 dark:text-zinc-100">
              {service.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
