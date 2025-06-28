'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  AlertCircleIcon,
  Fingerprint,
  Loader,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import { UserVerificationTypes, verifyUserSchema } from '@/schema/schema';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { baseUrl } from '@/types/type';

export default function OTPVerificationForm({
  userToken,
  id,
}: {
  userToken: any;
  id: string;
}) {
  const [Verifying, setIsVerifying] = useState(false);
  const {
    control, // Add control for Controller
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserVerificationTypes>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      token: '',
    },
  });
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  async function handleVerifyOnSubmit(verificationCode: UserVerificationTypes) {
    // console.log('Form submitted with verificationCode from Email:', verificationCode);
    // console.log('User token From the DB:', userToken);
    // console.log('User ID From the DB:', id);
    setIsVerifying(true);
    const userInputToken = parseInt(verificationCode.token);
    if (userInputToken === userToken) {
      //   console.log('Parsed token:', userInputToken);
      // Update User But We Only Updated The Token
      try {
        const response = await fetch(`${baseUrl}/api/v1/signupAPI/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(verificationCode),
        });
        console.log(response);
        if (response.ok) {
          setIsVerifying(false);
          console.log(response);
          reset();
          toast.success(
            '✅ Success! User verified successfully. Everything looks great!',
          );
          router.push('/sign-in-page');
        } else {
          setIsVerifying(false);
          toast.error(
            '❌ Error! Something went wrong while creating the User. Please try again or contact support. ⚠️',
          );
          console.log(response);
        }
      } catch (error) {
        setIsVerifying(false);
        toast.error(
          '❌ Error! Something went wrong while creating the User. Please try again or contact support. ⚠️',
        );
        console.log(error);
      }
    } else {
      setShowNotification(true);
      setIsVerifying(false);
      //   console.log('Token mismatch!');
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div className=""></div>
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl filter"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl filter"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: 'easeInOut',
          }}
        />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          key="verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gray-900/80 shadow-lg shadow-blue-500/10 backdrop-blur-xl"
        >
          <div className="p-8">
            <div className="mb-8 flex flex-col items-center">
              <motion.div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(59, 130, 246, 0.2)',
                    '0 0 0 10px rgba(59, 130, 246, 0)',
                    '0 0 0 0 rgba(59, 130, 246, 0)',
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              >
                <Fingerprint className="h-10 w-10 text-blue-400" />
              </motion.div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                Identity Verification
              </h2>
              <p className="text-center text-blue-200">
                Enter the 6-digit security code sent to your device
              </p>
              <form
                onSubmit={handleSubmit(handleVerifyOnSubmit)}
                className=" space-y-6"
              >
                {showNotification && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Failed To Verify...!!!</AlertTitle>
                    <AlertDescription>
                      <span className="font-medium">Wrong Token!</span> Please
                      Check the token and Enter again
                    </AlertDescription>
                  </Alert>
                )}

                {/* Use Controller instead of register */}
                <Controller
                  name="token"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                        <InputOTPSlot index={1} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                        <InputOTPSlot index={2} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                      </InputOTPGroup>
                      <InputOTPSeparator className='text-blue-400'/>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                        <InputOTPSlot index={4} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                        <InputOTPSlot index={5} className=' border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50'/>
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />

                {errors.token && (
                  <span className="text-sm text-destructive">
                    Verification code is required...
                  </span>
                )}

                <motion.button
                  type="submit"
                  disabled={Verifying}
                  className="mb-4 flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 font-medium text-white"
                  whileHover={{ scale: 1.02, backgroundColor: '#2563eb' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {Verifying ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          <div className="border-t border-blue-500/20 bg-blue-900/20 p-4">
            <div className="flex items-center justify-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-blue-400" />
              <p className="text-xs text-blue-200">
                Secured with end-to-end encryption
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
