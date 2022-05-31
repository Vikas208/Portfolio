import React, { useState, useEffect, useRef } from "react";
import "./css/contact.css";
import Loader from "./Loader";
import activeLink from "./navBarActive";
function ContactMe() {
  const [iserror, setIsError] = useState(undefined);
  const [message, setMessage] = useState("");
  const button = useRef("");
  const [loading, setLoading] = useState(false);
  const submitForm = async (e) => {
    e.preventDefault();
    button.current.disabled = true;
    setLoading(true);
    let formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }

    let response = await fetch("/user/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      setIsError(false);
      let result = await response.json();
      setMessage(result?.message);
    } else if (response.status === 403 || response.status === 500) {
      setIsError(true);
      let result = await response.json();
      setMessage(result?.message);
    } else {
      setIsError(true);
      setMessage("Something is Wrong");
    }
    button.current.disabled = false;
    e.target.reset();
    setLoading(false);
  };

  useEffect(() => {
    activeLink("contactme");
    return () => {
      setIsError(undefined);

      setLoading(false);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(undefined);
    }, 5000);

    return () => {
      clearTimeout(timer);
      // setMessage("");
      setLoading(false);
    };
  }, [iserror]);

  return (
    <>
      {loading && <Loader />}
      <div className="contactMe">
        <span>
          <img src="contactMe.png" alt="" />
        </span>
        <form method="post" onSubmit={submitForm}>
          {iserror !== undefined && (
            <b
              className="error"
              style={
                iserror
                  ? { backgroundColor: "rgb(148, 11, 11)" }
                  : { backgroundColor: " rgb(16, 187, 0) " }
              }
            >
              {message}
            </b>
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            autoComplete="username"
          />
          <textarea
            name="message"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter your Message"
            required
            minLength={2}
          ></textarea>{" "}
          <button type="submit" ref={button}>
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactMe;
