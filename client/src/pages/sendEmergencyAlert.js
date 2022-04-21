import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../auth";

const SEND_EMERGENCY_ALERT = gql`
  mutation SendEmergencyAlert($reason: String) {
    sendEmergencyAlert(reason: $reason)
  }
`;

export default function SendEmergencyAlert() {
  
  return (
    <div>
      <div className="card-container">
        <div className="row justify-content-center">
          <h2>
            <span className="text-danger">Send Emergency Alert</span>
          </h2>
        </div>
        <div className="row justify-content-center">
          <h4>
            This Emergency Alert will be sent to your doctor and hospital.
          </h4>
        </div>
        <Form className="register-form">
          <Form.Group controlId="alertReason">
            <Form.Label style={{ fontWeight: "bold" }}>Alert Reason</Form.Label>
            <br/>
            <textarea
              rows="8"
              placeholder="Enter alert reason"
              name="reason"
              required
            />
          </Form.Group>
          <div className="row justify-content-center">
            <Button variant="danger" type="submit">
              SEND ALERT
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};