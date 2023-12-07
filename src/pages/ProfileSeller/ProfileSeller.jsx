import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { sellerId } from "../../services/user";
import { getUserTokenSeller, deleteTokenSeller } from "../../utils/jwt";

const ProfileSeller = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    const tokenUserData = getUserTokenSeller();
    console.log("Token User Data:", tokenUserData);
    if (!tokenUserData) {
      navigate("/homepage/daftar-toko");
    } else {
      setTokenUserSeller(tokenUserData);
    }

    const fetchData = async () => {
      try {
        const response = await sellerId(tokenUserData.user_id);
        if (response) {
          setSellerData(response.payload);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    try {
      deleteTokenSeller();
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Berhasil logout</span>',
        showConfirmButton: false,
        width: "300px",
        timer: 2000,
      });
      navigate("/homepage");
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

  const openEditProfileSeller = () => {
    navigate("/homepage/dashboard/profile/edit");
  };

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
          Profil Toko
        </p>
      </div>

      <div className="text-center mt-3">
        <img
          className="img-fluid rounded-circle"
          src="https://i.imgur.com/f9AkNUW.jpg"
          width="100px"
          style={{ boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)" }}
        />
        <div className="m-3">
          <p className="fs-6 fw-bold mb-0" style={{ color: "#B31312" }}>
            {sellerData?.nama_toko || "-"}
          </p>
        </div>
      </div>

      <div className="p-4">
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
              {sellerData?.email || "-"}
            </p>
          </div>
        </div>

        <div className="mb-3">
          <div className="mb-0">
            <p
              className="fw-bold mb-2"
              style={{ color: "#2B2A4C", fontSize: "14px" }}
            >
              Alamat Toko
            </p>
          </div>
          <div
            className="align-items-center rounded px-2 py-1"
            style={{ border: "2px solid #2B2A4C", height: "80px" }}
          >
            <p style={{ lineHeight: "20px", fontSize: "14px" }}>
              {sellerData?.alamat_toko || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 mx-4">
        <button
          className="btn fw-bold"
          type="button"
          onClick={openEditProfileSeller}
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
    </>
  );
};

export default ProfileSeller;
