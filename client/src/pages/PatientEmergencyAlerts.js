import { gql, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../auth";

export default function PatientEmergencyAlerts(props){
  return (
        <div className="card-child" style={{ width: "100%" }}>
          <div className="row justify-content-center">
            <h2>
              Patients <span className="text-danger">Emergency Alerts</span>
            </h2>
          </div>
          {props.emergencyAlerts && props.emergencyAlerts.length !== 0 ? (
            <div className="row justify-content-center row-padding">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Reason</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {props.emergencyAlerts.map((alert, idx) => (
                    <tr key={idx}>
                      <td>{alert.reason}</td>
                      <td>{new Date(Number(alert.date)).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="row justify-content-center">
              <h4>No Alerts Present</h4>
            </div>
          )}
        </div>
      );
}