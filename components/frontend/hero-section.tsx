'use client';

import { motion, useAnimation, useInView, easeInOut } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Eye,
  Layers,
  MessageSquare,
  MousePointer,
  Play,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

export default function CreativeHeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Portfolio projects data
  const projects = [
    {
      title: 'Vibrant Motion',
      category: 'Animation',
      client: 'Pulse Media',
      image:
        'https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTHVquXxINGL43Bmkhwazp7exFWUt06ZryRuJ',
    },
    {
      title: 'Neon Dreams',
      category: 'Brand Identity',
      client: 'Synthwave Records',
      image:
        'https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoDZz9cM2OeWJqXBEQTpvwrsimgD836Ro5tMP4',
    },
    {
      title: 'Minimal Workspace',
      category: 'Web Design',
      client: 'Modern Office Co.',
      image:
        'https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo0viAEqC9zrNPR6UdE5o7kGZB2XgxhFWYS4cu',
    },
  ];

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Autoplay project carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden py-10"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 text-[#3f1c10] rounded-full text-sm font-medium mb-6 bg-[#f2b5a0]/40 backdrop-blur-3xl"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#3f1c10]"></span>
              <BookOpen className="w-4 h-4 mr-2" />
              Professional Insights & Analysis
            </motion.div>

            {/* Animated title */}
            <div className="mb-6 overflow-hidden">
              <motion.h1 className="flex flex-wrap tracking-tight text-4xl md:text-5xl font-bold text-[#f2b5a0] mb-6">
                Audit & Finance
                <span className="text-[#3f1c10] block">Insights Blog</span>
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Stay informed with the latest trends, best practices, and
              regulatory updates in auditing, financial reporting, and risk
              management from a seasoned professional.
            </motion.p>

            {/* Services */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-4 text-lg font-medium text-[#f2b5a0]/70">
                My Services
              </div>
              {/* Search Bar */}
              <div className="max-w-md relative border-2 border-[#f2b5a0] rounded-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f2b5a0] w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 py-3 text-lg text-[#f2b5a0] placeholder:text-[#f2b5a0]"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Content - Portfolio Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto h-[500px] max-w-md"
            >
              {/* Project cards */}
              <div className="relative h-full">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: activeProject === index ? 1 : 0.3,
                      x: 0,
                      rotateY: activeProject === index ? 0 : 5,
                      scale: activeProject === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveProject(index)}
                    className={`absolute left-0 top-0 h-full w-full cursor-pointer rounded-2xl bg-gray-900 transition-all ${
                      activeProject === index ? 'z-30' : 'z-10'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `perspective(1000px) rotateY(${
                        activeProject === index ? 0 : 5
                      }deg) scale(${activeProject === index ? 1 : 0.9})`,
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src={project.image || '/default-image.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 hover:scale-105"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 z-10 w-full p-6">
                        <div className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {project.category}
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm text-white/70">
                          Client: {project.client}
                        </p>

                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                            View Project
                            <ChevronRight className="h-3 w-3" />
                          </button>

                          <div className="flex items-center gap-3 text-xs text-white/70">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              2.4k
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              18
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project navigation */}
              <div className="absolute -bottom-12 left-1/2 z-10 flex -translate-x-1/2 gap-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeProject === index
                        ? 'w-8 bg-[#eb9a7e]'
                        : 'w-2 bg-[#f2b5a0]'
                    }`}
                    aria-label={`View project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -left-16 top-10 z-40 rounded-lg bg-white/40 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2b5a0] text-white">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-[#763a26]">
                    <div className="font-medium">Design Process</div>
                    <div className="text-[#763a26]">
                      Strategy → Design → Develop
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="absolute -right-10 bottom-20 z-40 rounded-lg bg-white/40 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/30 text-blue-400">
                    <MousePointer className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">Interactive</div>
                    <div className="text-white/70">Explore our portfolio</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
