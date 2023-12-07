import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TransactionReturn = () => {
  const navigate = useNavigate();
  const [reasons, setReasons] = useState({
    barangTidakSesuai: false,
    terdapatKerusakan: false,
    jumlahYangDiterimaKurang: false,
    masalahLainnya: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setReasons({ ...reasons, [name]: checked });
    } else {
      setReasons({ ...reasons, [name]: value });
    }
  };

  const handleAjukan = () => {
    // Menyiapkan pesan yang akan ditampilkan di pop-up
    let message = "Alasan pengembalian:";
    if (reasons.barangTidakSesuai) message += "\n- Barang tidak sesuai";
    if (reasons.terdapatKerusakan) message += "\n- Terdapat kerusakan";
    if (reasons.jumlahYangDiterimaKurang)
      message += "\n- Jumlah yang diterima kurang";
    if (reasons.masalahLainnya.trim() !== "") {
      message += `\n- ${reasons.masalahLainnya}`;
    }

    // Menampilkan pop-up SweetAlert
    Swal.fire({
      icon: "success",
      title:
        '<span style="font-size: 16px; color: green;">Pengajuan berhasil dikirim</span>',
      showConfirmButton: false,
      width: "300px",
      timer: "3000",
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
            Pengajuan Pengembalian
          </p>
        </div>

        <div className="mx-5 mt-5">
          <p className="fw-bold mb-4" style={{ fontSize: "13px" }}>
            Mohon berikan informasi terhadap barang yang ingin anda return
          </p>
          <form>
            <div className="mb-2">
              <label
                className="d-flex align-items-center"
                style={{ fontSize: "13px" }}
              >
                <input
                  className="me-2"
                  type="checkbox"
                  name="barangTidakSesuai"
                  checked={reasons.barangTidakSesuai}
                  onChange={handleChange}
                  style={{ width: "20px", height: "20px" }}
                />
                Barang tidak sesuai
              </label>
            </div>
            <div className="mb-2">
              <label
                className="d-flex align-items-center"
                style={{ fontSize: "13px" }}
              >
                <input
                  className="me-2"
                  type="checkbox"
                  name="terdapatKerusakan"
                  checked={reasons.terdapatKerusakan}
                  onChange={handleChange}
                  style={{ width: "20px", height: "20px" }}
                />
                Terdapat kerusakan
              </label>
            </div>
            <div className="mb-2">
              <label
                className="d-flex align-items-center"
                style={{ fontSize: "13px" }}
              >
                <input
                  className="me-2"
                  type="checkbox"
                  name="jumlahYangDiterimaKurang"
                  checked={reasons.jumlahYangDiterimaKurang}
                  onChange={handleChange}
                  style={{ width: "20px", height: "20px" }}
                />
                Jumlah yang diterima kurang
              </label>
            </div>
            <div className="mb-3 mt-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
                style={{ fontSize: "15px" }}
              >
                Masalah lainnya:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                style={{ border: "2px solid #2B2A4C" }}
              ></textarea>
            </div>

            <div className="d-grid gap-2 mt-5">
              <button
                className="btn text-white fw-bold"
                type="button"
                onClick={handleAjukan}
                style={{ backgroundColor: "#B31312" }}
              >
                Ajukan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionReturn;
