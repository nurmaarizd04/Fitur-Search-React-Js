import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Forms } from "../../Components";

function EditProduct() {
  const [datas, setDatas] = useState([]);
  const [stateNamaProduk, setStateNamaProduk] = useState("");
  const [stateHarga, setStateHarga] = useState("");
  const [stateStock, setStateStock] = useState("");
  const [namaProdukError, setNamaProdukError] = useState("");
  const history = useHistory();

  // GET DATA BY ID
  const { id } = useParams();
  const getDataById = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/product/${id}`);
      setStateNamaProduk(response.data.namaProduk);
      setStateHarga(response.data.harga);
      setStateStock(response.data.stok);
      // console.log(response.data.namaProduk);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let namaProduk = "";
    let isValid = true;

    // cek data yang di edit tidak boleh kosong
    if (stateNamaProduk.trim().length == "") {
      namaProduk = "Data tidak boleh kosong!";
      isValid = false;
    }

    // Jika TRUE
    console.log(isValid);
    if (isValid) {
      const data = {
        namaProduk: stateNamaProduk,
        harga: Number(stateHarga),
        stok: Number(stateStock),
      };

      try {
        await axios.put(`http://localhost:3004/product/${id}`, data);
        Swal.fire("Succes!", "Data berhasil diEdit!", "success");
        History();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Dat tidak berhasil di simpan!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.log(error.message);
      }
    }
    setNamaProdukError(namaProduk);
  };

  const History = () => {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  useEffect(() => {
    getDataById();
  }, []);

  return (
    <div className="mt-[80px] mx-16">
      <Link to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </Link>
      <div>
        <h1 className="text-center">Edit Produk</h1>
        <form className="lg:mx-72" onSubmit={handleSubmit}>
          <Forms
            name={"namaProduk"}
            label={"Nama Produk"}
            placeholder={"Masukan nama produk"}
            type={Text}
            value={stateNamaProduk}
            onChange={(e) => setStateNamaProduk(e.target.value)}
            message={namaProdukError}
          />
          <Forms
            label={"Harga"}
            placeholder={"Masukan harga"}
            type={"number"}
            value={stateHarga}
            onChange={(e) => setStateHarga(e.target.value)}
          />
          <Forms
            label={"Stock Barang"}
            placeholder={"Masukan stock barang"}
            type={"number"}
            value={stateStock}
            onChange={(e) => setStateStock(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <Button
              variant={"info"}
              size={"md"}
              text={"Submit"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
