import React, { useCallback, useEffect, useState } from "react";
import { Map } from "./component/Map";
import axios from "axios";

function App() {
  const [ipData, setIpData] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  const fetchData = useCallback(async (ip) => {
    try {
      const response = await axios.get("https://geo.ipify.org/api/v2/country", {
        params: {
          apiKey: "at_Tm6AoGGAsEQCvQPkixnG6eo5VkCmS",
          ipAddress: ip,
        },
      });
      setIpData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchData = () => {
    fetchData(ipAddress);
  };

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        setIpAddress(response.data.ip);
        fetchData(response.data.ip);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchData]);

  return (
    <>
      <main>
        <div>
          <h1>IP Address Tracker</h1>
          <div>
            <input
              type="text"
              placeholder="Search for any IP address"
              // value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button onClick={handleFetchData}>&#8250;</button>
          </div>
          {ipData ? (
            <div className="center">
              <div className="ip-details">
                <div>
                  <h6>ip address</h6>
                  <p>{ipData.ip}</p>
                </div>
                <hr />
                <div>
                  <h6>location</h6>
                  <p>
                    {ipData.location.region},
                    <span> {ipData.location.country}</span>
                  </p>
                </div>
                <hr />
                <div>
                  <h6>timezone</h6>
                  <p>{ipData.location.timezone}</p>
                </div>
                <hr />
                <div>
                  <h6>isp</h6>
                  <p>{ipData.isp}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="loading">Loading data...</p>
          )}
        </div>
      </main>
      <Map ipData={ipData} />
    </>
  );
}

export default App;
