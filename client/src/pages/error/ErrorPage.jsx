import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="page">
      <div className="error-page">
        <h2>Page Not Found</h2>
        <Link to="/" className="btn">
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
