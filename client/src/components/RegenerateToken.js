import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const RegenerateToken = () => {
  const params = useParams();
  const [state, setState] = useState("loading");
  useEffect(() => {
    const regeneration = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/user/token/regenerate",
          {
            params,
          }
        );
        if (res.status === 200) {
          setState("success");
        }
      } catch (error) {
        setState("error");
        if (isAxiosError(error)) {
          const status = error.response.status;
          if (status === 401) {
            setState("invalid");
          }
        }
      }
    };
    regeneration();
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
  if (state === "success") {
    return (
      <div className="text-5xl text-success">
        <h1>Token Regenerated</h1>
      </div>
    );
  }
};

export default RegenerateToken;
