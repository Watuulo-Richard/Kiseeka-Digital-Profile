import { Portfolio, User } from "@/lib/generated/prisma";
import { baseUrl } from "@/types/type";

export async function getUserById(id: string) {
    const userAPIRoute = `${baseUrl}/api/v1/signupAPI/${id}`
    try {
        const response = await fetch(userAPIRoute)
        const user = await response.json()
        // console.log(user, 'Finally Am In The System...👍🏾');
        return user.data as User
    } catch (error) {
        console.log(error);
        return null
    }
}


export async function getPortfolioById(id: string) {
    const profileAPIRoute = `${baseUrl}/api/v1/profileAPI/${id}`
    try {
        const response = await fetch(profileAPIRoute)
        const profile = await response.json()
        // console.log(profile, 'Finally Am In The System...👍🏾');
        return profile.data as Portfolio
    } catch (error) {
        console.log(error);
        return null
    }
}
const profileAPIRoute = `${baseUrl}/api/v1/profileAPI`
export async function getPortfolio() {
    try {
        const response = await fetch(profileAPIRoute)
        const profile = await response.json()
        // console.log(profile, 'Finally Portfolio In The System...👍🏾');
        return profile.data as Portfolio[]
    } catch (error) {
        console.log(error);
        return []
    }
}