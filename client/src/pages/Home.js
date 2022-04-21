import { useQuery } from "@apollo/client";
import { SIGNED_IN_QUERY } from "../graphql/queries";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const signedIn = useQuery(SIGNED_IN_QUERY, { fetchPolicy: "cache-only" });
  const history = useHistory();
  //
  const onRecordClick = () => {
    history.push("/record-vitals");
  };
  return (
    <>
      <h1 className="mb-5">Welcome</h1>
      {signedIn.loading ? (
        <p>Loading...</p>
      ) : signedIn.data?.whoAmI?.id ? (
        <>
          <p>You are logged in.</p>
          <Button variant="primary" onClick={onRecordClick}>
            Record Patient Vitals
          </Button>
        </>
      ) : (
        <p>Please sign in to use our service.</p>
      )}
    </>
  );
}
<h2>https://www.youtube.com/watch?v=inpok4MKVLM</h2>;
