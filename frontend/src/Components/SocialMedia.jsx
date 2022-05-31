import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import "./css/socialMedia.css";
import { actions } from "../Reducer/actions";
function SocialMedia() {
  const [socialMedia, setSocialMedia] = useState([]);
  const [{ changeTheme }, dispatch] = useDataLayerValue();
  useEffect(() => {
    let getSocialMedia = async () => {
      let response = await fetch("/user/socialMedia", { method: "GET" });
      if (response.status === 200) {
        let result = await response.json();
        setSocialMedia(result);
      }
    };
    getSocialMedia();

    return () => {
      setSocialMedia([]);
    };
  }, []);

  const handelTheme = (bgColor, color, cardColor, borderColor) => {
    localStorage.setItem("bgcolor", bgColor);
    localStorage.setItem("color", color);
    localStorage.setItem("cardColor", cardColor);
    localStorage.setItem("borderColor", borderColor);

    dispatch({
      type: actions.CHANGETHEME,
      changeTheme: !changeTheme,
    });
  };

  return (
    <div className="socialMedia">
      <div className="socialCard">
        {socialMedia?.socialMedia &&
          Object.keys(socialMedia?.socialMedia).map((element, index) => {
            return (
              <a
                href={socialMedia?.socialMedia[element]?.link}
                target="_blank"
                rel="noreferrer"
                key={index}
                onClick={(e) => {
                  navigator.clipboard.writeText(
                    socialMedia?.socialMedia[element]?.link
                  );
                }}
              >
                <img
                  aria-label={socialMedia?.socialMedia[element]?.link}
                  src={socialMedia?.socialMedia[element]?.image}
                  alt=""
                />
              </a>
            );
          })}
      </div>
      <div className="themes">
        <div
          className="themeColor"
          style={{ backgroundColor: "rgb(1 28 32)" }}
          onClick={() => {
            handelTheme(
              "rgb(1 28 32)",
              "white",
              "rgb(14 40 42 / 61%)",
              `rgb(${14 + 8} ${40 + 8} ${42 + 8})`
            );
          }}
        ></div>
        <div
          className="themeColor"
          style={{ backgroundColor: "rgb(2 17 44)" }}
          onClick={() => {
            handelTheme(
              "rgb(2 17 44)",
              "white",
              "rgb(6 24 56 / 82%)",
              `rgb(${2 + 8} ${17 + 8} ${44 + 8})`
            );
          }}
        ></div>
        <div
          className="themeColor"
          style={{ backgroundColor: "rgb(0 0 0 / 96%)" }}
          onClick={() => {
            handelTheme(
              "rgb(0 0 0 / 96%)",
              "white",
              "rgb(2 2 2 / 47%)",
              `rgb(${0 + 8} ${0 + 8} ${0 + 8})`
            );
          }}
        ></div>
      </div>
    </div>
  );
}

export default SocialMedia;
