import { getLandingPageData } from "@/lib/data-fetcher";
import HomeClient from "@/components/HomeClient";

// This is a Server Component
export default async function Home() {
  // Fetch data directly on the server
  const data = await getLandingPageData();

  // Pass data to the Client Component
  return <HomeClient data={data} />;
}
