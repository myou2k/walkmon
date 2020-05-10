import React from "react";

const ErrorUIComponent = ({ error, fade }) => {
  let classList = "alert alert-danger";
  if (!error) {
    return null;
  }
  fade(1500);
  return (
    <div className={classList} role="alert">
      {error}
    </div>
  );
};

export default ErrorUIComponent;
