import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
import "./css/Theme.css";

function Navbar() {
  const [resume, setResume] = useState("/");
  useEffect(() => {
    let getResume = async () => {
      let response = await fetch("/user/getResume", { method: "GET" });
      if (response.status === 200) {
        let data = await response.json();
        setResume(data);
      }
    };
    getResume();
    return () => {
      setResume("/");
    };
  }, []);

  return (
    <nav>
      <section className="logo">
        <a href="/">
          <img src="/logo.png" alt="" />
        </a>
      </section>
      <section className="hamburger" onClick={handleHamburger}>
        <div></div>
        <div></div>
        <div></div>
      </section>
      <ul className="navbar">
        <li>
          <Link to="/" data-active-link className="link">
            PortFolio
          </Link>
        </li>
        <li>
          <Link to="/aboutMe" className="link">
            AboutMe
          </Link>
        </li>
        <li>
          <Link to="/projects" className="link">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/contactMe" className="link">
            ContactMe
          </Link>
        </li>
        <li>
          <a
            href={
              resume && typeof resume === "object" ? resume?.resume : resume
            }
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

//

const handleHamburger = (e) => {
  document.getElementsByClassName("navbar")[0].classList.toggle("visible");
};

let links = document.getElementsByClassName("link");
for (let i = 0; i < links.length; ++i) {
  links[i].addEventListener("click", (e) => {
    let activelink = document.querySelector("[data-active-link]");
    if (activelink) delete activelink.dataset.activeLink;
    e.target.dataset.activeLink = true;
  });
}
