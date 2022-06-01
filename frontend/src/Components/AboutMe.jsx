import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/about.css";
import Loader from "./Loader";
import activeLink from "./navBarActive";
import { carousel } from "./ProjectDescription";
function AboutMe() {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    activeLink("aboutme");
    let getData = async () => {
      let response = await fetch("/user/about/", { method: "GET" });
      if (response.status === 200) {
        let result = await response.json();
        setAbout(result);
      } else {
        navigate("/error");
      }
      setLoading(false);
    };
    getData();

    return () => {
      setAbout([]);
      setLoading(true);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="about headingTitle">
          <h1
            style={{
              textAlign: "center",
              marginTop: "10px",
              textDecoration: "underline",
              textDecorationColor: "rgb(227 141 13)",
            }}
          >
            <b
              style={{
                color: "rgb(227 141 13)",
                textDecoration: "underline",
                textDecorationColor: "white",
              }}
            >
              Welcome
            </b>
            , In About Page
          </h1>
          <section className="aboutme">
            <section className="aboutmeleft">
              <summary>{about?.about && about?.about}</summary>
            </section>
            <section className="aboutmeRight" data-carousel>
              <button
                className="carousel-button prev"
                onClick={(e) => {
                  carousel(e, "prev");
                }}
              >
                &#8656;
              </button>
              <button
                className="carousel-button next"
                onClick={(e) => {
                  carousel(e, "next");
                }}
              >
                {" "}
                &#8658;
              </button>
              <ul data-slides>
                {about?.image &&
                  about?.image.map((element, index) => {
                    return index === 0 ? (
                      <li key={index} className="aboutSlider" data-active>
                        <img src={element} alt="" />
                      </li>
                    ) : (
                      <li key={index} className="aboutSlider">
                        <img src={element} alt="" />
                      </li>
                    );
                  })}
              </ul>
            </section>
          </section>
          {about?.education && typeof about?.education === "object" && (
            <section className="education">
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  textDecoration: "underline",
                  textDecorationColor: "rgb(227 141 13)",
                }}
              >
                <b
                  style={{
                    color: "rgb(227 141 13)",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  My
                </b>
                <b> Education</b>
              </h1>
              {about?.education &&
                typeof about?.education === "object" &&
                about?.education?.map((element, index) => {
                  return (
                    <article className="edu" key={index}>
                      <span className="timeline">{element?.time}</span>
                      <section className="organization">
                        <label htmlFor="organization">Organization</label>
                        <p>{element?.organization}</p>
                      </section>
                      <section className="course">
                        <label htmlFor="course">Course</label>
                        <section>
                          <summary>{element?.course}</summary>
                          <small>
                            <b>{element?.grades}</b>
                          </small>
                        </section>
                      </section>
                    </article>
                  );
                })}
            </section>
          )}
          {about?.skills && (
            <section className="skill">
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  textDecoration: "underline",
                  textDecorationColor: "rgb(227 141 13)",
                }}
              >
                <b
                  style={{
                    color: "rgb(227 141 13)",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  My
                </b>
                <b> Skills</b>
              </h1>

              <div className="images">
                {about?.skills &&
                  Object.keys(about?.skills)?.map((element, index) => {
                    return (
                      <span
                        key={index}
                        className={`card`}
                        style={{ "--i": index + 1 }}
                      >
                        <img src={about?.skills[element]} alt="" />
                      </span>
                    );
                  })}
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default AboutMe;
