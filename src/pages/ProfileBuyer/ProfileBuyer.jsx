import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { buyerId } from "../../services/user";
import { getUserToken, deleteTokenUser } from "../../utils/jwt";

const ProfileBuyer = () => {
  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState(null);
  const [buyerData, setbuyerData] = useState(null);

  useEffect(() => {
    const tokenUserData = getUserToken();
    console.log("Token User Data:", tokenUserData);
    if (!tokenUserData) {
      navigate("/homepage/daftar-toko");
    } else {
      setTokenUser(tokenUserData);
    }

    const fetchbuyerData = async () => {
      try {
        const data = await buyerId(tokenUserData.user._id);
        setbuyerData(data.payload); // Menyimpan data payload dari response
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    fetchbuyerData();
  }, []);

  const handleLogout = () => {
    try {
      deleteTokenUser();
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Berhasil logout</span>',
        showConfirmButton: false,
        width: "300px",
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          '<span style="font-size: 16px; color: green;">Gagal logout</span>',
        showConfirmButton: false,
        width: "300px",
        timer: 2000,
      });
      console.log(error);
    }
  };

  const openEditProfileBuyer = () => {
    navigate("/homepage/profile/edit");
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
            Profil Saya
          </p>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <div className="mb-0">
              <p
                className="fw-bold mb-2"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Depan
              </p>
            </div>
            <div
              className="align-items-center rounded px-2"
              style={{ border: "2px solid #2B2A4C", height: "40px" }}
            >
              <p style={{ lineHeight: "40px", fontSize: "14px" }}>
                {buyerData?.nama_depan || "-"}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-0">
              <p
                className="fw-bold mb-2"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Belakang
              </p>
            </div>
            <div
              className="align-items-center rounded px-2"
              style={{ border: "2px solid #2B2A4C", height: "40px" }}
            >
              <p style={{ lineHeight: "40px", fontSize: "14px" }}>
                {buyerData?.nama_belakang || "-"}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-0">
              <p
                className="fw-bold mb-2"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Alamat Email
              </p>
            </div>
            <div
              className="align-items-center rounded px-2"
              style={{ border: "2px solid #2B2A4C", height: "40px" }}
            >
              <p style={{ lineHeight: "40px", fontSize: "14px" }}>
                {buyerData?.email || "-"}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-0">
              <p
                className="fw-bold mb-2"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                NIK
              </p>
            </div>
            <div
              className="align-items-center rounded px-2"
              style={{ border: "2px solid #2B2A4C", height: "40px" }}
            >
              <p style={{ lineHeight: "40px", fontSize: "14px" }}>
                {buyerData?.nik || "-"}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-0">
              <p
                className="fw-bold mb-2"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Alamat
              </p>
            </div>
            <div
              className="align-items-center rounded px-2 py-1"
              style={{ border: "2px solid #2B2A4C", height: "80px" }}
            >
              <p style={{ lineHeight: "20px", fontSize: "14px" }}>
                {buyerData?.alamat || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 mx-4">
          <button
            className="btn fw-bold"
            type="button"
            onClick={openEditProfileBuyer}
            style={{ backgroundColor: "#B31312", color: "white" }}
          >
            Edit Profil
          </button>
          <button
            className="btn fw-bold"
            type="button"
            style={{ backgroundColor: "#EA906C", color: "#B31312" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBuyer;
