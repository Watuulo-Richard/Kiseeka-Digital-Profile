
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
import { getPortfolio } from '@/actions/actions';

// export const metadata: Metadata = {
//   title: 'Kiseeka Pius | Senior Auditor',
//   description:
//     'Portfolio of Nihal Maskey, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.',
// };

export default async function Home() {
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Testimonials />
      <Blog />
      <Contact portfolio={portfolio[0]}/>
      <ScrollToTop />
    </div>
  );
}
