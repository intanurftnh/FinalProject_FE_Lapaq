import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { sellerId, editSellerId } from "../../services/user";
import { getUserTokenSeller } from "../../utils/jwt";

const EditProfileSeller = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const [profileData, setProfileData] = useState({
    nama_toko: "",
    alamat_toko: "",
  });

  useEffect(() => {
    const tokenUserData = getUserTokenSeller();
    console.log("Token User Data:", tokenUserData);
    if (!tokenUserData) {
      navigate("/homepage/daftar-toko");
    } else {
      setTokenUserSeller(tokenUserData);
    }

    const fetchSeller = async () => {
      try {
        const userSellerId = tokenUserData.user_id;
        const response = await sellerId(userSellerId);

        // Pastikan productData memiliki nilai yang valid sebelum mengatur state
        if (response) {
          console.log(response.payload);
          setProfileData({
            nama_toko: response.payload.nama_toko,
            alamat_toko: response.payload.alamat_toko,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data profile:", error);
      }
    };

    fetchSeller();
  }, []);

  // Handler untuk mengubah nilai pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handler ketika tombol simpan ditekan
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi form
    const { nama_toko, alamat_toko } = profileData;

    if (!nama_toko.trim() || !alamat_toko.trim()) {
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

    const userSellerId = tokenUserSeller.user_id;
    const response = await editSellerId(
      userSellerId,
      profileData,
      tokenUserSeller.token
    );
    if (response) {
      Swal.fire({
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Profil berhasil diubah</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      navigate("/homepage/dashboard/profile");
    } else {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal edit profile</span>',
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
            Edit Profil Toko
          </p>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="storeName"
                className="fw-bold mb-1"
                style={{ fontSize: "14px", color: "#2B2A4C" }}
              >
                Nama Toko
              </label>
              <br />
              <input
                className="align-items-center rounded px-2 form-control"
                style={{
                  border: "2px solid #2B2A4C",
                  height: "40px",
                  fontSize: "14px",
                }}
                type="text"
                id="storeName"
                name="nama_toko"
                value={profileData.nama_toko}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="storeAddress"
                className="fw-bold mb-1"
                style={{ fontSize: "14px", color: "#2B2A4C" }}
              >
                Alamat Toko
              </label>
              <br />
              <input
                className="align-items-center rounded px-2 form-control"
                style={{
                  border: "2px solid #2B2A4C",
                  height: "40px",
                  fontSize: "14px",
                }}
                type="text"
                id="storeAddress"
                name="alamat_toko"
                value={profileData.alamat_toko}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2" style={{ marginTop: "50px" }}>
              <button
                className="btn fw-bold"
                type="submit"
                style={{ backgroundColor: "#B31312", color: "white" }}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSeller;
