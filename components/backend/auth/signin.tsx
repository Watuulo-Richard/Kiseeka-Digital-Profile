'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { loginSchema, UserLoginTypes } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginTypes>({ resolver: zodResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSignInOnSubmit(loginDetails: UserLoginTypes) {
    try {
      setIsLoading(true);
      const response = await signIn('credentials', {
        ...loginDetails,
        redirect: false,
      });
      console.log('SignIn Response...', response);
      if (response?.ok) {
        setIsLoading(false);
        toast.success('User Signin Successful...!!!✅');
        reset();
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        toast.error('Sign-in error: Please check your credentials...!!!🥺');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        'Internet Connection Error...!!!, Please Check Your Internet Connection...!!!❌',
      );
      console.error('Authentication error:', error);
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
    <div className="flex min-h-screen w-full items-center justify-center ">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200 to-purple-300 opacity-20 blur-3xl"></div>

          {/* Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            whileHover={{
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              translateY: -5,
            }}
          >
            {/* Card header */}
            <div className="px-8 pb-3 pt-4">
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#0D9488"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                    stroke="#0D9488"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <h1 className="text-center text-2xl font-bold text-gray-900">
                Sign in to your account
              </h1>
              <p className="mt-2 text-center text-gray-500">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Card body */}
            <div className="p-8 pt-0">
              <form
                onSubmit={handleSubmit(handleSignInOnSubmit)}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <input
                      {...register('email', { required: true })}
                      id="email"
                      type="email"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="text-sm text-destructive">
                        Email is required...
                      </span>
                    )}
                  </motion.div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <input
                      {...register('password', { required: true })}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <span className="text-sm text-destructive">
                        Password is required...
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
                    <motion.button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`flex h-5 w-5 items-center justify-center rounded border ${rememberMe ? "border-teal-500 bg-teal-500" : "border-gray-300"}`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {rememberMe && <Check size={14} className="text-white" />}
                    </motion.button>
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div> */}
                  <Link
                    href="#"
                    className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                {isLoading ? (
                  <motion.button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-teal-500 py-3 font-medium text-white"
                    whileHover={{ scale: 1.02, backgroundColor: '#0D9488' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in, Please Wait...
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-teal-500 py-3 font-medium text-white"
                    whileHover={{ scale: 1.02, backgroundColor: '#0D9488' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {isGoogleLoading ? (
                    <motion.button
                      onClick={handleGoogleSignIn}
                      type="button"
                      className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                      disabled={isGoogleLoading}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* <svg
                        width="24"
                        height="24"
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
                      </svg> */}
                      <Loader2 className="mr-2 h-4 w-4 text-emerald-600 animate-spin" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleGoogleSignIn}
                      type="button"
                      className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                      disabled={isGoogleLoading}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        width="24"
                        height="24"
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
                    </motion.button>
                  )}

                  {isLinkedInLoading ? (
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.366C3.274 4.225 4.194 3.299 5.337 3.299C6.477 3.299 7.401 4.225 7.401 5.366C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"
                          fill="#0077B5"
                        />
                      </svg> */}
                      <Loader2 className="mr-2 h-4 w-4 text-emerald-600 animate-spin" />
                    </motion.button>
                  ) : (
                    <motion.button
                    onClick={handleLinkedInSignIn}
                      type="button"
                      className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.366C3.274 4.225 4.194 3.299 5.337 3.299C6.477 3.299 7.401 4.225 7.401 5.366C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"
                          fill="#0077B5"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link
                  href="/sign-up-page"
                  className="font-medium text-teal-600 transition-colors hover:text-teal-500"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
