import React, { useEffect, useState } from "react";
import "./css/project.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import activeLink from "./navBarActive";
import { useDataLayerValue } from "../DataLayer";

function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgColor, setbgColor] = useState();
  const [{ changeTheme }] = useDataLayerValue();
  const navigation = useNavigate();

  useEffect(() => {
    let bgColor = localStorage.getItem("cardColor");
    bgColor && setbgColor(bgColor);
  }, [changeTheme]);

  useEffect(() => {
    activeLink("projects");
    const getProjects = async () => {
      let response = await fetch("/user/projects", { method: "GET" });
      if (response.status === 200) {
        let data = await response.json();
        setProjects(data);
      } else {
        navigation("/error");
      }
      setLoading(false);
    };
    getProjects();
    return () => {
      setProjects([]);
      setLoading(true);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
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
            <b> Personal Projects</b>
          </h1>
          <section className="projects">
            {projects.length === 0 && <ins>Coming Soon</ins>}
            {projects &&
              typeof projects === "object" &&
              projects?.map((element, index) => {
                return (
                  <div
                    style={bgColor && { backgroundColor: bgColor }}
                    className="projectCard"
                    key={index}
                    onClick={() => {
                      navigation(`/project/${element?._id}`);
                    }}
                  >
                    <img src={element?.bannerImage} alt="" />

                    <p>{element?.name}</p>
                  </div>
                );
              })}
            <a
              href="https://github.com/Vikas208"
              target="_blank"
              className="projectCard"
              rel="noreferrer"
              style={bgColor && { backgroundColor: bgColor }}
            >
              <img
                src={
                  "https://res.cloudinary.com/dppvuouek/image/upload/v1653984824/Projects/more_pv48aj.png"
                }
                alt=""
              />
              <p>More Project CheckOut On Github</p>
            </a>
          </section>
        </div>
      )}
    </>
  );
}

export default Project;
