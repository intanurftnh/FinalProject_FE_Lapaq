import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { productId, deleteProductId } from "../../services/product";
import { useParams, useNavigate } from "react-router-dom";
import { getUserTokenSeller } from "../../utils/jwt";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const [product, setProduct] = useState({
    image: "https://i.imgur.com/2a0RWOy.jpg",
    nama_produk: "",
    harga: "",
    deskripsi: "",
    rating: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productId(_id);
        if (response) {
          setProduct(response.payload);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [_id]);

  const handleDeleteProduct = async () => {
    try {
      const tokenUserData = getUserTokenSeller();
      console.log(tokenUserData);
      setTokenUserSeller(tokenUserData);
      const response = await deleteProductId(tokenUserData.token, _id);
      if (response) {
        Swal.fire({
          icon: "success",
          title:
            '<span style="font-size: 16px; color: green;">Produk berhasil dihapus</span>',
          showConfirmButton: false,
          width: "300px",
          timer: "3000",
        }).then(() => {
          navigate("/homepage/dashboard/produk-saya");
        });
      } else {
        Swal.fire({
          icon: "warning",
          title:
            '<span style="font-size: 16px; color: red;">Gagal menghapus produk</span>',
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
          '<span style="font-size: 16px; color: red;">Gagal menghapus produk</span>',
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
        className="container-fluid p-0"
        style={{
          maxWidth: "390px",
          backgroundColor: "white",
          margin: "auto",
          height: "100%",
          overflow: "auto",
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
            Detail Produk
          </p>
        </div>
        <div className="p-3">
          <div className="info-product mt-2 pb-3">
            <div className="img-product" id="img-product">
              <img
                className="rounded rounded-3"
                src={product.image}
                alt="Product Image"
                width="100%"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.imgur.com/2a0RWOy.jpg";
                }}
              />
            </div>
            <div
              className="title-product mt-3 mb-4"
              style={{ position: "relative" }}
            >
              <div className="name-product" id="name-product">
                <p className="fs-5 fw-bold mb-0" style={{ color: "#2B2A4C" }}>
                  {product.nama_produk}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="price-product" id="price-product">
                  <p className="fs-5 fw-bold mb-0" style={{ color: "#ea906c" }}>
                    <span>Rp </span>
                    {product.harga}
                  </p>
                </div>
                <div className="rating ms-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="tabler:star-filled"
                      color="#ea906c"
                      width="20"
                      height="20"
                    />
                    <span
                      className="fs-6 ms-1 fw-bold"
                      style={{ color: "#ea906c" }}
                    >
                      {product.rating || <span>5,0</span>}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="desc-product mt-3" id="desc-product">
              <p className="fs-6 fw-bold mb-2">Deskripsi</p>
              <p
                className="lh-sm"
                style={{ textAlign: "justify", fontSize: "14px" }}
              >
                {product.deskripsi}
              </p>
            </div>
            <div className="d-grid gap-2 btn-checkout mt-5" id="btn-checkout">
              <button
                className="btn text-white fw-bold"
                type="button"
                style={{ backgroundColor: "#b31312" }}
              >
                <Link
                  to={`/homepage/dashboard/produk-saya/detail/edit/${product._id}`}
                  className="text-decoration-none text-white"
                >
                  Edit Produk
                </Link>
              </button>
              <button
                className="btn text-white fw-bold"
                type="button"
                style={{ backgroundColor: "#ea906c", color: "#b31312" }}
                onClick={handleDeleteProduct}
              >
                Delete Produk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
