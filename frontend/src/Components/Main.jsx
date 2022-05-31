import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./css/home.css";
import SocialMedia from "./SocialMedia";
import { useDataLayerValue } from "../DataLayer";
function Main() {
  const { pathname } = useLocation();
  const [errorPage, setErrorPage] = useState(false);
  const [{ changeTheme }] = useDataLayerValue();
  const [{ bgColor, borderColor }, setColor] = useState({});
  useEffect(() => {
    let bgcolor = localStorage.getItem("bgcolor");
    let bordercolor = localStorage.getItem("borderColor");
    bgcolor &&
      setColor((pre) => {
        return {
          ...pre,
          bgColor: bgcolor,
        };
      });
    bordercolor &&
      setColor((pre) => {
        return {
          ...pre,
          borderColor: bordercolor,
        };
      });

    return () => {
      setColor({});
    };
  }, [changeTheme]);

  useEffect(() => {
    pathname === "/error" || pathname === "/notfound"
      ? setErrorPage(true)
      : setErrorPage(false);
    return () => {
      setErrorPage(false);
    };
  }, [pathname]);
  return (
    <div
      data-bgcolor
      className="main"
      style={
        errorPage
          ? {
              backgroundColor: "#870903c9",
              borderLeft: "5px solid rgb(76 31 31)",
            }
          : {
              backgroundColor: bgColor,
              borderLeft: "5px solid " + borderColor,
            }
      }
    >
      <Navbar />
      <Outlet />
      <SocialMedia />
    </div>
  );
}

export default Main;
