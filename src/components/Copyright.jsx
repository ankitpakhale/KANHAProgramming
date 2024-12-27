import React from "react";

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  const getVersion = () => {
    // // Fixed date: September 11, 2024
    // const FIXED_DATE = "2024-09-11";
    // const currentDate = new Date(FIXED_DATE);

    // // Base year and month for version calculation
    // const baseYear = 2022; // Starting year (one year before the major version starts)
    // const baseMonth = 1; // Base month (January, which is 1 in 1-based index)

    // // Major Version (increases every year)
    // const majorVersion = currentDate.getFullYear() - baseYear + 1;

    // // Minor Version (increases every month)
    // const minorVersion = currentDate.getMonth() + 1 - baseMonth + 1;

    // // Calculate weeks since the beginning of the year
    // const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    // const weekDifference = Math.floor(
    //   (currentDate - startOfYear) / (1000 * 60 * 60 * 24 * 7)
    // );

    // // Patch Version (increases every week)
    // const patchVersion = weekDifference + 1; // Add 1 to start patch version from 1

    // // Format the version string
    // return `${majorVersion}.${minorVersion}.${patchVersion}`;
    return "1.1.6";
  };

  return (
    // <div className="footer-copyright text-center bg-light-white-2 pt-25 pb-25">
    //      <span>© {currentYear} All Rights Reserved.
    //           Gratitude to <a href="https://evolixenterprises.netlify.app/"
    //                target="_blank" rel="noopener noreferrer" style={{ color: "#FF5733", fontWeight: "bold" }}>Evolix Enterprises</a>
    //           .</span>
    // </div >

    <div className="footer-copyright text-center bg-light-white-2 pt-25 pb-25">
      <span className="footer-text">© {currentYear}</span>
      <span className="footer-text">All</span>
      <span className="footer-text">Rights</span>
      <span className="footer-text">Reserved</span>
      <span className="footer-version">Version {getVersion()}</span>
    </div>
  );
}
