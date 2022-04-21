import { useQuery } from "@apollo/client";
import { SIGNED_IN_QUERY } from "../graphql/queries";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const signedIn = useQuery(SIGNED_IN_QUERY, { fetchPolicy: "cache-only" });
  const history = useHistory();
  //
  const onRecordClick = () => {
    history.push("/record-vitals");
  };
  const onSearchRecordsClick = () => {
    history.push("/past-records");
  };
  return (
    <>
      <h1 className="mb-5">Welcome</h1>

      {signedIn.loading ? (
        // Loading the auth state
        <p>Loading...</p>
      ) : signedIn.data?.whoAmI?.id ? (
        // The user is signed in
        <>
          {/* Contents that differ for each role */}
          {signedIn.data.whoAmI.role === "NURSE" ? (
            // Signed in as a nurse
            <div className="container px-4 py-5">
              <h2>Nurse Control Panel</h2>
              <Container>
                <Row className="justify-content-md-center" xs={2} md={4} lg={6}>
                  <Col md="auto">
                    <Button variant="primary" onClick={onRecordClick}>
                      Record Patient Vitals
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button variant="primary" onClick={onSearchRecordsClick}>
                      View Past Records
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            // Signed in as a patient
            <p>You are logged in as a patient.</p>
          )}
        </>
      ) : (
        // The user is not signed in
        <p>Please sign in to use our service.</p>
      )}
    </>
  );
}
