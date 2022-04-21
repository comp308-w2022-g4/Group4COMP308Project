import React from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar as RBNavbar,
  Spinner,
} from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { clearAuthToken } from "../auth";

/** @type {typeof import("../graphql.gen").WhoAmIDocument} */
const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      firstName
      lastName
      role
    }
  }
`;

export default function NavBar() {
  // This one is always fetch from the server. Thus, it works as a relatively
  // authoritative source of truth.
  const whoAmI = useQuery(WHO_AM_I_QUERY, { fetchPolicy: "network-only" });
  const apolloClient = useApolloClient();
  const history = useHistory();

  /** @type {import("react").MouseEventHandler<HTMLButtonElement>} */
  const onSignOutClick = useCallback(async () => {
    clearAuthToken();
    await apolloClient.resetStore();
    history.push("/sign-in");
  }, [apolloClient, history]);

  return (
    <RBNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <RBNavbar.Brand>
          <img src="/4.png" width="95" height="50" alt="" />
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="navbar-collapsed" />
        <RBNavbar.Collapse id="navbar-collapsed">
          {/* Navigation links */}
          <Nav className="me-auto mb-2 mb-md-0">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>

            {/* Links that differ depending on the auth state */}
            {!whoAmI.loading && whoAmI.data?.whoAmI && (
              // Only show when the user is signed in
              <>
                {/* Links that are specialized for each role */}
                {whoAmI.data.whoAmI.role === "NURSE" ? (
                  // When signed in as a nurse
                  <>
                    <Nav.Link as={NavLink} to="/send-tip">
                      Send Daily Tip
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/PatientEmergencyAlerts">
                      View Emergency Alert
                    </Nav.Link>
                  </>
                ) : whoAmI.data.whoAmI.role === "PATIENT" ? (
                  // When signed in as a patient
                  <>
                    <Nav.Link as={NavLink} to="/advisor">
                      AI Advisor
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/daily-tip">
                      View Daily Tips
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/DailyINFOrm">
                      Daily Information (Patient)
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sendEmergencyAlert">
                      Send Emergency Alert
                    </Nav.Link>
                  </>
                ) : (
                  // ???
                  <RBNavbar.Text>Error; please report</RBNavbar.Text>
                )}
              </>
            )}
          </Nav>

          {/* Links at the end */}
          <div className="d-flex justify-content-end">
            {whoAmI.loading ? (
              // Loading state
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : whoAmI.data?.whoAmI?.id ? (
              // When signed in
              <>
                <RBNavbar.Text as={NavLink} to="/account" className="me-3">
                  {whoAmI.data.whoAmI.firstName}
                </RBNavbar.Text>
                <Button variant="outline-danger" onClick={onSignOutClick}>
                  Sign Out
                </Button>
              </>
            ) : (
              // When not signed in
              <Link to="/sign-in" className="btn btn-secondary">
                Sign In
              </Link>
            )}
          </div>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}
