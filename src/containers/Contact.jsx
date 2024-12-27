import React, { useState } from "react";
import Copyright from "../components/Copyright";

export default function Contact() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const FORMSPREE_KEY = "";

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect additional data after submission
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset).toISOString();

    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer;

    let currLoc = null;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currLoc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      },
      (error) => {
        currLoc = null;
      }
    );

    const payload = {
      name: details.name,
      email: details.email,
      message: details.message,
      otherDetails: {
        time: istTime,
        location: currLoc,
        userAgent: userAgent,
        screenResolution: screenResolution,
        referrer: referrer,
      },
    };

    // Send the final payload to Formspree API
    fetch(`https://formspree.io/f/${FORMSPREE_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");

          // Clear the form
          setDetails({
            name: "",
            email: "",
            message: "",
          });
        } else {
          alert("Error submitting form.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="col-xxl-8 col-xl-9">
        <div className="bostami-page-content-wrap">
          {/* <!-- page title --> */}
          <div className="section-wrapper pl-60 pr-60 pt-60">
            <div className="bostami-page-title-wrap mb-15">
              <h2 className="page-title">contact</h2>
            </div>
          </div>

          {/* <!-- contact form --> */}
          <div className="section-wrapper pr-60 pl-60 mb-60">
            <div className="contact-area bg-light-white-2">
              <h5 className="contact-title">
                I'm always open to discussing product
              </h5>
              <h5 className="contact-title-b">design work or partnerships.</h5>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-input-item mb-60">
                  <label className="input-lebel name">Name *</label>
                  <input
                    name="name"
                    className="input-box name"
                    type="text"
                    value={details.name}
                    onChange={handleChange}
                    required
                    pattern="[A-Za-zÀ-ÖØ-ÿ'-]+(?: [A-Za-zÀ-ÖØ-ÿ'-]+)*"
                    title="Please enter a valid name (letters, hyphens, and apostrophes allowed)"
                  />
                </div>
                <div className="form-input-item mb-60">
                  <label className="input-lebel gmail">Email *</label>
                  <input
                    name="email"
                    className="input-box gmail"
                    type="email"
                    value={details.email}
                    onChange={handleChange}
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                  />
                </div>
                <div className="form-input-item mb-40">
                  <label className="input-lebel message">Message *</label>
                  <textarea
                    name="message"
                    className="input-box message"
                    value={details.message}
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                    required
                    maxLength="500" // Enforces the maximum length directly in HTML
                    pattern="[A-Za-zÀ-ÖØ-ÿ'-]+(?: [A-Za-zÀ-ÖØ-ÿ'-]+)*"
                    title="Please enter a valid text"
                  ></textarea>
                </div>
                <div className="form-btn-wrap">
                  <button type="submit" value="Send" className="form-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Copyright />
        </div>
      </div>
    </>
  );
}
