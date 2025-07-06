import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '../ui/progress';
import { Skill } from '@prisma/client';

export default function Skills({ skills }: { skills: Skill[] }) {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        'JavaScript',
        'TypeScript',
        'React.js',
        'HTML/CSS',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'PHP', 'Laravel', 'Express.js', 'RESTful APIs'],
    },
    {
      category: 'Database',
      skills: ['MySQL', 'PostgreSQL', 'DynamoDB', 'MongoDB', 'Redis'],
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS', 'GitHub Actions', 'Travis-CI', 'Docker', 'CI/CD'],
    },
    {
      category: 'Tools & Methodologies',
      skills: ['Git', 'Agile', 'Scrum', 'JIRA', 'Figma'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Skills
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My expertise and technical proficiencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <Card className="h-full border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                    <div className="flex justify-between">
                      <div className="mt-2 md:my-2 flex flex-col md:items-start">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          Skill Percentage Level
                        </Badge>
                      </div>

                      <div className="">
                        <span className="gradient-text text-sm font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Progress value={skill.level} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <ul className="space-y-2">
                        <li className="flex items-start max-w-4xl">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">
                            {skill.description}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
