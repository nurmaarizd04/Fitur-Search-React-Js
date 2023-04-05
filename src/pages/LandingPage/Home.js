import axios from "axios";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FectAxios from "../../Axios/FectAxios";
import { Button, InputSearch } from "../../Components";

function Home() {
  const { data, loading, error } = FectAxios(`http://localhost:3004/product`);
  const [search, setSearch] = useState("");

  // CRUD
  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Apahkah anda yakin?",
        text: "data yang dihapus tidak dapat di lihat kembali",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3004/product/${id}`);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          Refresh();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const Refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1100);
  };

  if (error) {
    return <h1 className="text-center mt-10 text-red-500">{error}</h1>;
  } else if (loading) {
    return (
      <div className="mt-[80px] mx-16">
        {loading && <h1 className="text-center mt-10">Loading...</h1>}
      </div>
    );
  } else {
    return (
      <div className="mt-[80px] mx-16">
        <h1 className="text-center mt-10">Fitur Search</h1>
        <div className="flex items-center justify-center mt-10 space-x-6">
          <InputSearch
            handleChange={(e) => setSearch(e.target.value)}
            placeholder={`Cari Nama Produk...`}
          />
          <div>
            <Link to={`/produk/add`}>
              <Button
                variant={"primary"}
                size={"md"}
                text={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                }
              />
            </Link>
          </div>
        </div>
        <Table className="mt-[50px] container" striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Stok</th>
              <th></th>
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
                  <td className="flex justify-content-center space-x-5">
                    <Link to={`/produk/edit/${item.id}`}>
                      <Button variant={"info"} size={"sm"} text={"Edit"} />
                    </Link>
                    <Button
                      variant={"danger"}
                      size={"sm"}
                      text={"Delete"}
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Home;
