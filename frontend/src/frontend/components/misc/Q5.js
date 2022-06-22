import { useEffect, useState } from "react";

const axios = require("axios");

export default function Q5() {
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState([]);
  const [data, setData] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [countMintedNOt, setCountMintedNOt] = useState([]);
  const [countMintedNOtPrice, setCountMintedNOtPrice] = useState();
  const [mintedPrice, setMintedPrice] = useState([]);
  const [price, setPrice] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    var response = await axios.post("/Q5", { address: address1 });
    var result = response.data;
    console.log(result);
    console.log(result.countMintedNOt);
    console.log(result.arr2);
    setData(result.data);
    setArr2(result.arr2);
    setPrice(result.price);
    setCountMintedNOt(result.countMintedNOt);
    setCountMintedNOtPrice(result.countMintedNOtPrice);
    setMintedPrice(result.MintedPrice);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Q5</h2>
      <div
        className="wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="address1"
          id="address1"
          placeholder="Enter Contract Address"
          onChange={(e) => setAddress1(e.target.value)}
        />

        <input
          type="button"
          name="button"
          value="submit"
          onClick={() => fetchData()}
        />
      </div>
      {data && data.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead className="text-primary">
              <th>ID</th>
              <th>tokenId</th>
              <th>Mint Date</th>
              <th>wallet from</th>
              <th>wallet to</th>
              <th>First tranfer to</th>
              <th>amount</th>
              <th>First Transfer</th>
              <th>gas</th>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.tokenID}</td>
                  <td>
                    {new Date(item.timeStamp * 1000).toLocaleString("en-gb", {
                      day: "numeric",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  {arr2 && arr2.length > 0 ? (
                    arr2.map((item2, index2) => {
                      if (item.tokenID === item2) {
                        console.log(item.tokenID);
                        console.log(item2);
                        console.log(index2);
                        console.log(countMintedNOt);
                        console.log(countMintedNOt[index2]);
                        return <td>{countMintedNOt[index2].to}</td>;
                      }
                      return <td>{String(NaN)}</td>;
                    })
                  ) : (
                    <td>{String(NaN)}</td>
                  )}
                  <td>{mintedPrice[index] / 10 ** 18}</td>
                  {arr2 && arr2.length > 0 ? (
                    arr2.map((item3, index3) => {
                      if (item.tokenID === item3) {
                        console.log(countMintedNOt[index3]);
                        return (
                          <td>
                            {new Date(
                              countMintedNOt[index3].timeStamp * 1000
                            ).toLocaleString("en-gb", {
                              day: "numeric",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                        );
                      }
                      return <td>{String(NaN)}</td>;
                    })
                  ) : (
                    <td>{String(NaN)}</td>
                  )}
                  <td>{item.gas}</td>
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
