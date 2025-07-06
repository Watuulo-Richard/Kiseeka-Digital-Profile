import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Skills from "./skills"
import { Skill, WorkExperience } from "@prisma/client"
import { format } from 'date-fns';

export default function Experience({fetchedWorkExperiences, skills}:{fetchedWorkExperiences:WorkExperience[], skills:Skill[]}) {
  const formatDate = (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMM dd, yyyy');
    };
  const experiences = [
    {
      title: "Lead Engineer",
      company: "Leapfrog Technology / Trayt Health",
      period: "Jan 2025 - Present",
      location: "Kathmandu, Nepal",
      achievements: [
        "Leading the engineering team in developing innovative healthcare solutions for Trayt Health",
        "Architecting scalable and secure systems for handling sensitive healthcare data",
        "Implementing advanced AWS infrastructure for high availability and compliance",
        "Mentoring junior engineers and establishing best practices for code quality and security",
        "Collaborating with product and design teams to deliver exceptional user experiences",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "Leapfrog Technology / Trayt Health",
      period: "July 2023 - Jan 2025",
      location: "Kathmandu, Nepal",
      achievements: [
        "Coordinated development efforts with remote teams across the US, Australia, and Nepal to deliver complex healthcare solutions for Trayt Health",
        "Reduced the frontend bundle size by 20% through advanced optimization techniques",
        "Optimized backend API performance, achieving over 200% faster response times",
        "Leveraged AWS services (SQS, EventBridge, Lambda, Step Functions) to automate critical tasks",
        "Mentored and coached team members, accelerating onboarding and enhancing team productivity",
      ],
    },
    {
      title: "Software Engineer",
      company: "Leapfrog Technology",
      period: "Sep 2021 - July 2023",
      location: "Kathmandu, Nepal",
      achievements: [
        "Led and managed a diverse software development team comprising over 15 members",
        "Designed and implemented solutions that consistently exceeded performance benchmarks",
        "Streamlined project planning by working closely with product owners",
        "Orchestrated the successful release of major application versions",
        "Emerged as the primary point of contact for both project stakeholders and management",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "Leapfrog Technology",
      period: "Sep 2020 - Sep 2021",
      location: "Kathmandu, Nepal",
      achievements: [
        "Collaborated with senior developers and product owners to deliver high-quality applications",
        "Employed a meticulous approach to debugging code and identifying root causes of issues",
        "Contributed to system improvement efforts by conducting thorough system analysis",
        "Played a pivotal role in enhancing system performance through strategic optimization",
        "Innovatively designed and developed a browser extension, streamlining workflow processes",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "Leapfrog Technology",
      period: "Jun 2020 - Sep 2020",
      location: "Kathmandu, Nepal",
      achievements: [
        "Acquired proficiency in JavaScript and harnessed the browser canvas API",
        "Recreated Pac-man game with vanilla JS while integrating various path-finding algorithms",
        "Successfully delved into backend development with Node.js and honed frontend skills with React.js",
      ],
    },
    {
      title: "Web Application Developer",
      company: "Technorio Inc.",
      period: "Jan 2019 - Jun 2020",
      location: "Kathmandu, Nepal",
      achievements: [
        "Delivered projects across diverse industries, including insurance management, video streaming, and ticket management",
        "Collaborated closely with the business development team, offering engineering insights",
        "Utilized GitHub actions to automate deployment pipelines",
        "Applied server deployment expertise to successfully launch a range of web applications",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {fetchedWorkExperiences.map((experience, index) => (
              <div key={index} className="timeline-item">
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{experience.position}</h3>
                        <p className="text-muted-foreground">{experience.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {formatDate(experience.startDate)}
                        </Badge>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {/* {experience.achievements.map((achievement, i) => ( */}
                        <li className="flex items-start max-w-4xl">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">{experience.description}</span>
                        </li>
                      {/* ))} */}
                    </ul>
                    <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                      <Badge variant="outline" className="text-sm text-muted-foreground mb-1 md:mb-0">
                        Ended on {experience.endDate ? formatDate(experience.endDate) : ''}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mt-20" id="skills">
            <Skills skills={skills}/>
          </div>
        </div>
      </div>
    </section>
  )
}
