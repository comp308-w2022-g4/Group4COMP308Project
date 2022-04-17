import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../auth";

/** @type {typeof import("../graphql.gen").SignInDocument} */
const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export default function SignIn() {
  const apolloClient = useApolloClient();
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const [error, setError] = useState("");
  const history = useHistory();

  /** @type {import("react").FormEventHandler<HTMLFormElement>} */
  const onSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      setError("");

      const form = new FormData(/** @type {HTMLFormElement} */ (ev.target));
      const email = form.get("email");
      const password = form.get("password");

      if (!email || !password) {
        setError("Both fields are required.");
        return;
      }

      if (typeof email !== "string" || typeof password !== "string") {
        setError("Malformed data in the form.");
        return;
      }

      try {
        const result = await signIn({ variables: { email, password } });
        if (result.errors && result.errors.length > 0) {
          setError(
            "There was trouble processing the request. Please try again later."
          );
          return;
        }
        if (result.data?.signIn?.token) {
          setAuthToken(result.data.signIn.token);
          history.replace("/");
          await apolloClient.refetchQueries({ include: ["WhoAmI"] });
        } else {
          setError("Invalid credentials.");
        }
      } catch {
        /* no-op */
      }
    },
    [apolloClient, history, signIn]
  );

  return (
    <>
      <h1 className="mb-5">Sign In</h1>
      <Form
        method="post"
        className="border rounded mx-3 p-3 text-start"
        onSubmit={onSubmit}
      >
        <fieldset disabled={loading}>
          <Form.Group controlId="sign-in-email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>
          <Form.Group controlId="current-password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </Form.Group>
          {!loading && error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center">
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
