import React, { useEffect } from "react";
import activeLink from "./navBarActive";
function ErrorPage({ statusCode }) {
  useEffect(() => {
    activeLink("error");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "auto",
        padding: "10px",
        height: "100vh",
      }}
    >
      {statusCode === 404 ? (
        <>
          <img
            src="404.png"
            alt=""
            style={{
              width: "50vw",
              height: "50vh",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
          <p
            style={{
              padding: "10px",
              fontSize: "20px",
              letterSpacing: "1px",
              userSelect: "none",
            }}
          >
            Page Not Found
          </p>
        </>
      ) : (
        <>
          <img
            src="500.png"
            alt=""
            style={{
              width: "50vw",
              height: "50vh",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
          <p
            style={{
              padding: "10px",
              fontSize: "20px",
              letterSpacing: "1px",
              userSelect: "none",
            }}
          >
            Something Went Wrong
          </p>
        </>
      )}
    </div>
  );
}

export default ErrorPage;
