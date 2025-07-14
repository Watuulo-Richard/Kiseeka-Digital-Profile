import { Chrome } from '@/components/frontend/chrome';
import CreativeHeroSection from '@/components/frontend/hero-section';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Shield,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Internal Controls in Modern Organizations',
    excerpt:
      'A comprehensive guide to implementing effective internal controls that protect your organization from financial risks and ensure compliance with regulatory requirements.',
    category: 'Internal Controls',
    readTime: '8 min read',
    publishDate: 'December 15, 2024',
    image: '/placeholder.svg?height=200&width=400',
    featured: true,
  },
  {
    id: 2,
    title: 'IFRS 16 Lease Accounting: Implementation Challenges and Solutions',
    excerpt:
      'Exploring the practical challenges organizations face when implementing IFRS 16 and providing actionable solutions for smooth transition.',
    category: 'Financial Reporting',
    readTime: '6 min read',
    publishDate: 'December 10, 2024',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: 'Risk Assessment Frameworks: A Practical Approach',
    excerpt:
      'Learn how to develop and implement robust risk assessment frameworks that identify, evaluate, and mitigate business risks effectively.',
    category: 'Risk Management',
    readTime: '10 min read',
    publishDate: 'December 5, 2024',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 4,
    title: 'Digital Transformation in Audit: Tools and Technologies',
    excerpt:
      'Discover how modern audit professionals are leveraging technology to enhance audit quality, efficiency, and effectiveness.',
    category: 'Technology',
    readTime: '7 min read',
    publishDate: 'November 28, 2024',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 5,
    title: 'Fraud Detection Techniques for Small and Medium Enterprises',
    excerpt:
      'Essential fraud detection strategies tailored for SMEs, including red flags to watch for and preventive measures to implement.',
    category: 'Fraud Prevention',
    readTime: '9 min read',
    publishDate: 'November 20, 2024',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 6,
    title: "ESG Reporting: The Auditor's Perspective",
    excerpt:
      'Understanding the role of auditors in ESG reporting and the emerging standards that are shaping sustainable business practices.',
    category: 'ESG & Sustainability',
    readTime: '12 min read',
    publishDate: 'November 15, 2024',
    image: '/placeholder.svg?height=200&width=400',
  },
];

const categories = [
  'All Posts',
  'Internal Controls',
  'Financial Reporting',
  'Risk Management',
  'Technology',
  'Fraud Prevention',
  'ESG & Sustainability',
];

export default function Component() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#F2B5A0] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KP</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Kiseeka Pius
                </h1>
                <p className="text-sm text-gray-600">Professional Auditor</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/home"
                className="text-gray-600 hover:text-[#F2B5A0] transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-[#F2B5A0] transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-[#F2B5A0] transition-colors"
              >
                Services
              </Link>
              <Link href="#" className="text-[#F2B5A0] font-medium">
                Blog
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-[#F2B5A0] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <CreativeHeroSection />
      </section>

      {/* Stats Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">15K+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Clients Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All Posts' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Article
            </h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={blogPosts[0].image || '/placeholder.svg'}
                    alt={blogPosts[0].title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">{blogPosts[0].category}</Badge>
                  <CardTitle className="text-2xl mb-4 leading-tight">
                    {blogPosts[0].title}
                  </CardTitle>
                  <CardDescription className="text-base mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </CardDescription>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blogPosts[0].publishDate}
                    <Separator orientation="vertical" className="mx-3 h-4" />
                    <Clock className="w-4 h-4 mr-2" />
                    {blogPosts[0].readTime}
                  </div>
                  <Button className="group">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="relative">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.publishDate}
                      <Separator orientation="vertical" className="mx-3 h-4" />
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-blue-600 group-hover:text-blue-700"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Professional Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest articles on auditing, compliance, and financial
            reporting delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="flex-1" />
            <Button className="px-8">Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">KP</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Kiseeka Pius</h3>
                  <p className="text-gray-400">Professional Auditor</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Providing professional auditing services and insights to help
                organizations maintain financial integrity and regulatory
                compliance.
              </p>
              <div className="">
                <Link href='/sign-in-page'>
                <ShinyButton className="">
                  <div className="flex items-center">
                    <svg className='mr-2'
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <p className="text-[#F2B5A0]">Login To Your Dashboard With Google</p>
                  </div>
                </ShinyButton>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Internal Controls
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Risk Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Financial Reporting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Kiseeka Pius. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
