export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authoptions";
import HomeContent from "@/components/frontend/home-content";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  return <HomeContent isAdmin={isAdmin} />;
}