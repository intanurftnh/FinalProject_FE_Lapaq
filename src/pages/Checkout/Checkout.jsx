import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { productId } from "../../services/product";
import { addOrder } from "../../services/order";
import { getUserToken } from "../../utils/jwt";

function Checkout() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [tokenUser, setTokenUser] = useState(null);
  const { _id } = useParams();
  const [product, setProduct] = useState({
    harga: "",
  });
  const hargaProduk = parseFloat(product.harga);
  const totalHarga = hargaProduk + 10000;

  useEffect(() => {
    const tokenUserData = getUserToken();
    console.log(tokenUserData);
    setTokenUser(tokenUserData);
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [_id]);

  const getProductDetails = async () => {
    try {
      const productData = await productId(_id);
      if (productData) {
        setProduct(productData.payload); // Menyimpan data produk ke state
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageError = (event) => {
    event.target.src = "https://i.imgur.com/2a0RWOy.jpg";
  };

  const handlePaymentMetodeChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const createOrder = async () => {
    const body = {
      user_buyer_id: tokenUser.user._id,
      user_seller_id: product.seller_id,
      product_id: product._id,
      metode_pembayaran: selectedPayment,
      status_order: "completed",
    };

    const result = await addOrder(body, tokenUser.token);
    if (result) {
      Swal.fire({
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Berhasil checkout</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });

      navigate("/homepage/transaksi");
    } else {
      Swal.fire({
        icon: "question",
        title:
          '<span style="font-size: 16px; color: blue;">Pilih metode pembayaran</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
    }
  };

  return (
      <div>
      <div
        className="container d-flex flex-column justify-content-between px-4"
        style={{
          maxWidth: "390px",
          backgroundColor: "white",
          height: "100%",
          paddingTop: "1vh",
          paddingBottom: "5vh",
        }}
      >
        <div className="pt-4">
          <h2 className="fw-semibold">Alamat</h2>
        </div>

        <div className="d-flex justify-content-between align-items-center container-md p-0 m-0">
          <div>
            <p className="m-0 lh" style={{ fontSize: "14px" }}>
              {tokenUser && tokenUser.user && tokenUser.user.alamat
                ? tokenUser.user.alamat
                : "Alamat tidak tersedia"}
            </p>
          </div>
          {/*<div>
            <button
              className="btn btn-sm"
              style={{ backgroundColor: "#2B2A4C", color: "white" }}
            >
              Tambah
            </button>
          </div>*/}
        </div>

        {/*<div className="d-flex justify-content-between align-items-center container-md mt-4 p-0 mb-2">
          <div>
            <p className="mb-0">Gunakan alamat default</p>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked
              disabled
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            ></label>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "rgb(169, 169, 169)",
          }}
        ></div>*/}

        <div className="d-flex align-items-center py-3">
          <div className="image">
            <img
              className="rounded"
              src={product.image}
              alt={product.nama_produk}
              width="70px"
              height="70px"
              onError={handleImageError}
            />
          </div>
          <div className="title ms-3 me-0" style={{ width: "250px" }}>
            <h3 className="fs-6 mb-2 fw-bold" style={{ color: "#2B2A4C" }}>
              {product.nama_produk}
            </h3>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">
                  <span>Rp </span>
                  {product.harga}
                </p>
              </div>
              <div>
                <p className="mb-0"> x1</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="m-1" />

        <div className="d-flex justify-content-between align-items-center container-md m-0 pt-2 px-0">
          <div className="align-items-center">
            <p className="fw-bolder mb-0">Harga Produk</p>
          </div>
          <div id="total" className="align-items-center fw-bold">
            Rp {product.harga}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center container-md m-0 p-0">
          <div className="align-items-center">
            <p className="fw-bolder mb-0">Ongkos Kirim</p>
          </div>
          <div id="ongkir" className="align-items-center fw-bold m-0 p-0">
            Rp 10000
          </div>
        </div>

        <div
          className="d-flex justify-content-between align-items-center container-md m-0 py-2 px-0"
          style={{ color: "#EA906C", fontSize: "16px" }}
        >
          <div className="align-items-center">
            <p className="fw-bolder mb-0">Total Harga</p>
          </div>
          <div id="total" className="align-items-center fw-bold">
            Rp {totalHarga}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "4px",
            backgroundColor: "rgb(169, 169, 169)",
          }}
        ></div>

        <div className="mt-3" style={{ fontSize: "14px" }}>
          <h2 style={{ fontSize: "20px" }} className="fw-semibold mb-3">
            Bayar dengan metode
          </h2>
          <div className="d-flex justify-content-between align-items-center container-md mb-2 p-0">
            <div>
              <img src="https://i.imgur.com/yv0ZxCG.png" alt="" width="70" />
              <span className="ms-2">Bank Republik Indonesia</span>
            </div>
            <div>
              <input
                className="form-check-input radio"
                type="radio"
                name="flexRadioDefault"
                value="Bank Republik Indonesia"
                id="flexRadioDefault1"
                onChange={handlePaymentMetodeChange}
                checked={selectedPayment === "Bank Republik Indonesia"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center container-md mb-2 p-0">
            <div>
              <img src="https://i.imgur.com/vMyEaFH.png" alt="" width="70" />
              <span className="ms-2">Bank Central Asia</span>
            </div>
            <div>
              <input
                className="form-check-input radio"
                type="radio"
                name="flexRadioDefault"
                value="Bank Central Asia"
                id="flexRadioDefault1"
                onChange={handlePaymentMetodeChange}
                checked={selectedPayment === "Bank Central Asia"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center container-md mb-2 p-0">
            <div>
              <img src="https://i.imgur.com/nTkl2RO.png" alt="" width="70" />
              <span className="ms-2">Qris</span>
            </div>
            <div>
              <input
                className="form-check-input radio"
                type="radio"
                name="flexRadioDefault"
                value="Qris"
                id="flexRadioDefault1"
                onChange={handlePaymentMetodeChange}
                checked={selectedPayment === "Qris"}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center container-md mb-2 p-0">
            <div>
              <img src="https://i.imgur.com/qD8cklZ.png" alt="" width="70" />
              <span className="ms-2">Bayar di tempat</span>
            </div>
            <div>
              <input
                className="form-check-input radio"
                type="radio"
                name="flexRadioDefault"
                value="Bayar di tempat"
                id="flexRadioDefault1"
                onChange={handlePaymentMetodeChange}
                checked={selectedPayment === "Bayar di tempat"}
              />
            </div>
          </div>
        </div>

        <div className="py-3 mt-4" style={{ width: "100%" }}>
          <button
            id="prosesButton"
            type="button"
            className="btn fw-semibold"
            onClick={createOrder}
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#B31312",
              color: "white",
            }}
          >
            Proses Pemesanan
          </button>
        </div>
      </div>
      </div>
  );
}

export default Checkout;
