import React, { useState, useEffect } from "react";
import { productList } from "../../services/product";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderReview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productList();
        if (response && Array.isArray(response.payload)) {
          const updatedProducts = response.payload.map((product) => ({
            ...product,
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
          Penilaian Pesanan
        </p>
      </div>

      <div className="selesai container p-1 mt-0 rounded">
        <div className="row g-2 justify-content-center">
          {" "}
          {/* Menggunakan justify-content-center */}
          {products.map((product) => (
            <div
              key={product._id}
              className="card mb-1 py-3 px-2 border border-0"
              style={{
                boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)",
                width: "350px",
              }}
            >
              <Link
                to={`/homepage/dashboard/riwayat/penilaian/detail/${product._id}`}
                className="text-decoration-none"
              >
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-2 col-md-2 d-flex align-items-center">
                    <img
                      src={product.image || defaultImageUrl}
                      alt={product.nama_produk}
                      className="rounded"
                      style={{ height: "60px", width: "60px" }}
                    />
                  </div>
                  <div className="col-10 col-md-10">
                    <div className="card-body d-flex justify-content-between align-items-center p-0 ps-3">
                      <div>
                        <h5
                          style={{ fontSize: "14px", color: "#2B2A4C" }}
                          className="card-title fw-bold"
                        >
                          {product.nama_produk}
                        </h5>
                        <div className="d-flex">
                          <Icon
                            icon="tabler:star-filled"
                            color="#ea906c"
                            width="20"
                            height="20"
                          />
                          <Icon
                            icon="tabler:star-filled"
                            color="#ea906c"
                            width="20"
                            height="20"
                          />
                          <Icon
                            icon="tabler:star-filled"
                            color="#ea906c"
                            width="20"
                            height="20"
                          />
                          <Icon
                            icon="tabler:star-filled"
                            color="#ea906c"
                            width="20"
                            height="20"
                          />
                          <Icon
                            icon="tabler:star"
                            color="#ea906c"
                            width="20"
                            height="20"
                          />
                        </div>
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

export default OrderReview;
