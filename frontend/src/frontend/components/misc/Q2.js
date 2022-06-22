import { useEffect, useState } from "react";

const axios = require("axios");

export default function Q2() {
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState([]);
  const [address2, setAddress2] = useState([]);
  const [data, setData] = useState([]);
  const [eths, setEths] = useState();
  const [countMinted, setCountMinted] = useState();
  const [price, setPrice] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    var response = await axios.post("/Q2", {
      ethAdd: address1,
      address: address2,
    });
    var result = response.data;
    setData(result.data);
    setCountMinted(result.countMinted);
    setEths(result.eths);
    setPrice(result.price);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Q2</h2>
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
      {eths && <h1>The Ether Balance is {eths}</h1>}
      {countMinted && <h1>Number of minted NFTS are {countMinted}</h1>}
      {data && data.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead className="text-primary">
              <th>ID</th>
              <th>tokenId</th>
              <th>tokenName</th>
              <th>contractAddress</th>
              <th>gas(Wei)</th>
              <th>Price</th>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.tokenID}</td>
                  <td>{item.tokenName}</td>
                  <td>{item.contractAddress}</td>
                  <td>{item.gas}</td>
                  <td>{price[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && data.length === 0 && <div>No common contracts </div>}
    </main>
  );
}
