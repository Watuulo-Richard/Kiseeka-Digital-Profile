'use client';

import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import CardFlip from './card-flip';
import { RiTwitterXLine } from 'react-icons/ri';
import { Portfolio } from '@prisma/client';
import { TypewriterEffect } from '../ui/typewriter-effect';

export default function Hero({
  fetchedProfile,
}: {
  fetchedProfile: Portfolio;
}) {
  const words = [
  {
    text: "I'm ",
  },
  {
    text: `${fetchedProfile.title}`,
    className: "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
  },
  {
    text: 'Professional-Auditor.',
  },
];
  return (
    // <section id="home" className="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]">
    //   <div className="container px-4 md:px-6 mx-auto">
    //     <div className="flex flex-col items-center space-y-4 text-center justify-center md:flex md:flex-row md:justify-between md:text-start">

    //       <div className="w-full md:w-[70%]">
    //       <div className="space-y-2">
    //         <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
    //           Hi, I&apos;m <span className="gradient-text">Nihal Maskey</span>
    //         </h1>
    //         <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl md:text-start">
    //           <span className="js-only">
    //             <span>Senior Software Engineer</span>
    //           </span>
    //           <noscript>
    //             <span>Senior Software Engineer | Full Stack Developer | JavaScript Expert | AWS Specialist</span>
    //           </noscript>
    //         </p>
    //       </div>
    //       <div className="max-w-[700px] text-muted-foreground">
    //         <p className="text-lg">Building scalable, secure, and efficient systems with over 5 years of experience</p>
    //       </div>
    //       <div className="flex flex-col sm:flex-row gap-4 mt-6">
    //         <Button asChild size="lg" className="rounded-full">
    //           <Link href="#contact">Get In Touch</Link>
    //         </Button>
    //         <Button asChild variant="outline" size="lg" className="rounded-full">
    //           <a href="https://resume.nihal.com.np/nihal_maskey.pdf" target="_blank" rel="noopener noreferrer">
    //             <Download className="mr-2 h-4 w-4" /> Download Resume
    //           </a>
    //         </Button>
    //       </div>
    //       <div className="flex gap-4 mt-6">
    //         <Button variant="ghost" size="icon" asChild>
    //           <Link href="https://github.com/maskeynihal" target="_blank" rel="noopener noreferrer">
    //             <Github className="h-5 w-5" />
    //             <span className="sr-only">GitHub</span>
    //           </Link>
    //         </Button>
    //         <Button variant="ghost" size="icon" asChild>
    //           <Link href="https://linkedin.com/in/maskeynihal" target="_blank" rel="noopener noreferrer">
    //             <Linkedin className="h-5 w-5" />
    //             <span className="sr-only">LinkedIn</span>
    //           </Link>
    //         </Button>
    //         <Button variant="ghost" size="icon" asChild>
    //           <Link href="mailto:t3w4e0rdaf6f@opayq.com">
    //             <Mail className="h-5 w-5" />
    //             <span className="sr-only">Email</span>
    //           </Link>
    //         </Button>
    //       </div>

    //       </div>
    //       <div className="hidden md:block border border-yellow-600 h-full mx-4"></div>
    //       <div className="w-full md:w-[30%]">
    //       <CardFlip />
    //       </div>
    //     </div>
    //     <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block js-only">
    //       <Link
    //         href="#"
    //         onClick={(e) => {
    //           e.preventDefault()
    //           window.scrollTo({ top: 0, behavior: "smooth" })
    //         }}
    //       >
    //         <ArrowUpCircle className="h-10 w-10 text-primary animate-bounce" />
    //       </Link>
    //     </div>
    //   </div>
    // </section>
    <section
      id="home"
      className="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center justify-center md:flex-row md:justify-between md:text-start md:space-y-0">
          {/* Left Content */}
          <div className="w-full lg:w-[60%]">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                <TypewriterEffect words={words} />
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl md:text-start md:mx-0">
                <span className="js-only">
                  <span>Professional Auditor & ACCA Candidate</span>
                </span>
                <noscript>
                  <span>
                    Hi, I'm Kiseeka Pius Professional Auditor & ACCA Candidate
                    Delivering comprehensive audit solutions and ensuring
                    financial compliance with over 2 years of specialized
                    experience
                  </span>
                </noscript>
              </p>
            </div>

            <div className="max-w-[700px] text-muted-foreground mt-4">
              <p className="text-lg">
                Delivering comprehensive audit solutions and ensuring financial
                compliance with over 2 years of specialized experience
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#contact">Get In Touch</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full bg-transparent"
              >
                <a
                  href="https://www.papermark.com/view/cmcxe0mdn0001ie049oxs9mig"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>

            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://x.com/PiusKiseka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiTwitterXLine className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://www.linkedin.com/in/kiseka-pius-064b651a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:kisekapius45@gmail.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Attractive Gradient Border/Divider */}
          <div className="hidden md:flex items-center justify-center px-6 lg:px-8">
            <div className="relative">
              {/* Main gradient line */}
              <div className="w-px h-80 bg-gradient-to-b from-transparent via-primary to-transparent opacity-60"></div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/70 shadow-lg shadow-primary/25"></div>
              </div>

              {/* Top accent */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 rounded-full bg-primary/40"></div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 rounded-full bg-primary/40"></div>
              </div>
            </div>
          </div>

          {/* Mobile Divider */}
          <div className="md:hidden w-full flex justify-center py-4">
            <div className="relative">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 shadow-sm shadow-primary/25"></div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full flex justify-center lg:w-[40%]">
            <CardFlip />
          </div>
        </div>
      </div>
    </section>
  );
}
