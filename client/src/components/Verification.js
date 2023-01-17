import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "./Header/PrimaryButton";
import axios, { isAxiosError } from "axios";
const Verification = () => {
  const params = useParams();
  const [state, setState] = useState("loading");
  useEffect(() => {
    const verification = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user/token/verify", {
          params,
        });
        if (res.status === 200) {
          setState("success");
        }
      } catch (error) {
        setState("error");
        if (isAxiosError(error)) {
          const status = error.response.status;
          if (status === 401) {
            setState("invalid");
          } else if (status === 403) {
            setState("expired");
          }
        }
      }
    };
    verification();
  });

  if (state === "loading") {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div>
        <h1>Invalid Token</h1>
      </div>
    );
  }
  if (state === "expired") {
    return (
      <div>
        <h1>Token Expired</h1>
        <PrimaryButton
          name="Regenerate Token"
          link="/token/regenerate/:token"
        />
      </div>
    );
  }
  if (state === "success") {
    return (
      <div className="text-5xl text-success">
        <h1>Congrats!!!!! Your Em@il is Verified</h1>
      </div>
    );
  }
};

export default Verification;