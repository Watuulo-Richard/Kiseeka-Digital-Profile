import axios from "axios";

const serverBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXTAUTH_URL ||
  "http://localhost:3000";

const baseAPI = axios.create({
  baseURL:
    typeof window === "undefined" ? `${serverBaseUrl}/api/v1` : "/api/v1",
  headers: {
    "Content-Type": "application/json",
    // ✅ HTTP cache-busting header — works on both client and server
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Pragma": "no-cache",
  },
});

export { baseAPI };