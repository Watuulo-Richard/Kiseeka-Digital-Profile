import OTPVerificationPage from "@/components/backend/auth/otp-verification-page";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <OTPVerificationPage id={id} />
    </>
  );
}