import React, { useState, useEffect } from "react";
import { getOrder } from "../../services/order";
import { productId } from "../../services/product";
import { getUserToken } from "../../utils/jwt";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TransactionOrder = () => {
  const [products, setProducts] = useState([]);
  const [tokenUser, setTokenUser] = useState();
  const [activeFilter, setActiveFilter] = useState("Bayar");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenUserData = getUserToken();
        setTokenUser(tokenUserData);

        const token = tokenUserData.token;
        const userBuyerId = tokenUserData.user._id;

        const response = await getOrder(userBuyerId, token);
        if (response && Array.isArray(response.payload)) {
          const updatedProducts = await Promise.all(
            response.payload.map(async (product) => {
              const productDetails = await productId(product.product_id);
              return {
                ...productDetails,
                buttonTextReturn: "Return",
                buttonTextBayar: "Bayar",
                buttonTextNilai: "Nilai",
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

  const handleBayarAction = (index) => {
    const updatedProducts = products.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          buttonTextBayar: "Di Bayar", // Ubah properti buttonTextBayar
        };
      }
      return product;
    });

    Swal.fire({
      icon: "success",
      title:
        '<span style="font-size: 16px; color: green;">Pembayaran berhasil</span>',
      showConfirmButton: false,
      width: "300px",
      timer: "3000",
    });

    setProducts(updatedProducts);
    setActiveFilter("Bayar");
  };

  const handleReturnAction = (index) => {
    const updatedProducts = products.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          buttonTextBayar: "Di Return", // Ubah properti buttonTextBayar
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setActiveFilter("Return");
  };

  const handleNilaiAction = (index) => {
    const updatedProducts = products.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          buttonTextBayar: "Nilai", // Ubah properti buttonTextBayar
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setActiveFilter("Nilai");
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
      backgroundColor: "#B31312",
    },
    inactive: {
      color: "#B31312",
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
          Transaksi
        </p>
      </div>
      <div className="filter-buttons d-flex justify-content-around mt-3 mb-0">
        <button
          onClick={() => setActiveFilter("Bayar")}
          style={
            activeFilter === "Bayar"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Bayar
        </button>
        <button
          onClick={() => setActiveFilter("Return")}
          style={
            activeFilter === "Return"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Return
        </button>
        <button
          onClick={() => setActiveFilter("Nilai")}
          style={
            activeFilter === "Nilai"
              ? { ...buttonStyle.common, ...buttonStyle.active }
              : { ...buttonStyle.common, ...buttonStyle.inactive }
          }
        >
          Nilai
        </button>
      </div>

      <div
        className="bayar container mt-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "Bayar" ? "block" : "none",
          width: "360px",
        }}
      >
        <div className="row g-2 mx-1">
          {products.map((product, index) => (
            <div
              className="card mb-1 py-3 px-2 border border-0"
              key={index}
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
                    {activeFilter === "Bayar" && (
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => handleBayarAction(product._id)}
                          className="btn btn-sm fw-bold text-white"
                          style={{
                            backgroundColor: "#2B2A4C",
                            fontSize: "10px",
                            width: "70px",
                          }}
                        >
                          {product.buttonTextBayar}
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
        className="return container mt-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "Return" ? "block" : "none",
          width: "360px",
        }}
      >
        <div className="row g-2 px-1">
          {products.map((product, index) => (
            <div
              className="card mb-1 py-3 px-2 border border-0"
              key={index}
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <Link
                to="/homepage/transaksi/return"
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
                          style={{ fontSize: "14px" }}
                          className="card-title fw-bold text-black"
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
                      {activeFilter === "Return" && (
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => handleReturnAction(product._id)}
                            className="btn btn-sm fw-bold text-white"
                            style={{
                              backgroundColor: "#2B2A4C",
                              fontSize: "10px",
                              width: "70px",
                            }}
                          >
                            {product.buttonTextReturn}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div
        className="nilai container mt-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "Nilai" ? "block" : "none",
          width: "360px",
        }}
      >
        <div className="row g-2 px-1">
          {products.map((product, index) => (
            <div
              key={index}
              className="card mb-1 py-3 px-2 border border-0"
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <Link
                to="/homepage/transaksi/review"
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
                      {activeFilter === "Nilai" && (
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => handleNilaiAction(product._id)}
                            className="btn btn-sm fw-bold text-white"
                            style={{
                              backgroundColor: "#2B2A4C",
                              fontSize: "10px",
                              width: "70px",
                            }}
                          >
                            {product.buttonTextNilai}
                          </button>
                        </div>
                      )}
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

export default TransactionOrder;
