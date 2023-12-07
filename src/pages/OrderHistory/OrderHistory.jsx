import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { productList } from "../../services/product";

const OrderHistory = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    fetchData("kemas");
  }, []);

  const fetchData = async (filter) => {
    try {
      const response = await productList(filter);
      if (response) {
        setProducts(response.payload);
        setActiveFilter(filter);
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

  const filterIcons = [
    { id: "kemas", icon: "icon-park-outline:transaction-order" },
    { id: "kirim", icon: "basil:location-outline" },
    { id: "selesai", icon: "ant-design:file-done-outlined" },
  ];

  const handleFilterClick = (filter) => {
    fetchData(filter);
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
          Riwayat pemesanan
        </p>
      </div>

      <div className="container mt-5">
        <div className="row">
          {filterIcons.map((filterIcon) => (
            <div
              key={filterIcon.id}
              className="col-4 d-flex justify-content-center align-items-center"
            >
              <button
                className="btn btn-lg btn-block mb-3 rounded-circle"
                style={{
                  backgroundColor:
                    activeFilter === filterIcon.id ? "#B31312" : "#EEE2DE",
                  color: activeFilter === filterIcon.id ? "#FFFFFF" : "#B31312",
                  width: "60px",
                  height: "60px",
                }}
                onClick={() => handleFilterClick(filterIcon.id)}
              >
                <Icon icon={filterIcon.icon} width="25" />
              </button>
            </div>
          ))}
        </div>

        {activeFilter === "kemas" && (
          <div className="row m-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card d-flex align-items-center rounded mb-3 py-1 px-2"
                style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="image">
                  <img
                    className="rounded"
                    src={product.image}
                    alt={product.nama_produk}
                    width="70px"
                    height="70px"
                  />
                </div>
                <div className="title ms-3" style={{ width: "225px" }}>
                  <h3
                    className="fs-6 mb-2 fw-bold"
                    style={{ color: "#2B2A4C" }}
                  >
                    {product.nama_produk}
                  </h3>
                  <div style={{ color: "#ea906c" }}>
                    <p className="mb-0">
                      <span>Rp </span>
                      {product.harga}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p style={{ color: "#2B2A4C" }}>
                      Produk sedang di kemas penjual
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeFilter === "kirim" && (
          <div className="row m-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card d-flex align-items-center rounded mb-3 py-1 px-2"
                style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="image">
                  <img
                    className="rounded"
                    src={product.image}
                    alt={product.nama_produk}
                    width="70px"
                    height="70px"
                  />
                </div>
                <div className="title ms-3" style={{ width: "225px" }}>
                  <h3
                    className="fs-6 mb-2 fw-bold"
                    style={{ color: "#2B2A4C" }}
                  >
                    {product.nama_produk}
                  </h3>
                  <div style={{ color: "#ea906c" }}>
                    <p className="mb-0">
                      <span>Rp </span>
                      {product.harga}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p style={{ color: "#2B2A4C" }}>Produk sedang di kirim</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeFilter === "selesai" && (
          <div className="row m-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card d-flex align-items-center rounded mb-3 py-1 px-2"
                style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="image">
                  <img
                    className="rounded"
                    src={product.image}
                    alt={product.nama_produk}
                    width="70px"
                    height="70px"
                  />
                </div>
                <div className="title ms-3" style={{ width: "225px" }}>
                  <h3
                    className="fs-6 mb-2 fw-bold"
                    style={{ color: "#2B2A4C" }}
                  >
                    {product.nama_produk}
                  </h3>
                  <div style={{ color: "#ea906c" }}>
                    <p className="mb-0">
                      <span>Rp </span>
                      {product.harga}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p style={{ color: "#2B2A4C" }}>Produk telah diterima</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
