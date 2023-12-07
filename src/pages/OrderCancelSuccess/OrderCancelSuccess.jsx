import React, { useEffect, useState } from "react";
import { productId } from "../../services/product";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderCancelSuccess = () => {
  const [product, setProduct] = useState({
    nama_produk: "",
    harga: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (_id) {
          const response = await productId(_id);
          if (response) {
            setProduct(response.payload);
          }
        } else {
          console.error("ID tidak valid");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [_id]);

  const dotStyle = {
    height: "10px",
    width: "10px",
    backgroundColor: "#EA906C",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "10px",
  };

  const listStyle = {
    listStyleType: "none",
    paddingLeft: "20px",
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#B31312",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "12px",
        height: "100vh",
      }}
    >
      <div
        className="container-md p-0 pb-5"
        style={{
          maxWidth: "390px",
          backgroundColor: "white",
          margin: "auto",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div
          className="pt-4 pb-1"
          style={{
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)",
            marginBottom: "3px",
          }}
        >
          <p className="text-center fs-6 fw-bold" style={{ color: "#B31312" }}>
            Pembatalan Selesai
          </p>
        </div>

        <div className="text-center mt-4">
          <Icon icon="lets-icons:check-fill" color="#2b2a4c" width="100" />
          <p className="fs-6 fw-bold" style={{ color: "#2B2A4C" }}>
            Pembatalan Selesai
          </p>
        </div>

        <div
          className="mx-5 mb-5 px-3 py-4 rounded"
          style={{ boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)" }}
        >
          <div style={{ color: "#2B2A4C" }}>
            <p className="mb-0 fw-bold fs-6">Rianti Kamila</p>
            <p className="mb-0 fs-0">0897 6090 0008</p>
            <p className="mb-0" style={{ fontSize: "10px" }}>
              Kp. Kenari Cahaya, Jl Kembang Sakti
            </p>
          </div>
          <div className="mt-3">
            <p className="mb-0 fw-bold fs-6">{product.nama_produk}</p>
            <p>Rp {product.harga}</p>
          </div>
          <div>
            <p className="mb-0 fw-bold fs-6">Nomor Resi</p>
            <div
              className="rounded d-flex justify-content-center align-items-center p-1"
              style={{ backgroundColor: "#EA906C", padding: "1px" }}
            >
              <p className="text-white fs-6 fw-bold mb-0">
                4528 9689 1258 9865
              </p>
            </div>
          </div>
        </div>

        <div class="d-grid gap-2 mx-5">
          <div
            className="rounded d-flex justify-content-center align-items-center py-1"
            style={{ backgroundColor: "#B31312" }}
          >
            <p className="text-white fw-bold fs-6 mb-0">
              Pesanan ditolak penjual
            </p>
          </div>
          <div
            className="rounded d-flex justify-content-center align-items-center py-1"
            style={{ backgroundColor: "#EA906C" }}
          >
            <p className="text-white fw-bold fs-6 mb-0">
              Pesanan ditolak pembeli
            </p>
          </div>
        </div>

        <div className="mx-5 mt-3">
          <p
            className="fw-bold mb-0"
            style={{ color: "#2B2A4C", fontSize: "14px" }}
          >
            Alasan penjual menolak pesanan
          </p>
          <p style={{ textAlign: "justify" }}>
            Jumlah stok yang dibeli telah habis. Mohon maaf atas
            ketidaknyamanannya, kemi ternyata belum memperbaharui jumlah stok
            produk tersebut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelSuccess;
