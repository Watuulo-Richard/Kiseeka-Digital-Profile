import { User } from "@/lib/generated/prisma";
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