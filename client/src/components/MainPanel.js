import React, { useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

import DetailsContainer from "./DetailsContainer";
import MapContainer from "./MapContainer";
import Loader from "./Loader";
//import ButtonContainer from "./ButtonContainer";

function MainPanel() {
  const [firstLoad, setFirstLoad] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [loading, setLoading] = useState(true);
  const { request } = useHttp();

  const fetchAllVehicles = useCallback(async () => {
    setLoading(true);
    const data = await request("/api/all", "GET", null, {});
    console.log("Data", data);
    setVehicles(data);
    setFirstLoad(data);
    setLoading(false);
  }, [request]);

  useEffect(() => {
    fetchAllVehicles();
  }, [fetchAllVehicles]);

  if (loading) {
    return <Loader />;
  }
  if (!loading) {
    return (
      <>
        <MapContainer vehicles={firstLoad} click={setVehicles} />
        {/* <ButtonContainer click={setVehicles} /> */}
        <DetailsContainer vehicles={vehicles} />
      </>
    );
  }
}

export default MainPanel;
