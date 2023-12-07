import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { listCart } from "../../services/order";
import { getUserToken } from "../../utils/jwt";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [tokenUser, setTokenUser] = useState(null);

  useEffect(() => {
    const tokenUserData = getUserToken();
    console.log(tokenUserData);
    setTokenUser(tokenUserData);

    const fetchData = async () => {
      try {
        const response = await listCart(
          tokenUserData.user._id,
          tokenUserData.token
        );
        if (response && Array.isArray(response.payload)) {
          setCarts(response.payload);
          console.log(response.payload);
        } else {
          console.error(
            "Data keranjang tidak ditemukan atau bukanlah array:",
            response
          );
        }
      } catch (error) {
        console.error("Gagal mengambil data dari server:", error);
      }
    };

    fetchData();
  }, []);

  const defaultImageUrl = "https://i.imgur.com/2a0RWOy.jpg";

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
          Keranjang Saya
        </p>
      </div>

      <div className="container mt-3 mb-4">
        <div className="row g-2 px-2">
          {carts.map((product) => (
            <div
              className="card mb-1 py-3 px-2 border border-0"
              key={product._id}
              style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="row g-0 d-flex align-items-center">
                <div className="col-md-2 d-flex align-items-center">
                  <img
                    src={product.image || defaultImageUrl}
                    alt={product.nama_produk}
                    className="rounded"
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body d-flex justify-content-between align-items-center p-0 ps-3">
                    <div>
                      <h5
                        style={{ fontSize: "14px" }}
                        className="card-title fw-bold"
                      >
                        {product.nama_produk}
                      </h5>
                      <p
                        className="card-text"
                        style={{ color: "#2B2A4C", fontSize: "14px" }}
                      >
                        <span>Rp </span>
                        {product.harga}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/homepage/search/produk/checkout/${product.produk_id}`}
                        className="btn btn-sm fw-bold text-white"
                        style={{ backgroundColor: "#B31312" }}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*<div className='container mt-3 mb-4'>
            <p className='fs-4 ms-3 fw-bold'>Rekomendasi</p>
                <div className='row row-cols-1 row-cols-md-2 g-2 px-2'>
                    {products.map(product => (
                    <div className='col m-0 p-0' key={product._id}>
                        <Link to={`/homepage/search/produk/checkout/${product._id}`} className="text-decoration-none">
                        <div className='card my-2 m-2' key={product._id} style={{height: '280px'}}>
                            <img src={product.image || defaultImageUrl} alt={product.nama_produk} className="card-img-top" style={{objectFit: 'cover'}} width="120px"/>
                            <div className="card-body">
                            <h5 style={{ fontSize: "14px" }} className="card-title fw-semibold">{product.nama_produk}</h5>
                            <p className="card-text fw-bold" style={{color: '#2B2A4C', fontSize: "14px"}}><span>Rp </span>{product.harga}</p>
                            <div className="rating ms-1" style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
                                <div className="d-flex align-items-center">
                                <Icon icon="tabler:star-filled" color="#ea906c" width="20" height="20"/>
                                <span className='fs-6 ms-1 fw-bold' style={{ color:"#ea906c" }}>{product.rating || <span>0,0</span>}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>
                    </div>*/}
    </>
  );
};

export default Carts;
