import React, { useEffect, useState } from "react";
import "./css/profile.css";
import Loader from "./Loader";
import activeLink from "./navBarActive";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [basicInfo, setBasicInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    activeLink("portfolio");
    const getData = async () => {
      let response = await fetch("user/getInfo", { method: "GET" });
      if (response.status === 200) {
        let result = await response.json();
        setBasicInfo(result);
      } else {
        navigate("/error");
      }
      setLoading(false);
    };
    getData();

    return () => {
      setBasicInfo([]);
      setLoading(true);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile">
          <div className="profileleft">
            {basicInfo?.name && (
              <h1>
                <b style={{ color: "rgb(227 141 13)" }}>I'M</b>{" "}
                {basicInfo?.name}
              </h1>
            )}
            {basicInfo?.sortDescription && (
              <p>
                <b>{basicInfo?.sortDescription}</b>
              </p>
            )}
          </div>
          <div className="profileRight">
            {basicInfo?.image && <img src={basicInfo?.image[1]} alt="" />}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
