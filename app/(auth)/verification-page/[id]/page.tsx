import { getUserById } from "@/actions/actions";
import OTPVerificationForm from "@/components/backend/auth/verification-form-temporary";

export default async function page({
  params,
}: {
  params:Promise<{id:string}>
}) {
  // Get a User
  const {id} = await params
  const user = await getUserById(id);
  const userToken = user?.token;
  // console.log(userToken);
  return (
    <>
    {/* <section className="bg-gray-50 dark:bg-gray-900"> */}
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}
        {/* <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> */}
          {/* <div className="p-6 space-y-4 md:space-y-6 sm:p-8"> */}
            {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Verify Your Account
            </h1> */}
            <OTPVerificationForm userToken={userToken} id={id} />
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    {/* </section> */}
    </>
  );
}