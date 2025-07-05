import { baseUrl } from "@/types/type";
import { Portfolio } from "@prisma/client";

// Add revalidate time (in seconds) for ISR
const REVALIDATE_TIME = 60; // 1 minute

const profileAPIRoute = `${baseUrl}/api/v1/profileAPI/`
export async function getProfile() {
    try {
        const response = await fetch(profileAPIRoute, { next: { revalidate: REVALIDATE_TIME } })
        const fetchedProfile = await response.json()
        // console.log(profile, 'Finally Am In The System...👍🏾');
        return fetchedProfile.data as Portfolio[]
    } catch (error) {
        console.log(error);
        return []
    }
}