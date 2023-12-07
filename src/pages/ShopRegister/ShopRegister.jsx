import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shopRegister } from "../../services/auth";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserToken } from "../../utils/jwt";

const ShopRegister = () => {
  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState(null);
  const [formData, setFormData] = useState({
    namaToko: "",
    alamatToko: "",
    pinToko: "",
  });

  useEffect(() => {
    const tokenUserData = getUserToken();
    if (!tokenUserData) {
      navigate("/welcome/sign-in"); // Jika token tidak tersedia, arahkan pengguna kembali ke halaman login
    }
    console.log(tokenUserData);
    setTokenUser(tokenUserData);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { namaToko, alamatToko, pinToko } = formData;

    if (!namaToko || !alamatToko || !pinToko) {
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

    if (!/^\d{6}$/.test(pinToko)) {
      Swal.fire({
        icon: "warning",
        title:
          '<span style="font-size: 16px; color: red;">Pin Toko harus terdiri dari 6 digit angka</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    // Lakukan tindakan setelah registrasi berhasil
    //console.log('Data valid. Melanjutkan proses registrasi...');

    try {
      const body = {
        email: tokenUser.user.email,
        nama_toko: namaToko,
        alamat_toko: alamatToko,
        pin: pinToko,
      };

      const result = await shopRegister(body, tokenUser.token);

      // Cek hasil dari permintaan ke server
      if (result) {
        const tokenSeller = result.payload.token;
        Cookies.set("tokenSeller", tokenSeller, { expires: 10 });

        Swal.fire({
          icon: "success",
          title:
            '<span style="font-size: 16px; color: green;">Berhasil daftar toko</span>',
          showConfirmButton: false,
          width: "300px",
          timer: "3000",
        });

        navigate("/homepage/dashboard");
      } else {
        Swal.fire({
          icon: "warning",
          title:
            '<span style="font-size: 16px; color: red;">Gagal daftar toko</span>',
          showConfirmButton: false,
          width: "300px",
          timer: "3000",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal daftar toko</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clNavy = {
    color: "#2B2A4C",
    fontWeight: "bold",
  };
  const bdNavy = {
    borderColor: "#2B2A4C",
    borderWidth: "1px",
    borderStyle: "solid",
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#B31312", overflow: "auto", height: "100vh" }}
    >
      <div
        className="container pt-5 mb-0"
        style={{ maxWidth: "390px", backgroundColor: "white", height: "100%" }}
      >
        <img
          src="https://i.imgur.com/OXNQ3Sf.png"
          className="img-fluid d-block mx-auto mb-4"
          alt="Toko"
          width="100"
        />

        <h1
          className="text-center fs-3 my-5 fw-bold"
          style={{ color: "#B31312" }}
        >
          Daftar Toko
        </h1>

        <form className="m-4 mb-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="namaToko" className="form-label" style={clNavy}>
              Nama Toko
            </label>
            <input
              type="text"
              className="form-control"
              style={bdNavy}
              id="namaToko"
              name="namaToko"
              value={formData.namaToko}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamatToko" className="form-label" style={clNavy}>
              Alamat Toko
            </label>
            <input
              type="text"
              className="form-control"
              style={bdNavy}
              id="alamatToko"
              name="alamatToko"
              value={formData.alamatToko}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pinToko" className="form-label" style={clNavy}>
              Pin Toko
            </label>
            <input
              type="password"
              className="form-control"
              style={bdNavy}
              id="pinToko"
              name="pinToko"
              value={formData.pinToko}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2 mt-5">
            <button
              type="submit"
              className="btn mb-2 fw-bold text-white"
              style={{ backgroundColor: "#B31312" }}
            >
              Daftar Toko
            </button>
          </div>
        </form>

        <div className="text-center" style={{ fontSize: "13px" }}>
          <span>Sudah punya toko?</span>
          <span className="ms-2">
            <Link to="/homepage/masuk-toko" className="text-decoration-none">
              Masuk toko
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopRegister;
