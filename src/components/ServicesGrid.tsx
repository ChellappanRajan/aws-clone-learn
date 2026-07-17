import { getServicesByCategory } from "@/lib/aws-services";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServicesGrid() {
  const groups = getServicesByCategory();

  return (
    <section aria-labelledby="all-services-heading">
      <h2
        id="all-services-heading"
        className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        All services
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ category, services }) => (
          <div
            key={category}
            className="rounded border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {category}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id} className="flex items-center gap-3">
                  <ServiceIcon service={service} />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-zinc-900 dark:text-zinc-100">
                      {service.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {service.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
