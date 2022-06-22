import { useEffect, useState } from "react";

//styles
import "./Q1.css";

const axios = require("axios");

export default function Q1() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState([]);
  const [address2, setAddress2] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    console.log(address1, address2);
    var response = await axios.post("/Q1", {
      address1: address1,
      address2: address2,
    });
    var result = response.data;
    setData(result);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Q1</h2>
      <div
        className="wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="address1"
          id="address1"
          placeholder="Enter Account Address 1"
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          type="text"
          name="address2"
          id="address2"
          placeholder="Enter Account Address 2"
          onChange={(e) => setAddress2(e.target.value)}
        />
        <input
          type="button"
          name="button"
          value="submit"
          onClick={() => fetchData()}
        />
      </div>
      {data && data.length > 0 && (
        <div className="wrapper">
          <div className="overflowTable">
            <table className="dataTable">
              <thead>
                <tr>
                  <th align="center">Sr. No</th>
                  <th align="center">Contract</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item}>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {index}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data && data.length === 0 && <div>No common contracts </div>}
    </main>
  );
}
