import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { SIGNED_IN_QUERY } from "../graphql/queries";
import SignIn from "./SignIn";

export default function RecordVitals() {
  //
  const signedIn = useQuery(SIGNED_IN_QUERY, { fetchPolicy: "cache-only" });
  //
  return (
    <>
      {signedIn.loading ? (
        <p>Loading...</p>
      ) : signedIn.data?.whoAmI?.id ? (
        <>
          <h1 className="mb-5">Record Vitals Information</h1>
          <Form method="post" className="border rounded mx-3 p-3 text-start">
            <Form.Group controlId="patient-first-name" className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="text" name="firstName" />
            </Form.Group>
            <Form.Group controlId="patient-last-name" className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="text" name="lastName" />
            </Form.Group>
            <Form.Group controlId="body-temperature" className="mb-3">
              <Form.Label>Body Temperature</Form.Label>
              <Form.Control type="number" name="bodyTemperature" />
            </Form.Group>
            <Form.Group controlId="heart-rate" className="mb-3">
              <Form.Label>Heart Rate</Form.Label>
              <Form.Control type="number" name="heartRate" />
            </Form.Group>
            <Form.Group controlId="blood-pressure" className="mb-3">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control type="number" name="bloodPressure" />
            </Form.Group>
            <Form.Group controlId="respiratoryRate" className="mb-3">
              <Form.Label>Respiratory Rate</Form.Label>
              <Form.Control type="number" name="respiratoryRate" />
            </Form.Group>
            <div className="text-center mb-3">
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}
