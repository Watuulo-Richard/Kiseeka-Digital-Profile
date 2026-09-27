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
    setIsVerifying(true);
    const userInputToken = parseInt(verificationCode.token);
    if (userInputToken === userToken) {
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
            'Success! User verified successfully. Everything looks great!',
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
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-6 sm:px-6 sm:py-8">
      {/* Blurred brand background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#F2B5A0]/40 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-rose-400/30 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          key="verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-xl"
        >
          <div className="p-6 sm:p-8">
            <div className="mb-8 flex flex-col items-center">
              <motion.div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(242, 181, 160, 0.3)',
                    '0 0 0 10px rgba(242, 181, 160, 0)',
                    '0 0 0 0 rgba(242, 181, 160, 0)',
                  ],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              >
                <Fingerprint className="h-10 w-10 text-primary" />
              </motion.div>
              <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
                Identity Verification
              </h2>
              <p className="text-center text-sm text-muted-foreground">
                Enter the 6-digit security code sent to your device
              </p>
              <form
                onSubmit={handleSubmit(handleVerifyOnSubmit)}
                className="w-full space-y-6"
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
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-muted-foreground" />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />

                {errors.token && (
                  <span className="text-sm text-destructive">
                    Verification code is required...
                  </span>
                )}

                <motion.div
                  whileHover={{ scale: Verifying ? 1 : 1.02 }}
                  whileTap={{ scale: Verifying ? 1 : 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={Verifying}
                    className="w-full rounded-lg"
                  >
                    {Verifying ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>

          <div className="border-t border-border bg-muted/40 p-4">
            <div className="flex items-center justify-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">
                Secured with end-to-end encryption
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}