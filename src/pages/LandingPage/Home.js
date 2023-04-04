import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import FectAxios from "../../Axios/FectAxios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Home() {
  const [search, setSearch] = useState("");

  // GET
  const { data, loading, error } = FectAxios(`http://localhost:3004/product`);
  console.log(search);

  if (error) {
    return <h1 className="text-center mt-10 text-red-500">{error}</h1>;
  } else {
    return (
      <div>
        {loading && <h1 className="text-center mt-10">Loading...</h1>}
        <h1 className="text-center mt-10">Fitur Sea</h1>
        <InputGroup className="mt-[80px] container ">
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Table className="mt-[50px] container" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.namaProduk.toLowerCase().includes(search);
              })
              .map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.namaProduk}</td>
                  <td>{item.harga}</td>
                  <td>{item.stok}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Home;
