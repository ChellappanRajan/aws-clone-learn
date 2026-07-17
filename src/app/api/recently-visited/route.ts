import { getRecentlyVisitedServices } from "@/lib/aws-services";

export async function GET() {
  return Response.json({ services: getRecentlyVisitedServices() });
}
