import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../auth";

/** @type {typeof import("../graphql.gen").RegisterDocument} */
const DAILYINFO_MUTATION = gql`
  mutation DailyINFOrm(
    $pulseRate: String!
    $bloodPressure: String!
    $weight: String!
    $temperature: String!
    $respiratoryRate: String!
  ) {
    dailyINFOrm(
        pulseRate: $pulseRate
        bloodPressure: $bloodPressure
        weight: $weight
        temperature: $temperature
        respiratoryRate: $respiratoryRate
      
    ) {
      token
    }
  }
`;

export default function DailyINFOrm() {
  const [dailyINFOrm, { loading, client }] = useMutation(DAILYINFO_MUTATION);
  const [error, setError] = useState("");
  const history = useHistory();

  /** @type {import("react").FormEventHandler<HTMLFormElement>} */
  const onSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      setError("");

      const form = new FormData(/** @type {HTMLFormElement} */ (ev.target));
      const pulseRate = form.get("pulseRate");
      const bloodPressure = form.get("bloodPressure");
      const weight = form.get("weight");
      const temperature = form.get("temperature");
      const respiratoryRate = form.get("respiratoryRate");

      if (!pulseRate || !bloodPressure || !weight || !temperature || !respiratoryRate) {
        setError("All fields are required.");
        return;
      }

      if (
        typeof pulseRate !== "string" ||
        typeof bloodPressure !== "string" ||
        typeof weight !== "string" ||
        typeof temperature !== "string" ||
        typeof respiratoryRate !== "string"
      ) {
        setError("Malformed data in the form.");
        return;
      }

      try {
        const result = await dailyINFOrm({
          variables: { pulseRate, bloodPressure, weight, temperature, respiratoryRate },
        });
        if (result.errors && result.errors.length > 0) {
          setError(
            "There was trouble processing the request. Please try again later."
          );
          return;
        }
        if (result.data?.dailyINFOrm?.token) {
          setAuthToken(result.data.register.token);
          history.replace("/");
          await client.refetchQueries({ include: ["WhoAmI"] });
        } else {
          setError("Invalid values.");
        }
      } catch {
        setError("Oops, something went wrong.");
      }
    },
    [client, history, dailyINFOrm]
  );

  return (
    <>
      <h1 className="mb-5">Daily Information</h1>
      <Form
        method="post"
        className="border rounded mx-3 p-3 text-start"
        onSubmit={onSubmit}
      >
        <fieldset disabled={loading}>
          <Form.Group
            className="mb-3"
            controlId="register-form"
            onSubmit={onSubmit}
          >
            <Form.Label>Pulse Rate</Form.Label>
            <Form.Control
              type="pulseRate"
              name="pulseRate"
              required
              aria-describedby="pulseRate-description"
            />
            <Form.Text id="pulseRate-description">
            Please enter your pulse rate as indicated by the nurse.
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="blood-Pressure">
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control
              type="bloodPressure"
              name="bloodPressure"
              autoComplete="blood-Pressure"
              required
              aria-describedby="bloodPressure-description"
            />
            <Form.Text id="bloodPressure-description">
              Please enter your blood pressure as indicated by the nurse.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="weight-ind">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="weight"
              name="weight"
              autoComplete="weight-ind"
              required
              aria-describedby="weight-description"
            />
            <Form.Text id="weight-description">
            Please enter your weight as indicated by the nurse.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="temp-ind">
            <Form.Label>Temperature (C°)</Form.Label>
            <Form.Control
              type="temperature"
              name="temperature"
              autoComplete="temp-ind"
              required
              aria-describedby="temp-description"
            />
            <Form.Text id="temp-description">
            Please enter your temperature in C° as indicated by the nurse.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="pulseRate-ind">
            <Form.Label>Pulse Rate</Form.Label>
            <Form.Control
              type="pulseRate"
              name="pulseRate"
              autoComplete="pulseRate-ind"
              required
              aria-describedby="pulseRate-description"
            />
            <Form.Text id="pulseRate-description">
            Please enter only the number of heart pulses indicated by the nurse.
            </Form.Text>
          </Form.Group>


          {!loading && error && <Alert>{error}</Alert>}
          <div className="text-center mb-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
          <p className="text-center">
            By clicking submit you agree to our terms and conditions
          </p>
        </fieldset>
      </Form>
    </>
  );
}
