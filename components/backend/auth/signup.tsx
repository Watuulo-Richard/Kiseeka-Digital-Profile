"use client";

import { ArrowRight, Loader2, Linkedin, Twitter } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDetailsSchema, UserDetailTypes } from "@/schema/schema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { baseUrl } from "@/types/type";
import Link from "next/link";

export default function SignUp({ role = "USER" }: { role?: UserRole }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDetailTypes>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      role: "USER",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  async function handleSignUpOnSubmit(userDetails: UserDetailTypes) {
    userDetails.role = role;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/signupAPI`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        console.log(response);
        toast.success("Account Created successfully", {
          description:
            "Your has been created, a code has been sent to your email please Verify",
        });
        const createdUserDetails = await response.json();
        router.push(`/verification-page/${createdUserDetails.data.id}`);
        // reset();
      } else {
        setLoading(false);
        toast.error(
          "❌ Error! Something went wrong while creating the User. Please try again or contact support. ⚠️",
        );
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      );
      console.log(error);
    }
  }

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  
    function handleGoogleSignIn() {
      setIsGoogleLoading(true);
      signIn('google', { callbackUrl: '/dashboard' });
    }
    
    function handleLinkedInSignIn() {
      setIsLinkedInLoading(true);
      signIn('linkedin', { callbackUrl: '/dashboard' });
    }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-background p-4 lg:w-1/2">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3">
            <motion.div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h1 className="text-lg font-bold text-foreground sm:text-xl">
              Create your account
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              After signing up, verify your email with the link sent to your
              inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUpOnSubmit)}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                {...register("fullName", { required: true })}
                id="fullName"
                type="text"
                placeholder="Watuulo Richard"
                autoComplete="name"
              />
              {errors.fullName && (
                <span className="text-xs text-destructive sm:text-sm">
                  FullName is required...
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-xs text-destructive sm:text-sm">
                  Email is required...
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="text-xs text-destructive sm:text-sm">
                  Password is required...
                </span>
              )}
            </div>

            {loading ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg"
                >
                  Creating Account...
                  <Loader2 className="ml-1.5 h-4 w-4 animate-spin" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full rounded-lg">
                  Create Account
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </form>

          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* <div className="mt-4 grid grid-cols-2 gap-2.5">
              <motion.button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-sm hover:bg-muted"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2] sm:h-5 sm:w-5" />
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-sm hover:bg-muted"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Twitter className="h-4 w-4 text-[#1DA1F2] sm:h-5 sm:w-5" />
              </motion.button>
            </div> */}
            <div className="grid grid-cols-2 gap-2.5">
              <motion.button
                onClick={handleGoogleSignIn}
                type="button"
                disabled={isGoogleLoading}
                className="flex items-center justify-center rounded-lg border border-border bg-card px-3 py-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{
                  scale: isGoogleLoading ? 1 : 1.05,
                  y: isGoogleLoading ? 0 : -2,
                }}
                whileTap={{ scale: isGoogleLoading ? 1 : 0.95 }}
              >
                {isGoogleLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#F2B5A0] sm:h-5 sm:w-5" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    className="sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.69 5.82 14.09H2.12V16.95C3.94 20.53 7.69 23 12 23Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.82 14.09C5.6 13.43 5.48 12.73 5.48 12C5.48 11.27 5.6 10.57 5.82 9.91V7.05H2.12C1.41 8.57 1 10.24 1 12C1 13.76 1.41 15.43 2.12 16.95L5.82 14.09Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.37C13.62 5.37 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.69 1 3.94 3.47 2.12 7.05L5.82 9.91C6.72 7.31 9.13 5.37 12 5.37Z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                onClick={handleLinkedInSignIn}
                type="button"
                disabled={isLinkedInLoading}
                className="flex items-center justify-center rounded-lg border border-border bg-card px-3 py-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{
                  scale: isLinkedInLoading ? 1 : 1.05,
                  y: isLinkedInLoading ? 0 : -2,
                }}
                whileTap={{ scale: isLinkedInLoading ? 1 : 0.95 }}
              >
                {isLinkedInLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#0077B5] sm:h-5 sm:w-5" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    className="sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.366C3.274 4.225 4.194 3.299 5.337 3.299C6.477 3.299 7.401 4.225 7.401 5.366C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"
                      fill="#0077B5"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground sm:text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in-page"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-[#2A1215] via-[#4E2222] to-[#94523F] p-6 lg:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          <motion.div
            className="absolute -left-3 top-0 h-48 w-48 rounded-full bg-rose-300/40 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-3 top-0 h-48 w-48 rounded-full bg-[#F2B5A0]/40 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-6 left-16 h-48 w-48 rounded-full bg-rose-400/40 mix-blend-multiply blur-xl filter"
            animate={{
              x: [0, 15, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 9,
              ease: "easeInOut",
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
            <p className="text-sm text-white/80">
              Explore a portfolio crafted with passion, precision, and purpose.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
