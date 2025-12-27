'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Linkedin, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { userDetailsSchema, UserDetailTypes } from '@/schema/schema';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { baseUrl } from '@/types/type';
import { useRouter } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default function SignUp({ role = 'USER' }: { role?: UserRole }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDetailTypes>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      role: 'USER',
      fullName: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  async function handleSignUpOnSubmit(userDetails: UserDetailTypes) {
    userDetails.role = role;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/signupAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        console.log(response);
        toast.success('Account Created successfully', {
          description:
            'Your has been created, a code has been sent to your email please Verify',
        });
        const createdUserDetails = await response.json();
        router.push(`/verification-page/${createdUserDetails.data.id}`);
        // reset();
      } else {
        setLoading(false);
        toast.error(
          '❌ Error! Something went wrong while creating the User. Please try again or contact support. ⚠️',
        );
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      );
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-[500px] w-full">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center p-4 lg:w-1/2">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3">
            <motion.div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
              Create your account
            </h1>
            <p className="mt-1 text-xs text-gray-600">
              After signing up, verify your email with the link sent to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUpOnSubmit)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm"
              >
                Full Name
              </label>
              <input
                {...register('fullName', { required: true })}
                id="fullName"
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:py-2.5"
                placeholder="Watuulo Richard"
              />
              {errors.fullName && (
                <span className="text-xs text-destructive sm:text-sm">
                  FullName is required...
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm"
              >
                Email Address
              </label>
              <input
                {...register('email', { required: true })}
                id="email"
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:py-2.5"
                placeholder="name@example.com"
              />
              {errors.email && (
                <span className="text-xs text-destructive sm:text-sm">
                  Email is required...
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium text-gray-700 sm:text-sm"
              >
                Password
              </label>
              <input
                {...register('password', { required: true })}
                id="password"
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:py-2.5"
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-xs text-destructive sm:text-sm">
                  Password is required...
                </span>
              )}
            </div>

            {loading ? (
              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white disabled:cursor-not-allowed sm:py-2.5 sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Creating Account...
                <Loader2 className="ml-1.5 h-3.5 w-3.5 animate-spin sm:ml-2 sm:h-4 sm:w-4" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white sm:py-2.5 sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              </motion.button>
            )}
          </form>

          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <motion.button
                type="button"
                className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5" />
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Twitter className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
              </motion.button>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-600 sm:text-sm">
            Already have an account?{' '}
            <Link
              href="/sign-in-page"
              className="font-medium text-indigo-600 transition-colors hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 p-6 lg:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          <motion.div
            className="absolute -left-3 top-0 h-48 w-48 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -right-3 top-0 h-48 w-48 rounded-full bg-indigo-300 opacity-70 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-6 left-16 h-48 w-48 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, 15, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 9,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 483 322"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M482 159.964C482 248.278 410.736 320 321.868 320C233.001 320 161.736 248.278 161.736 159.964C161.736 71.6503 233.001 0 321.868 0C410.736 0 482 71.6503 482 159.964Z"
                fill="white"
                fillOpacity="0.08"
              />
              <path
                d="M321.5 292C392.187 292 450 234.187 450 163.5C450 92.8126 392.187 35 321.5 35C250.813 35 193 92.8126 193 163.5C193 234.187 250.813 292 321.5 292Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M321.5 262C375.348 262 419 218.348 419 164.5C419 110.652 375.348 67 321.5 67C267.652 67 224 110.652 224 164.5C224 218.348 267.652 262 321.5 262Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M321.5 233C359.332 233 390 202.332 390 164.5C390 126.668 359.332 96 321.5 96C283.668 96 253 126.668 253 164.5C253 202.332 283.668 233 321.5 233Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M321.5 205C344.196 205 362.5 186.696 362.5 164C362.5 141.304 344.196 123 321.5 123C298.804 123 280.5 141.304 280.5 164C280.5 186.696 298.804 205 321.5 205Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M321.5 185C333.374 185 343 175.374 343 163.5C343 151.626 333.374 142 321.5 142C309.626 142 300 151.626 300 163.5C300 175.374 309.626 185 321.5 185Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M122 321C189.379 321 244 266.379 244 199C244 131.621 189.379 77 122 77C54.6213 77 0 131.621 0 199C0 266.379 54.6213 321 122 321Z"
                fill="white"
                fillOpacity="0.08"
              />
              <path
                d="M122 292C173.362 292 215 250.362 215 199C215 147.638 173.362 106 122 106C70.6375 106 29 147.638 29 199C29 250.362 70.6375 292 122 292Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M122 262C156.794 262 185 233.794 185 199C185 164.206 156.794 136 122 136C87.2065 136 59 164.206 59 199C59 233.794 87.2065 262 122 262Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M122 233C140.778 233 156 217.778 156 199C156 180.222 140.778 165 122 165C103.222 165 88 180.222 88 199C88 217.778 103.222 233 122 233Z"
                stroke="white"
                strokeOpacity="0.2"
              />
              <path
                d="M122 205C125.866 205 129 201.866 129 198C129 194.134 125.866 191 122 191C118.134 191 115 194.134 115 198C115 201.866 118.134 205 122 205Z"
                stroke="white"
                strokeOpacity="0.2"
              />
            </svg>
          </motion.div>

          <motion.div
            className="mt-6 text-center text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="mb-2 text-lg font-bold sm:text-xl">
              Welcome to Kiseka Pius' Digital Space
            </h2>
            <p className="text-sm text-white opacity-80">
              Explore a portfolio crafted with passion, precision, and purpose.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}