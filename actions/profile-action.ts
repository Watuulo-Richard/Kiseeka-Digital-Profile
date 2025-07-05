import { baseUrl } from "@/types/type";
import { Portfolio } from "@prisma/client";

const profileAPIRoute = `${baseUrl}/api/v1/profileAPI/`
export async function getProfile() {
    try {
        const response = await fetch(profileAPIRoute, { cache: 'no-store' })
        const fetchedProfile = await response.json()
        // console.log(profile, 'Finally Am In The System...👍🏾');
        return fetchedProfile.data as Portfolio[]
    } catch (error) {
        console.log(error);
        return []
    }
}