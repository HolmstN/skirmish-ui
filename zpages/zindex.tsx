import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="skirmish.io"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-rows-3 gap-3">
                <div>
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                    onClick={() => signIn("discord")}
                  >
                    <span className="sr-only">Sign in with Discord</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 508.67 96.36"
                      className="w-20 h-5"
                      fill="currentColor"
                    >
                      <g id="图层_2" data-name="图层 2">
                        <g id="Discord_Logos" data-name="Discord Logos">
                          <g
                            id="Discord_Logo_-_Large_-_White"
                            data-name="Discord Logo - Large - White"
                          >
                            <path d="M170.85,20.2h27.3q9.87,0,16.7,3.08a22.5,22.5,0,0,1,10.21,8.58,23.34,23.34,0,0,1,3.4,12.56A23.24,23.24,0,0,1,224.93,57a23.94,23.94,0,0,1-10.79,8.92q-7.24,3.3-17.95,3.29H170.85Zm25.06,36.54q6.65,0,10.22-3.32a11.8,11.8,0,0,0,3.57-9.07,11.5,11.5,0,0,0-3.18-8.5q-3.2-3.18-9.63-3.19h-8.54V56.74Z" />
                            <path d="M269.34,69.13a37,37,0,0,1-10.22-4.27V53.24a27.77,27.77,0,0,0,9.2,4.38,39.31,39.31,0,0,0,11.17,1.71,8.71,8.71,0,0,0,3.82-.66c.86-.44,1.29-1,1.29-1.58a2.37,2.37,0,0,0-.7-1.75,6.15,6.15,0,0,0-2.73-1.19l-8.4-1.89q-7.22-1.68-10.25-4.65a10.39,10.39,0,0,1-3-7.81,10.37,10.37,0,0,1,2.66-7.07,17.13,17.13,0,0,1,7.56-4.65,36,36,0,0,1,11.48-1.65A43.27,43.27,0,0,1,292,27.69a30.25,30.25,0,0,1,8.12,3.22v11a30,30,0,0,0-7.6-3.11,34,34,0,0,0-8.85-1.16q-6.58,0-6.58,2.24a1.69,1.69,0,0,0,1,1.58,16.14,16.14,0,0,0,3.74,1.08l7,1.26Q295.65,45,299,48t3.36,8.78a11.61,11.61,0,0,1-5.57,10.12Q291.26,70.61,281,70.6A46.41,46.41,0,0,1,269.34,69.13Z" />
                            <path d="M318.9,67.66a21,21,0,0,1-9.07-8,21.59,21.59,0,0,1-3-11.34,20.62,20.62,0,0,1,3.15-11.27,21.16,21.16,0,0,1,9.24-7.8,34.25,34.25,0,0,1,14.56-2.84q10.5,0,17.43,4.41V43.65a21.84,21.84,0,0,0-5.7-2.73,22.65,22.65,0,0,0-7-1.05q-6.51,0-10.19,2.38a7.15,7.15,0,0,0-.1,12.43q3.57,2.41,10.36,2.41a23.91,23.91,0,0,0,6.9-1,25.71,25.71,0,0,0,5.84-2.49V66a34,34,0,0,1-17.85,4.62A32.93,32.93,0,0,1,318.9,67.66Z" />
                            <path d="M368.64,67.66a21.77,21.77,0,0,1-9.25-8,21.14,21.14,0,0,1-3.18-11.41A20.27,20.27,0,0,1,359.39,37a21.42,21.42,0,0,1,9.21-7.74,38.17,38.17,0,0,1,28.7,0,21.25,21.25,0,0,1,9.17,7.7,20.41,20.41,0,0,1,3.15,11.27,21.29,21.29,0,0,1-3.15,11.41,21.51,21.51,0,0,1-9.2,8,36.32,36.32,0,0,1-28.63,0Zm21.27-12.42a9.12,9.12,0,0,0,2.56-6.76,8.87,8.87,0,0,0-2.56-6.68,9.53,9.53,0,0,0-7-2.49,9.67,9.67,0,0,0-7,2.49,8.9,8.9,0,0,0-2.55,6.68,9.15,9.15,0,0,0,2.55,6.76,9.53,9.53,0,0,0,7,2.55A9.4,9.4,0,0,0,389.91,55.24Z" />
                            <path d="M451.69,29V44.14a12.47,12.47,0,0,0-6.93-1.75c-3.73,0-6.61,1.14-8.61,3.4s-3,5.77-3,10.53V69.2H416V28.25h16.8v13q1.4-7.14,4.52-10.53a10.38,10.38,0,0,1,8-3.4A11.71,11.71,0,0,1,451.69,29Z" />
                            <path d="M508.67,18.8V69.2H491.52V60a16.23,16.23,0,0,1-6.62,7.88A20.81,20.81,0,0,1,474,70.6a18.11,18.11,0,0,1-10.15-2.83A18.6,18.6,0,0,1,457.11,60a25.75,25.75,0,0,1-2.34-11.17,24.87,24.87,0,0,1,2.48-11.55,19.43,19.43,0,0,1,7.21-8,19.85,19.85,0,0,1,10.61-2.87q12.24,0,16.45,10.64V18.8ZM489,55a8.83,8.83,0,0,0,2.63-6.62A8.42,8.42,0,0,0,489,42a11,11,0,0,0-13.89,0,8.55,8.55,0,0,0-2.59,6.47A8.67,8.67,0,0,0,475.14,55,9.42,9.42,0,0,0,482,57.51,9.56,9.56,0,0,0,489,55Z" />
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                            <ellipse
                              cx="242.92"
                              cy="24.93"
                              rx="8.55"
                              ry="7.68"
                            />
                            <path d="M234.36,37.9a22.08,22.08,0,0,0,17.11,0V69.42H234.36Z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    return {
      redirect: {
        destination: `/dashboard`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
