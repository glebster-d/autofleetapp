import React, { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";

function ButtonContainer({ click }) {
  const { request } = useHttp();

  const fetchAllVehicles = useCallback(async () => {
    const data = await request("/api/all", "GET", null, {});
    console.log("Data", data);
    click(data);
  }, [request, click]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
      }}>
      <button
        className="waves-effect waves-light btn"
        onClick={() => fetchAllVehicles()}>
        <i className="material-icons left">refresh</i>Get All{" "}
      </button>
    </div>
  );
}

export default ButtonContainer;
