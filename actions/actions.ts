import { baseUrl } from "@/types/type";
import { Education, Portfolio, Project, Skill, Testimonial, User, WorkExperience } from "@prisma/client";

export async function getUserById(id: string) {
    const userAPIRoute = `${baseUrl}/api/v1/signupAPI/${id}`
    try {
        const response = await fetch(userAPIRoute, { cache: 'no-store' })
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
        const response = await fetch(profileAPIRoute, { cache: 'no-store' })
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
        const response = await fetch(profileAPIRoute, { cache: 'no-store' })
        const profile = await response.json()
        // console.log(profile, 'Finally Portfolio In The System...👍🏾');
        return profile.data as Portfolio[]
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getUserPortfolio(id:string) {
    const profileAPIRoute = `${baseUrl}/api/v1/profileAPI/${id}`
    try {
        const response = await fetch(profileAPIRoute, { cache: 'no-store' })
        const profile = await response.json()
        console.log(profile, 'Finally Portfolio In The System...👍🏾');
        return profile.data as Portfolio
    } catch (error) {
        console.log(error);
        return null
    }
}

const workexperienceAPIRoute = `${baseUrl}/api/v1/workexperienceAPI`
export async function getWorkExperiences() {
    try {
        const response = await fetch(workexperienceAPIRoute, { cache: 'no-store' })
        const workExperiences = await response.json()
        // console.log(workExperiences.data, 'Finally Work Experiences Fetched Successfully...👍🏾');
        return workExperiences.data as WorkExperience[]
    } catch (error) {
        console.log(error);
        return []
    }
}
const educationAPIRoute = `${baseUrl}/api/v1/educationAPI`
export async function getEducationBackgroundAction() {
    try {
        const response = await fetch(educationAPIRoute, { cache: 'no-store' })
        const educationBackgrounds = await response.json()
        // console.log(educationBackgrounds.data, 'Finally Education Backgrounds Fetched Successfully...👍🏾');
        return educationBackgrounds.data as Education[]
    } catch (error) {
        console.log(error);
        return []
    }
}
const projectsAPIRoute = `${baseUrl}/api/v1/projectsAPI`
export async function getProjectsAction() {
    try {
        const response = await fetch(projectsAPIRoute, { cache: 'no-store' })
        const projects = await response.json()
        // console.log(projects.data, 'Finally Projects Fetched Successfully...👍🏾');
        return projects.data as Project[]
    } catch (error) {
        console.log(error);
        return []
    }
}
const testimonialAPIRoute = `${baseUrl}/api/v1/testimonialAPI`
export async function getTestimonialsAction() {
    try {
        const response = await fetch(testimonialAPIRoute, { cache: 'no-store' })
        const testimonials = await response.json()
        // console.log(testimonials.data, 'Finally Testimonials Fetched Successfully...👍🏾');
        return testimonials.data as Testimonial[]
    } catch (error) {
        console.log(error);
        return []
    }
}

const skillsAPIRoute = `${baseUrl}/api/v1/skillsAPI`
export async function getSkillsAction() {
    try {
        const response = await fetch(skillsAPIRoute, { cache: 'no-store' })
        const skills = await response.json()
        // console.log(skills.data, 'Finally Skills Fetched Successfully...👍🏾');
        return skills.data as Skill[]
    } catch (error) {
        console.log(error);
        return []
    }
}
export async function getWorkExperienceAction(id:string) {
    const workexperienceAPIRoute = `${baseUrl}/api/v1/workexperienceAPI/${id}`
    try {
        const response = await fetch(workexperienceAPIRoute, { cache: 'no-store' })
        const workExperience = await response.json()
        // console.log(workExperience.data, 'Finally Work Experience Fetched Successfully...👍🏾');
        return workExperience.data as WorkExperience
    } catch (error) {
        console.log(error);
        return null
    }
}
export async function getEducationAction(id:string) {
    const educationAPIRoute = `${baseUrl}/api/v1/educationAPI/${id}`
    try {
        const response = await fetch(educationAPIRoute, { cache: 'no-store' })
        const educationBackground = await response.json()
        // console.log(educationBackground.data, 'Finally Education Background Fetched Successfully...👍🏾');
        return educationBackground.data as Education
    } catch (error) {
        console.log(error);
        return null
    }
}
export async function getProjectAction(id:string) {
    const projectAPIRoute = `${baseUrl}/api/v1/projectsAPI/${id}`
    try {
        const response = await fetch(projectAPIRoute, { cache: 'no-store' })
        const project = await response.json()
        // console.log(project.data, 'Finally project Fetched Successfully...👍🏾');
        return project.data as Project
    } catch (error) {
        console.log(error);
        return null
    }
}
export async function getSkillAction(id:string) {
    const skillAPIRoute = `${baseUrl}/api/v1/skillsAPI/${id}`
    try {
        const response = await fetch(skillAPIRoute, { cache: 'no-store' })
        const skill = await response.json()
        console.log(skill.data, 'Finally Skill Fetched Successfully...👍🏾');
        return skill.data as Skill
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getTestimonialAction(id:string) {
    const testimonialAPIRoute = `${baseUrl}/api/v1/testimonialAPI/${id}`
    try {
        const response = await fetch(testimonialAPIRoute, { cache: 'no-store' })
        const testimonial = await response.json()
        console.log(testimonial.data, 'Finally testimonial Fetched Successfully...👍🏾');
        return testimonial.data as Testimonial
    } catch (error) {
        console.log(error);
        return null
    }
}