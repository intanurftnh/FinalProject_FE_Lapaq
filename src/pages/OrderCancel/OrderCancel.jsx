import React, { useState, useEffect } from "react";
import { productList } from "../../services/product";
import { Link } from "react-router-dom";

const OrderCancel = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Proses");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productList();
        if (response && Array.isArray(response.payload)) {
          const updatedProducts = response.payload.map((product) => ({
            ...product,
            buttonTextProses: "Proses",
          }));
          setProducts(updatedProducts);
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

  const handleProsesAction = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        product.buttonTextProses = "DiProses"; // Mengubah teks tombol
      }
      return product;
    });
    setProducts(updatedProducts);
    setActiveFilter("Proses");
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
          Pembatalan Pesanan
        </p>
      </div>
      <div className="filter-buttons d-flex justify-content-around mt-3 mb-0">
        <button
          onClick={() => setActiveFilter("Proses")}
          style={
            activeFilter === "Proses"
              ? {
                  backgroundColor: "#2B2A4C",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "5px",
                  width: "150px",
                }
              : {
                  backgroundColor: "#fff",
                  color: "#2B2A4C",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "5px",
                  width: "150px",
                  border: "none",
                }
          }
        >
          Proses
        </button>
        <button
          onClick={() => setActiveFilter("selesai")}
          style={
            activeFilter === "selesai"
              ? {
                  backgroundColor: "#2B2A4C",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "5px",
                  width: "150px",
                }
              : {
                  backgroundColor: "#fff",
                  color: "#2B2A4C",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "5px",
                  width: "150px",
                  border: "none",
                }
          }
        >
          Selesai
        </button>
      </div>
      <div
        className="proses container m-3 p-1 mt-0 rounded"
        style={{
          display: activeFilter === "Proses" ? "block" : "none",
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
                    src={product.image || defaultImageUrl}
                    alt={product.nama_produk}
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
                        {product.nama_produk}
                      </h5>
                      <p
                        className="card-text"
                        style={{ color: "#2B2A4C", fontSize: "14px" }}
                      >
                        <span>Rp </span>
                        {product.harga}
                      </p>
                    </div>
                    {activeFilter === "Proses" && (
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => handleProsesAction(product._id)}
                          className="btn btn-sm fw-bold text-white"
                          style={{
                            backgroundColor: "#B31312",
                            fontSize: "10px",
                            width: "70px",
                          }}
                        >
                          {product.buttonTextProses}
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
                to={`/homepage/dashboard/riwayat/pembatalan/selesai/${product._id}`}
                className="text-decoration-none"
              >
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-2 d-flex align-items-center">
                    <img
                      src={product.image || defaultImageUrl}
                      alt={product.nama_produk}
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
                          {product.nama_produk}
                        </h5>
                        <p
                          className="card-text"
                          style={{ color: "#2B2A4C", fontSize: "14px" }}
                        >
                          <span>Rp </span>
                          {product.harga}
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

export default OrderCancel;
