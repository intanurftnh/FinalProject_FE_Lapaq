import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { sellerId } from "../../services/user";
import { getUserTokenSeller } from "../../utils/jwt";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const [sellerData, setSellerData] = useState({
    namaToko: "",
  });

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
          setSellerData({ namaToko: response.payload.nama_toko });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
          Toko Saya
        </p>
      </div>

      <img src="https://i.imgur.com/AXRB66U.jpg" width="100%" />

      <div
        className="product d-flex align-items-center p-3"
        style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="image me-3">
          <img
            src="https://i.imgur.com/f9AkNUW.jpg"
            alt="Product"
            className="img-fluid rounded-circle"
            width="65"
            style={{ boxShadow: "0 3px 3px rgba(0, 0, 0, 0.5)" }}
          />
        </div>
        <div className="details d-flex flex-column justify-content-between flex-grow-1 ms-2">
          <div className="title d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fs-6 fw-bold" style={{ color: "#B31312" }}>
                {sellerData.namaToko}
              </h4>
              <p style={{ color: "#EA906C", marginBottom: "0" }}>
                Rp 2.000.000
              </p>
            </div>
            <div className="button-container">
              <button
                className="btn btn-sm fw-bold"
                style={{
                  backgroundColor: "#B31312",
                  color: "white",
                  fontSize: "11px",
                  height: "25px",
                  width: "70px",
                }}
              >
                <Link
                  to="/homepage/dashboard/profile"
                  className="text-decoration-none text-white"
                >
                  Lihat
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
            <div className="icons-container d-flex justify-content-between text-items-center m-3 py-3 px-3">
                <Link to="/homepage/dashboard/produk-saya" className="text-decoration-none">
                    <div className="icon-item text-center ms-3">
                        <Icon icon="gridicons:product" color="#b31312" width="35" />                        
                        <p className="icon-text fw-bold" style={{color: '#b31312'}}>Produk</p>
                    </div>
                </Link>

                <Link to="/homepage/dashboard/keuangan" className="text-decoration-none">
                    <div className="icon-item text-center">
                        <Icon icon="fluent:money-calculator-24-regular" color="#b31312" width="35" />                        
                        <p className="icon-text fw-bold" style={{color: '#b31312'}}>Keuangan</p>
                    </div>
                </Link>

                <Link to="/homepage/dashboard/forum" className="text-decoration-none">
                    <div className="icon-item text-center">
                        <Icon icon="material-symbols:forum-outline-rounded" color="#b31312" width="35" />                        
                        <p className="icon-text fw-bold" style={{color: '#b31312'}}>Forum</p>
                    </div>
                </Link>

                <Link to="/homepage/dashboard/bantuan" className="text-decoration-none">
                    <div className="icon-item text-center me-3">
                        <Icon icon="mdi:tooltip-help-outline" color="#b31312" width="35" />                        
                        <p className="icon-text fw-bold" style={{color: '#b31312'}}>Bantuan</p>
                    </div>
                </Link>
            </div>
            */}

      <div className="m-3">
        <p
          className="fw-bold mb-2"
          style={{ color: "#b31312", fontSize: "13px" }}
        >
          Riwayat Pesanan
        </p>
        <div
          className="icons-container d-flex justify-content-between text-items-center pt-3 rounded"
          style={{ backgroundColor: "#EEE2DE" }}
        >
          <Link
            to="/homepage/dashboard/riwayat/pemrosesan"
            className="text-decoration-none"
          >
            <div className="icon-item text-center ms-3">
              <Icon icon="lucide:package" color="#2b2a4c" width="30" />
              <p
                className="icon-text fw-bold mt-1"
                style={{ color: "#2b2a4c", fontSize: "10px" }}
              >
                Pemrosesan
              </p>
            </div>
          </Link>

          <Link
            to="/homepage/dashboard/riwayat/pembatalan"
            className="text-decoration-none"
          >
            <div className="icon-item text-center">
              <Icon icon="lucide:package-x" color="#2b2a4c" width="30" />
              <p
                className="icon-text fw-bold mt-1"
                style={{ color: "#2b2a4c", fontSize: "10px" }}
              >
                Pembatalan
              </p>
            </div>
          </Link>

          <Link
            to="/homepage/dashboard/riwayat/pengembalian"
            className="text-decoration-none"
          >
            <div className="icon-item text-center">
              <Icon
                icon="octicon:package-dependencies-16"
                color="#2b2a4c"
                width="30"
                height="30"
              />
              <p
                className="icon-text fw-bold mt-1"
                style={{ color: "#2b2a4c", fontSize: "10px" }}
              >
                Pengembalian
              </p>
            </div>
          </Link>

          <Link
            to="/homepage/dashboard/riwayat/penilaian"
            className="text-decoration-none"
          >
            <div className="icon-item text-center me-3">
              <Icon icon="ic:outline-rate-review" color="#2b2a4c" width="30" />
              <p
                className="icon-text fw-bold mt-1"
                style={{ color: "#2b2a4c", fontSize: "10px" }}
              >
                Penilaian
              </p>
            </div>
          </Link>
        </div>
      </div>

      <img
        className="px-3 mb-5"
        src="https://i.imgur.com/puvVrP9.jpg"
        width="100%"
      />
    </>
  );
};

export default Dashboard;
