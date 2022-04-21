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
    history.push("/");
  }, [apolloClient, history]);

  return (
    <RBNavbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <RBNavbar.Brand>App Name</RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="navbar-collapsed" />
        <RBNavbar.Collapse id="navbar-collapsed">
          <Nav className="me-auto mb-2 mb-md-0">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/DailyINFOrm">
              Daily Information (Patient)
            </Nav.Link>
          </Nav>

          <div className="d-flex justify-content-end">
            {whoAmI.loading ? (
              // Loading state
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : whoAmI.data?.whoAmI?.id ? (
              // When signed in
              <>
                <NavLink to="/account" className="navbar-text me-3">
                  {whoAmI.data.whoAmI.firstName}
                </NavLink>
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
