import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/project.css";
import Loader from "./Loader";
import activeLink from "./navBarActive";

function ProjectDescription() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  useEffect(() => {
    activeLink("projects");
    let getProject = async () => {
      let response = await fetch(`/user/getProject/?id=${id}`, {
        method: "GET",
      });
      if (response.status === 200) {
        let data = await response.json();
        setProject(data);
        setLoading(false);
      } else {
        navigation("/error");
      }
    };
    getProject();
    return () => {
      setProject([]);
      setLoading(true);
    };
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {project && project?.length === 1 && (
            <>
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  textDecoration: "underline",
                  textDecorationColor: "rgb(227 141 13)",
                  userSelect: "none",
                }}
              >
                <b
                  style={{
                    color: "rgb(227 141 13)",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                ></b>
                <b> {project[0]?.name}</b>
              </h1>

              <div className="description" data-carousel>
                {project[0]?.images &&
                  typeof project[0]?.images === "object" &&
                  project[0]?.images.length >= 2 && (
                    <>
                      <button
                        className="carousel-button prev"
                        data-carousel-button="prev"
                        onClick={(e) => {
                          carousel(e, "prev");
                        }}
                      >
                        {" "}
                        &#8656;
                      </button>
                      <button
                        className="carousel-button next"
                        data-carousel-button="next"
                        onClick={(e) => {
                          carousel(e, "next");
                        }}
                      >
                        &#8658;
                      </button>
                    </>
                  )}
                <ul className="carousel" data-slides>
                  {project[0]?.images &&
                    typeof project[0]?.images === "object" &&
                    project[0]?.images?.map((element, index) => {
                      return index === 0 ? (
                        <li key={index} className="slider" data-active>
                          <img src={element} alt="" />
                        </li>
                      ) : (
                        <li key={index} className="slider">
                          <img src={element} alt="" />
                        </li>
                      );
                    })}
                </ul>
              </div>
              <section className="desc description_Para">
                <span
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
                  ></b>
                  <b>Description</b>
                </span>
                <p>{project[0]?.description}</p>
              </section>
              <section className="desc">
                <span
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
                  ></b>
                  <b>Technologies</b>
                </span>
                <section className="technologies">
                  {project[0]?.technologies?.map((element, index) => {
                    return (
                      <p key={index} style={{ cursor: "pointer" }}>
                        {element}
                      </p>
                    );
                  })}
                </section>
              </section>
              <section className="desc">
                <span
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
                  ></b>
                  <b>Hosted</b>
                </span>
                {String(project[0]?.liveHostedLink).toLowerCase() ===
                "not yet hosted" ? (
                  <p>{project[0]?.liveHostedLink}</p>
                ) : (
                  <a
                    href={project[0]?.liveHostedLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project[0]?.liveHostedLink}
                  </a>
                )}
              </section>
              <section className="desc">
                <span
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
                  ></b>
                  <b>GitHub Link</b>
                </span>
                <a
                  href={project[0]?.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "white",
                    margin: "10px",
                  }}
                >
                  {project[0]?.github}
                </a>
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
}

export function carousel(button, action) {
  // console.log(button);
  const offset = action === "next" ? 1 : -1;
  const slides = button.target
    .closest("[data-carousel]")
    .querySelector("[data-slides]");

  const activeSlides = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlides) + offset;
  // console.log(newIndex);
  // console.log(slides.children);
  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;
  // console.log(slides.children[newIndex]);
  delete activeSlides.dataset.active;
  slides.children[newIndex].dataset.active = true;
}

export default ProjectDescription;
