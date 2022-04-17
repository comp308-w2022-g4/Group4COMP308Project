import { useQuery } from "@apollo/client";
import { SIGNED_IN_QUERY } from "../graphql/queries";

export default function Home() {
  const signedIn = useQuery(SIGNED_IN_QUERY, { fetchPolicy: "cache-only" });

  return (
    <>
      <h1 className="mb-5">Welcome</h1>
      {signedIn.loading ? (
        <p>Loading...</p>
      ) : signedIn.data?.whoAmI?.id ? (
        <p>You are logged in.</p>
      ) : (
        <p>Please sign in to use our service.</p>
      )}
    </>
  );
}
