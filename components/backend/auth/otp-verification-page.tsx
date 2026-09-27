"use client";

import OTPVerificationForm from "./verification-form-temporary";
import { useSingleProfileQuery } from "@/hooks/use-profile";
import { Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function OTPVerificationPage({
  id,
}: {
  id: string;
}) {
  const { profile, isLoading } = useSingleProfileQuery(id);

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-6 sm:px-6 sm:py-8">
        <motion.div className="flex flex-col items-center gap-4">
          <motion.div
            className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(242, 181, 160, 0.3)",
                "0 0 0 10px rgba(242, 181, 160, 0)",
                "0 0 0 0 rgba(242, 181, 160, 0)",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Fingerprint className="h-10 w-10 text-primary" />
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Loading verification...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-sm text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return <OTPVerificationForm userToken={profile.token} id={id} />;
}