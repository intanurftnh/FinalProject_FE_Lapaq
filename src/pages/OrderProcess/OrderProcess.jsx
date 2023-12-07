import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { productList } from "../../services/product";
import { getOrderSeller } from "../../services/order";
import { productId } from "../../services/product";
import { getUserTokenSeller } from "../../utils/jwt";
import { Link } from "react-router-dom";

const OrderProcess = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("kemas");
  const [tokenUserSeller, setTokenUserSeller] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenUserData = getUserTokenSeller();
        setTokenUserSeller(tokenUserData);

        const token = tokenUserData.token;
        const userSellerId = tokenUserData.user_id;

        const response = await getOrderSeller(userSellerId, token);
        if (response && Array.isArray(response.payload)) {
          const updatedProducts = await Promise.all(
            response.payload.map(async (product) => {
              const productDetails = await productId(product.product_id);
              return {
                ...productDetails,
                buttonTextKirim: "Kirim",
                buttonTextKemas: "Kemas",
              };
            })
          );
          setProducts(updatedProducts);
          console.log(products);
        } else {
          console.error(
            "Data produk tidak ditemukan atau bukanlah array:",
            response
          );
        }
      } catch (error) {
        console.error("Gagal mengambil data dari server:", error);
      }
    };

    fetchData();
  }, []);

  const handleKemasAction = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        product.buttonTextKemas = "Di Kemas"; // Mengubah teks tombol
      }
      return product;
    });
    setProducts(updatedProducts);
    setActiveFilter("kemas");
  };

  const handleKirimAction = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        product.buttonTextKirim = "Dikirim"; // Mengubah teks tombol
      }
      return product;
    });
    setProducts(updatedProducts);
    setActiveFilter("kirim");
  };

  const defaultImageUrl = "https://i.imgur.com/2a0RWOy.jpg";

  const buttonStyle = {
    common: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: "5px",
    },
    active: {
      color: "#fff",
      backgroundColor: "#2B2A4C",
    },
    inactive: {
      color: "#2B2A4C",
      backgroundColor: "#fff",
    },
  };

  return (
    <>
      <div
        className="pt-4 pb-1"
        style={{
          boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)",
          marginBottom: "3px",
        }}
      >
        <p className="text-center fs-6 fw-bold" style={{ color: "#B31312" }}>
          Pemrosesan Pesanan
        </p>
      </div>
      <div className="filter-buttons d-flex justify-content-around mt-3 mb-0">
        <button
          onClick={() => setActiveFilter("kemas")}
          style={
            activeFilter === "kemas"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Kemas
        </button>
        <button
          onClick={() => setActiveFilter("kirim")}
          style={
            activeFilter === "kirim"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Kirim
        </button>
        <button
          onClick={() => setActiveFilter("selesai")}
          style={
            activeFilter === "selesai"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Selesai
        </button>
      </div>

      <div
        className="kemas container m-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "kemas" ? "block" : "none",
          border: "1px solid #2b2a4c",
          width: "340px",
        }}
      >
        <div className="row g-2 px-2">
          {products.map((product) => (
            <div
              className="card mb-1 py-3 px-2 border border-0"
              key={product._id}
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="row g-0 d-flex align-items-center">
                <div className="col-md-2 d-flex align-items-center">
                  <img
                    src={product.payload.image || defaultImageUrl}
                    alt={product.payload.nama_produk}
                    className="rounded"
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body d-flex justify-content-between align-items-center p-0 ps-3">
                    <div>
                      <h5
                        style={{ fontSize: "14px" }}
                        className="card-title fw-bold"
                      >
                        {product.payload.nama_produk}
                      </h5>
                      <p
                        className="card-text"
                        style={{ color: "#2B2A4C", fontSize: "14px" }}
                      >
                        <span>Rp </span>
                        {product.payload.harga}
                      </p>
                    </div>
                    {activeFilter === "kemas" && (
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => handleKemasAction(product._id)}
                          className="btn btn-sm fw-bold text-white"
                          style={{
                            backgroundColor: "#B31312",
                            fontSize: "10px",
                            width: "70px",
                          }}
                        >
                          {product.buttonTextKemas}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="kirim container m-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "kirim" ? "block" : "none",
          border: "1px solid #2b2a4c",
          width: "340px",
        }}
      >
        <div className="row g-2 px-2">
          {products.map((product) => (
            <div
              className="card mb-1 py-3 px-2 border border-0"
              key={product._id}
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="row g-0 d-flex align-items-center">
                <div className="col-md-2 d-flex align-items-center">
                  <img
                    src={product.payload.image || defaultImageUrl}
                    alt={product.payload.nama_produk}
                    className="rounded"
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body d-flex justify-content-between align-items-center p-0 ps-3">
                    <div>
                      <h5
                        style={{ fontSize: "14px" }}
                        className="card-title fw-bold"
                      >
                        {product.payload.nama_produk}
                      </h5>
                      <p
                        className="card-text"
                        style={{ color: "#2B2A4C", fontSize: "14px" }}
                      >
                        <span>Rp </span>
                        {product.payload.harga}
                      </p>
                    </div>
                    {activeFilter === "kirim" && (
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => handleKirimAction(product._id)}
                          className="btn btn-sm fw-bold text-white"
                          style={{
                            backgroundColor: "#B31312",
                            fontSize: "10px",
                            width: "70px",
                          }}
                        >
                          {product.buttonTextKirim}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="selesai container m-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "selesai" ? "block" : "none",
          border: "1px solid #2b2a4c",
          width: "340px",
        }}
      >
        <div className="row g-2 px-2">
          {products.map((product) => (
            <div
              key={product._id}
              className="card mb-1 py-3 px-2 border border-0"
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <Link
                to={`/homepage/dashboard/riwayat/pemrosesan/selesai`}
                className="text-decoration-none"
              >
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-2 d-flex align-items-center">
                    <img
                      src={product.payload.image || defaultImageUrl}
                      alt={product.payload.nama_produk}
                      className="rounded"
                      style={{ height: "60px", width: "60px" }}
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body d-flex justify-content-between align-items-center p-0 ps-3">
                      <div>
                        <h5
                          style={{ fontSize: "14px", color: "#2B2A4C" }}
                          className="card-title fw-bold"
                        >
                          {product.payload.nama_produk}
                        </h5>
                        <p
                          className="card-text"
                          style={{ color: "#2B2A4C", fontSize: "14px" }}
                        >
                          <span>Rp </span>
                          {product.payload.harga}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderProcess;
