import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Education } from '@prisma/client';
import { GraduationCap } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function EducationBackground({
  educationBackgrounds,
}: {
  educationBackgrounds: Education[];
}) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };
  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Education
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mx-auto">
            {educationBackgrounds.map((educationBackground) => {
              return (
                <Card key={educationBackground.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-primary/10 p-6 flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {educationBackground.educationLevel}
                        </h3>
                        <p className="text-muted-foreground">
                          {educationBackground.institution}
                        </p>
                        <div className="mt-2 md:mt-0 flex flex-col md:items-start">
                          <div className="flex flex-col md:flex md:flex-row gap-2 md:gap-4">
                            <Badge variant="outline" className="mb-1 md:mb-0">
                              {formatDate(educationBackground.startDate || '')}
                            </Badge>
                            <span className="hidden lg:block md:gradient-text text-sm">to</span>
                            <Badge variant="outline" className="mb-1 md:mb-0">
                              {educationBackground.endDate
                                ? formatDate(educationBackground.endDate)
                                : ''}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground">
                        {educationBackground.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
