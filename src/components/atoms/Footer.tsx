import React, { useEffect, useState } from "react";
import "styles/footer.scss";

const Footer = () => {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    getFullyear();
  }, [year]);

  const getFullyear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  };

  return (
    <footer>
      <div className="footer-content">
        <p>
          You agree to our Terms of Service, Cookie Policy, Privacy Policy and
          Content Policy. {year} &copy;
          <span className="company-name">Company Name Ltd.</span> All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
