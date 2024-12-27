import React from "react";
import Copyright from "../components/Copyright";
import faqData from "../data/JsonData/faqData.json";

export default function FAQ() {
  return (
    <>
      <div className="col-xxl-8 col-xl-9">
        <div className="bostami-page-content-wrap">
          {/* <!-- page title --> */}
          <div className="section-wrapper pl-60 pr-60 pt-60">
            <div className="bostami-page-title-wrap mb-15">
              <h2 className="page-title">FAQ</h2>

              {/* <!-- FAQ Start --> */}
              <div className="accordion" id="faqAccordion">
                {faqData.map((item) => (
                  <div className="accordion-item" key={item.id}>
                    <h2 className="accordion-header" id={`heading${item.id}`}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${item.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${item.id}`}
                      >
                        {item.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${item.id}`}
                      className={`accordion-collapse collapse ${
                        item.id === "One" ? "show" : ""
                      }`}
                      aria-labelledby={`heading${item.id}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <!-- FAQ End --> */}
            </div>
          </div>
          <Copyright />
        </div>
      </div>
    </>
  );
}
