import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  return <div>hello</div>;
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
