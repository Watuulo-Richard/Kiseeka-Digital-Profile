export const dynamic = 'force-dynamic'

import Hero from '@/components/frontend/hero';
import Blog from '@/components/frontend/blog';
import About from '@/components/frontend/about';
import Contact from '@/components/frontend/contact';
import Projects from '@/components/frontend/projects';
import Education from '@/components/frontend/education';
import Experience from '@/components/frontend/experience';
import Header from '@/components/frontend/header';
import ScrollToTop from '@/components/frontend/scroll-to-top';
import Testimonials from '@/components/frontend/testimonials';
import { getProfile } from '@/actions/profile-action';
import EducationBackground from '@/components/frontend/education';
import { getEducationBackgroundAction, getSkillsAction, getWorkExperiences } from '@/actions/actions';

// export const metadata: Metadata = {
//   title: 'Kiseeka Pius | Senior Auditor',
//   description:
//     'Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.',
// };

export default async function Home() {
  const fetchedProfile = await getProfile()
  const fetchedWorkExperiences = await getWorkExperiences()
  const skills = await getSkillsAction()
  const educationBackgrounds = await getEducationBackgroundAction()
  
  if (!fetchedProfile) {
    return null;
  }
  return (
    <div className="w-full">
      <Header />
      <Hero fetchedProfile={fetchedProfile[0]}/>
      <About fetchedProfile={fetchedProfile[0]}/>
      <Experience fetchedWorkExperiences={fetchedWorkExperiences} skills={skills}/>
      <Projects />
      <EducationBackground educationBackgrounds={educationBackgrounds}/>
      <Testimonials />
      <Blog />
      <Contact fetchedProfile={fetchedProfile[0]}/>
      <ScrollToTop />
    </div>
  );
}
