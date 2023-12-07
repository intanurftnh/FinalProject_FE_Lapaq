import React, { useEffect, useState } from "react";
import { productId } from "../../services/product";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderReturnSuccess = () => {
  const [product, setProduct] = useState({
    nama_produk: "",
    harga: "",
    image: "",
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
            Pengembalian Selesai
          </p>
        </div>

        <div className="text-center mt-4">
          <Icon icon="lets-icons:check-fill" color="#2b2a4c" width="100" />
          <p className="fs-6 fw-bold" style={{ color: "#2B2A4C" }}>
            Pengembalian Selesai
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

        <div className="mx-5 mt-3">
          <p
            className="fw-bold mb-0"
            style={{ color: "#2B2A4C", fontSize: "14px" }}
          >
            Alasan pembeli
          </p>
          <p style={{ textAlign: "justify" }}>
            Barang yang diterima dalam keadaan kurang baik, saya menerima
            keadaan barang yang cacat. Mungkin anda tidak melakukan penggecekan
            terlebih dahulu. Saya harap dapat mengembalikan barang ini dan
            mendapatkan uang saya kembali
          </p>
        </div>

        <div className="mx-5 mt-3">
          <p
            className="fw-bold mb-0"
            style={{ color: "#2B2A4C", fontSize: "14px" }}
          >
            Bukti keliruan
          </p>
          <div className="d-flex">
            <img
              src={product.image}
              className="rounded me-2"
              width="50px"
              height="50px"
            />
            <img
              src={product.image}
              className="rounded me-2"
              width="50px"
              height="50px"
            />
            <img
              src={product.image}
              className="rounded"
              width="50px"
              height="50px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReturnSuccess;
