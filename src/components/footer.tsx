import React from "react";

const Footer = () => {
  return (
    <div className="text-white">
      <section id="contact" style={{ padding: "2rem" }}>
        <h2>Contact Us</h2>
        <p className="hidden sm:block">
          If you have any questions or inquiries, feel free to reach out to us!
        </p>

        <ul style={{ listStyle: "none", padding: "0" }}>
          <li>
            <strong>Email:</strong> tesfa4706@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> +251 912 345 678
          </li>
          <li>
            <strong>Address:</strong> Addis Ababa, Ethiopia
          </li>
        </ul>
        <div className="flex  sm:flex-row flex-col ">
          <p>Follow us on social media:</p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              gap: "10px",
              textDecoration: "underline",
            }}
          >
            <li>
              <a href="https://facebook.com" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="text-lg text-center">
          Copyright &copy; 2025 Gebeya. All Rights Reserved.
        </div>
      </section>
    </div>
  );
};

export default Footer;
