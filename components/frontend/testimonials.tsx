'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-[#fbebe5] dark:bg-transparent p-1 py-0.5 font-bold text-[#F2B5A0]',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
        // theme styles
        'border border-border bg-card/50 shadow-sm',
        // hover effect
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-muted-foreground">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-[#3f1c10] dark:fill-[#F2B5A0] text-[#3f1c10] dark:text-[#F2B5A0]" />
          <Star className="size-4 fill-[#3f1c10] dark:fill-[#F2B5A0] text-[#3f1c10] dark:text-[#F2B5A0]" />
          <Star className="size-4 fill-[#3f1c10] dark:fill-[#F2B5A0] text-[#3f1c10] dark:text-[#F2B5A0]" />
          <Star className="size-4 fill-[#3f1c10] dark:fill-[#F2B5A0] text-[#3f1c10] dark:text-[#F2B5A0]" />
          <Star className="size-4 fill-[#3f1c10] dark:fill-[#F2B5A0] text-[#3f1c10] dark:text-[#F2B5A0]" />
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-5">
        <img
          width={40}
          height={40}
          src={img || ''}
          alt={name}
          className="size-10 rounded-full ring-1 ring-[#F2B5A0] ring-offset-2"
        />

        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-xs font-normal text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
const testimonials = [
  {
    name: 'Watuulo Richard',
    role: 'Full-Stack Developer at Desishub',
    img: './testimonial-one.jpg',
    description: (
      <p>
        Kiseka Pius is one of the most hardworking individuals I have known since our high school years. His discipline, focus, and commitment to excellence have consistently set him apart.
        <Highlight>
          Now serving as an Auditor at PKF Uganda, he continues to demonstrate professionalism, integrity, and strong analytical skills.
        </Highlight>{' '}
        I highly regard his work ethic and dedication.
      </p>
    ),
  },
  {
    name: 'Nalwoga Hildah Betty',
    role: 'Auditor at PKF Uganda',
    img: './testimonial-two.jpeg',
    description: (
      <p>
        Kiseka Pius is a highly dedicated and dependable professional at PKF Uganda. He approaches his work with a strong sense of responsibility, attention to detail, and a clear commitment to maintaining high audit standards.
        <Highlight>
          Pius demonstrates strong analytical and problem-solving skills, enabling him to handle complex audit tasks with accuracy and efficiency. He is well-organized, proactive, and able to work effectively under pressure while maintaining professionalism and ethical conduct at all times.
        </Highlight>{' '}
        Beyond his technical competence, Pius is a supportive and collaborative colleague. He communicates clearly, works well within teams, and contributes positively to a productive work environment.
      </p>
    ),
  },
  {
    name: 'Umuhoza Gift',
    role: 'Auditor at PKF Uganda',
    img: './testimonial-three.jpeg',
    description: (
      <p>
        Kiseka Pius is a highly dependable and hardworking professional at PKF Uganda. He is detail-oriented, disciplined, and consistently demonstrates strong analytical skills in his audit work.
        <Highlight>Pius approaches his responsibilities with integrity and professionalism, and he is a reliable team player who contributes positively to both team outcomes and client engagements.</Highlight> In addition to his technical competence, Pius is a reliable team player who collaborates well with colleagues.
      </p>
    ),
  },
  {
    name: 'Zoe Bennett',
    role: 'UX Architect at Fusion Systems',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: (
      <p>
        NexaUI&apos;s attention to detail is impressive.
        <Highlight>
          The micro-interactions and animations create a polished experience.
        </Highlight>{' '}
        It&apos;s become our go-to solution for client projects with tight
        deadlines.
      </p>
    ),
  },
  {
    name: 'Victor Nguyen',
    role: 'Product Lead at FinEdge',
    img: 'https://randomuser.me/api/portraits/men/55.jpg',
    description: (
      <p>
        Our financial dashboard needed a complete overhaul, and NexaUI
        delivered.
        <Highlight>
          The data visualization components are both beautiful and functional.
        </Highlight>{' '}
        User engagement has increased by 47% since the redesign.
      </p>
    ),
  },
  {
    name: 'Amara Johnson',
    role: 'Frontend Specialist at Nimbus Tech',
    img: 'https://randomuser.me/api/portraits/women/67.jpg',
    description: (
      <p>
        The documentation for NexaUI is exceptional.
        <Highlight>
          I was able to implement complex UI patterns in just a few hours.
        </Highlight>{' '}
        The TypeScript support is also a major productivity booster.
      </p>
    ),
  },
  {
    name: 'Leo Tanaka',
    role: 'Creative Technologist at Prism Agency',
    img: 'https://randomuser.me/api/portraits/men/78.jpg',
    description: (
      <p>
        NexaUI has the perfect balance of flexibility and structure.
        <Highlight>
          We can maintain brand consistency while still creating unique
          experiences.
        </Highlight>{' '}
        Our clients are consistently impressed with the results.
      </p>
    ),
  },
  {
    name: 'Sophia Martinez',
    role: 'E-commerce Director at StyleHub',
    img: 'https://randomuser.me/api/portraits/women/89.jpg',
    description: (
      <p>
        Our conversion rates have increased by 28% since implementing NexaUI.
        <Highlight>
          The checkout flow components are optimized for both desktop and
          mobile.
        </Highlight>{' '}
        The dark mode support was also a huge hit with our customers.
      </p>
    ),
  },
  {
    name: 'Aiden Wilson',
    role: 'Healthcare Solutions Architect',
    img: 'https://randomuser.me/api/portraits/men/92.jpg',
    description: (
      <p>
        NexaUI&apos;s accessibility features were crucial for our healthcare
        platform.
        <Highlight>
          We passed compliance requirements with minimal additional work.
        </Highlight>{' '}
        The form components are especially well-designed for complex data entry.
      </p>
    ),
  },
  {
    name: 'Olivia Chen',
    role: 'EdTech Product Manager at LearnSphere',
    img: 'https://randomuser.me/api/portraits/women/29.jpg',
    description: (
      <p>
        Our educational platform needed to work for students of all ages and
        abilities.
        <Highlight>
          NexaUI&apos;s inclusive design principles made this possible without
          compromise.
        </Highlight>{' '}
        The interactive components have significantly improved student
        engagement.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <section className="overflow-x-hidden container relative py-5">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-20 z-10 h-64 w-64 rounded-full bg-[#fbebe5] dark:bg-black blur-3xl" />
      <div className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-[#fbebe5] dark:bg-black blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-center text-4xl font-bold leading-[1.2] tracking-tighter text-foreground md:text-5xl">
          What Clients & Colleagues Are Saying
        </h2>
        <h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-muted-foreground">
          Don&apos;t just take our word for it. Here&apos;s what{' '}
          <span className="bg-gradient-to-r from-[#3f1c10] to-[#F2B5A0] bg-clip-text text-transparent">
             clients, partners, and colleagues
          </span>{' '}
          are saying about working with{' '}
          <span className="font-semibold text-[#F2B5A0]">Kiseka Pius, Auditor at PKF Uganda.</span>
        </h3>
      </motion.div>

      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  '[--duration:60s]': i === 1,
                  '[--duration:30s]': i === 2,
                  '[--duration:70s]': i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-[#fbebe5] dark:from-black from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-[#fbebe5] dark:from-black from-20%"></div>
      </div>
    </section>
  );
}
