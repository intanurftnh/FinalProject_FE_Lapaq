import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import Swal from "sweetalert2";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaDepan: "",
    namaBelakang: "",
    email: "",
    password: "",
    conPassword: "",
    noNIK: "",
    alamat: "",
    cbKebijakan: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      namaDepan,
      namaBelakang,
      email,
      password,
      conPassword,
      noNIK,
      alamat,
      cbKebijakan,
    } = formData;

    if (
      !namaDepan ||
      !namaBelakang ||
      !email ||
      !password ||
      !conPassword ||
      !alamat ||
      !noNIK
    ) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Form tidak boleh kosong</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title:
          '<span style="font-size: 16px; color: #EA906C;">Password harus berisi minimal 8 karakter</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    if (password !== conPassword) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Konfirmasi password tidak sama dengan password</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    if (noNIK.length !== 16 || isNaN(noNIK)) {
      Swal.fire({
        icon: "warning",
        title:
          '<span style="font-size: 16px; color: #EA906C;">No NIK harus terdiri dari 16 digit angka</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    if (!cbKebijakan) {
      Swal.fire({
        icon: "warning",
        title:
          '<span style="font-size: 16px; color: #EA906C;">Harap setujui kebijakan</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    //console.log('Data valid. Melanjutkan proses login...');

    try {
      const result = await register({
        nama_depan: namaDepan,
        nama_belakang: namaBelakang,
        email: email,
        password: password,
        nik: noNIK,
        alamat: alamat,
      });

      // Cek hasil dari permintaan ke server
      if (result) {
        Swal.fire({
          icon: "success",
          title:
            '<span style="font-size: 16px; color: green;">Berhasil registrasi</span>',
          showConfirmButton: false,
          width: "300px",
          timer: "3000",
        });
        navigate("/welcome/sign-in");
      } else {
        Swal.fire({
          icon: "error",
          title:
            '<span style="font-size: 16px; color: red;">Gagal registrasi</span>',
          showConfirmButton: false,
          width: "300px",
          timer: "3000",
        });
      }
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal registrasi</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#B31312", height: "100vh" }}
    >
      <div
        className="container"
        style={{
          maxWidth: "390px",
          backgroundColor: "white",
          height: "100%",
          overflow: "auto",
        }}
      >
        <div className="logo" style={{ height: "200px" }}>
          <img
            src="https://i.imgur.com/OXNQ3Sf.png"
            alt="logo lapaq"
            style={{ width: "30%" }}
          />
        </div>

        <div className="form-daftar">
          <h3 id="daftar">Sign Up</h3>
          <form onSubmit={handleSubmit} id="form-regis">
            <div className="row wrapper-nama" style={{ width: "87%" }}>
              <div className="col nama-depan">
                <input
                  type="text"
                  id="nama-depan"
                  name="namaDepan"
                  className="form-control input-nama-depan"
                  placeholder="Nama depan"
                  onChange={handleInputChange}
                  value={formData.namaDepan}
                />
              </div>

              <div className="col nama-belakang">
                <input
                  type="text"
                  id="nama-belakang"
                  name="namaBelakang"
                  placeholder="Nama belakang"
                  onChange={handleInputChange}
                  value={formData.namaBelakang}
                />
              </div>
            </div>

            <div className="email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>

            <div className="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>

            <div className="con-password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
              <input
                type="password"
                id="con-password"
                name="conPassword"
                placeholder="Konfirmasi password"
                onChange={handleInputChange}
                value={formData.conPassword}
              />
            </div>

            <div className="no-nik">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              <input
                type="text"
                id="no-nik"
                name="noNIK"
                placeholder="No NIK"
                maxLength="16"
                onChange={handleInputChange}
                value={formData.noNIK}
              />
            </div>

            <div className="alamat">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              <input
                type="text"
                id="alamat"
                name="alamat"
                placeholder="Alamat"
                onChange={handleInputChange}
                value={formData.alamat}
              />
            </div>

            <div className="cta">
              <div className="cta-kebijakan">
                <input
                  type="checkbox"
                  id="cb-kebijakan"
                  name="cbKebijakan"
                  onChange={handleInputChange}
                  checked={formData.cbKebijakan}
                />
                <label htmlFor="setujui-kebijakan">Setujui kebijakan</label>
              </div>
            </div>

            <button type="submit" id="submit">
              Sign Up
            </button>
          </form>
        </div>

        <div className="saran mb-5 me-0">
          <span className="m-0">
            Sudah punya akun? <Link to="/welcome/sign-in" className="m-0">Log In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
