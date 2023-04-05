import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Forms } from "../../Components";

function AddProduct() {
  const [stateNamaProduk, setStateNamaProduk] = useState("");
  const [stateHarga, setStateHarga] = useState("");
  const [stateStock, setStateStock] = useState("");
  const [stateNamaProdukError, setStateNamaProdukError] = useState("");
  const [stateHargaError, setStateHargaError] = useState("");
  const [stateStockError, setStateStockError] = useState("");

  // VALIDATE FORM
  const validateForm = () => {
    let namaProduk = "";
    let harga = "";
    let stock = "";
    let isValid = true;

    // cek jika namaProduk, harga, stock itu tidak boleh kosong
    if (stateNamaProduk.trim().length == "") {
      namaProduk = "Nama produk tidak boleh kosong.";
      isValid = false;
    }
    if (stateHarga.trim().length == "") {
      harga = "Harga tidak boleh kosong.";
      isValid = false;
    }
    if (stateStock.trim().length == "") {
      stock = "Stock barang tidak boleh kosong.";
      isValid = false;
    }

    setStateNamaProdukError(namaProduk);
    setStateHargaError(harga);
    setStateStockError(stock);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // cek validasi jiak sudah bener atau sudah TRUE
    const isValid = validateForm();
    if (isValid) {
      const data = {
        namaProduk: stateNamaProduk,
        harga: Number(stateHarga),
        stok: Number(stateStock),
      };
      try {
        await axios.post(`http://localhost:3004/product`, data);
        ClearState();
        Swal.fire("Succes!", "Data berhasil disimpan!", "success");
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
  };

  const ClearState = () => {
    setStateNamaProduk("");
    setStateHarga("");
    setStateStock("");
  };

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
        <h1 className="text-center">Add Produk</h1>
        <form className="lg:mx-72" onSubmit={handleSubmit}>
          <Forms
            label={"Nama Produk"}
            placeholder={"Masukan nama produk"}
            type={Text}
            value={stateNamaProduk}
            onChange={(e) => setStateNamaProduk(e.target.value)}
            message={stateNamaProdukError}
          />
          <Forms
            label={"Harga"}
            placeholder={"Masukan harga"}
            type={"number"}
            value={stateHarga}
            onChange={(e) => setStateHarga(e.target.value)}
            message={stateHargaError}
          />
          <Forms
            label={"Stock Barang"}
            placeholder={"Masukan stock barang"}
            type={"number"}
            value={stateStock}
            onChange={(e) => setStateStock(e.target.value)}
            message={stateStockError}
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

export default AddProduct;
