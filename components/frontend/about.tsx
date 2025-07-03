import { Card, CardContent } from '@/components/ui/card';
import { Code2, Globe, Server, Users } from 'lucide-react';
import Globe1 from './globe-component';

export default function About() {
  const features = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: 'Full Stack Development',
      description:
        'Expertise in JavaScript, TypeScript, React.js, Node.js, and Laravel',
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: 'Cloud Solutions',
      description:
        'Proficient with AWS services including SQS, EventBridge, Lambda, and Step Functions',
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Team Leadership',
      description:
        'Led diverse teams of 15+ members across development, design, DevOps, and QA',
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: 'Global Collaboration',
      description:
        'Coordinated with remote teams across the US, Australia, and Nepal',
    },
  ];

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-10 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-12">
              <div className="flex-1 lg:w-[60%]">
                <div className="space-y-4 text-center md:text-start">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    About Me
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:mx-0 md:text-start md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Experienced Senior Software Engineer with over five years of
                    expertise as a Full Stack Developer, specializing in
                    JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.
                  </p>
                </div>

                <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-start mt-6">
                  <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    Skilled in designing scalable, secure, and efficient
                    systems, with a proven track record of collaborating with
                    remote, cross-functional teams across the US, Australia, and
                    Nepal. Demonstrated success in delivering impactful
                    solutions within highly regulated environments, including
                    healthcare projects, with expertise in HIPAA and SOC2
                    compliance. Proficient in optimizing system performance and
                    mentoring teams to achieve sustained technical excellence.
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 lg:w-[40%] flex justify-center lg:justify-end">
                <div className="w-full max-w-md lg:max-w-none">
                  <Globe1 />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
