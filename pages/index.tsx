import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

// This protects the home and redirects user to Auth if there is no session (if user is njot logged in)
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <div>
      <div>hello world</div>
      <p>Logged in as : {user?.name}</p>
      <button onClick={() => signOut()}>LogOut</button>
    </div>
  );
}
