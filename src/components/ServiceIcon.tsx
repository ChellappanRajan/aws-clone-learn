import { AwsService, CATEGORY_COLORS } from "@/lib/aws-services";

export default function ServiceIcon({ service }: { service: AwsService }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded text-xs font-bold text-white ${CATEGORY_COLORS[service.category]}`}
      aria-hidden="true"
    >
      {service.shortName.slice(0, 3)}
    </span>
  );
}
