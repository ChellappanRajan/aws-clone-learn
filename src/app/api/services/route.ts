import { NextRequest } from "next/server";
import { getAllServices, searchServices } from "@/lib/aws-services";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const services = query.trim() ? searchServices(query) : getAllServices();
  return Response.json({ services });
}
