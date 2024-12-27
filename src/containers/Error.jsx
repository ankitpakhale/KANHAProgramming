import React from "react";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";

export default function Error() {
  return (
    <>
      <div className="col-xxl-8 col-xl-9">
        <div className="bostami-page-content-wrap">
          {/* Page title */}
          <div className="section-wrapper pl-60 pr-60 pt-60">
            <div className="bostami-page-title-wrap mb-15">
              <h2 className="page-title">Error</h2>
              {/* Error Content Start */}
              <div className="error-content">
                <h3>Oops! Something went wrong.</h3>
                <p>
                  The page you're looking for doesn't exist or an error
                  occurred.
                </p>
                <Link to="/" className="btn-2">
                  <span className="icon">
                    <i className="fa-regular fa-arrow-left" />
                  </span>
                  Go Back Home
                </Link>
              </div>
              {/* Error Content End */}
            </div>
          </div>
          <Copyright />
        </div>
      </div>
    </>
  );
}
