import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TransactionReview = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title:
        '<span style="font-size: 16px; color: green;">Berhasil dikirim</span>',
      showConfirmButton: false,
      width: "300px",
      timer: 2000,
    });
    navigate("/homepage/transaksi");
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#B31312",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "12px",
      }}
    >
      <div
        className="container-md p-0 pb-5"
        style={{ maxWidth: "390px", backgroundColor: "white", margin: "auto" }}
      >
        <div
          className="pt-4 pb-1"
          style={{
            boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)",
            marginBottom: "3px",
          }}
        >
          <p className="text-center fs-6 fw-bold" style={{ color: "#B31312" }}>
            Nilai Produk
          </p>
        </div>

        <div className="my-5 mx-4">
          <form onSubmit={handleSubmit} style={{ fontSize: "14px" }}>
            <div className="mb-4">
              <label htmlFor="nama" className="form-label fw-bold">
                Nama
              </label>
              <input
                className="form-control"
                id="nama"
                type="text"
                name="nama"
                style={{ border: "2px solid #2B2A4C" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="form-label fw-bold">
                Deskripsi
              </label>
              <textarea
                className="form-control"
                id="deskripsi"
                name="deskripsi"
                row="3"
                style={{ border: "2px solid #2B2A4C" }}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="form-label fw-bold">
                Rating
              </label>
              <input
                className="form-control"
                id="rating"
                type="number"
                name="rating"
                style={{ border: "2px solid #2B2A4C" }}
              />
              <div id="passwordHelpBlock" className="form-text">
                contoh rating : 5.0 (min 0.0 dan max 5.0)
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="formFile" className="form-label fw-bold">
                Gambar produk
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                style={{ border: "2px solid #2B2A4C" }}
              />
            </div>

            <div className="d-grid gap-2 mt-5">
              <button
                className="btn text-white fw-bold"
                type="submit"
                style={{ backgroundColor: "#B31312" }}
              >
                Kirim Komentar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionReview;
