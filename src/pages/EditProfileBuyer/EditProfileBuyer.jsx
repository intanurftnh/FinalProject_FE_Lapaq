import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { buyerId, editBuyerId } from "../../services/user";
import { getUserToken } from "../../utils/jwt";

const EditProfileBuyer = () => {
  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState(null);
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    alamat: "",
  });

  useEffect(() => {
    const tokenUserData = getUserToken();
    console.log("Token User Data:", tokenUserData);
    if (!tokenUserData) {
      navigate("/welcome/sign-in");
    } else {
      setTokenUser(tokenUserData);
    }

    const fetchBuyer = async () => {
      try {
        const userBuyerId = tokenUserData.user._id;
        const response = await buyerId(userBuyerId);

        if (response) {
          console.log(response.payload);
          setFormData({
            nama_depan: response.payload.nama_depan,
            nama_belakang: response.payload.nama_belakang,
            email: response.payload.email,
            alamat: response.payload.alamat,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      }
    };

    fetchBuyer();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama_depan, nama_belakang, email, alamat } = formData;
    if (
      (!nama_depan.trim() || !nama_belakang.trim(),
      !email.trim(),
      !alamat.trim())
    ) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Form tidak boleh kosong</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
        customClass: {
          title: "custom-title-class", // Nama class untuk style khusus (opsional)
        },
      });
      return;
    }

    const userBuyerId = tokenUser.user._id;
    const response = await editBuyerId(userBuyerId, formData, tokenUser.token);
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Profile berhasil diubah</span>',
        showConfirmButton: false,
        width: "300px",
        timer: 2000,
      });
      navigate("/homepage/profile");
    } else {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal mengubah profile</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
    }
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#B31312",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "12px",
        height: "105vh",
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
            Edit Profil
          </p>
        </div>

        <div className="pt-4 px-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="nama_depan"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Depan
              </label>
              <input
                type="text"
                className="form-control"
                name="nama_depan"
                placeholder="Tidak ditemukan"
                defaultValue={formData.nama_depan}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="nama_belakang"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Belakang
              </label>
              <input
                type="text"
                className="form-control"
                name="nama_belakang"
                placeholder="Tidak ditemukan"
                defaultValue={formData.nama_belakang}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Alamat Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Tidak ditemukan"
                defaultValue={formData.email}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="alamat"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Alamat
              </label>
              <textarea
                name="alamat"
                className="form-control"
                placeholder="Tidak ditemukan"
                rows="3"
                defaultValue={formData.alamat}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C" }}
              />
            </div>

            <div className="d-grid gap-2 mt-4 mb-3">
              <button
                className="btn fw-bold text-white"
                type="submit"
                style={{ backgroundColor: "#B31312" }}
              >
                Edit Profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileBuyer;
