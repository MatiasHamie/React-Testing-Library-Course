import { Alert } from "react-bootstrap";

import React from "react";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An Unexpected error ocurred. Please try again later.";

  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
