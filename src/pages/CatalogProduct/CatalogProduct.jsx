import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { productId } from "../../services/product";
import { addCart } from "../../services/order";
import { getUserToken } from "../../utils/jwt";
import { useParams } from "react-router-dom";

const CatalogProduct = () => {
  const navigate = useNavigate();
  const [tokenUser, setTokenUser] = useState(null);

  const [product, setProduct] = useState({
    image: "https://i.imgur.com/2a0RWOy.jpg",
    nama_produk: "",
    harga: "",
    deskripsi: "",
    rating: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    const tokenUserData = getUserToken();
    console.log(tokenUserData);
    setTokenUser(tokenUserData);

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

  const handleAddCart = async () => {
    const body = {
      user_buyer_id: tokenUser.user._id,
      produk_id: _id,
    };
    const result = await addCart(body, tokenUser.token);
    if (result) {
      Swal.fire({
        icon: "success",
        title:
          '<span style="font-size: 16px; color: green;">Berhasil menambahkan ke keranjang</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      navigate("/homepage/keranjang");
    } else {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: green;">Gagal menambahkan ke keranjang</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>

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

        <div style={{ float: "right" }}>
          <Icon
            icon="bxs:cart-add"
            color="#b31312"
            width="35"
            height="30"
            onClick={handleAddCart}
          />
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
        <div className="d-grid gap-2 btn-checkout" id="btn-checkout">
          <button
            className="btn text-white fw-bold"
            type="button"
            style={{ backgroundColor: "#b31312" }}
          >
            <Link
              to={`/homepage/search/produk/checkout/${product._id}`}
              className="text-decoration-none text-white"
            >
              Checkout
            </Link>
          </button>
        </div>
      </div>

      <hr className="border border-secondary order-2 opacity-25" />

      <div className="review-product mb-5">
        <div className="title-review">
          <h1 className="fs-5 fw-bold">Review</h1>
        </div>
        <div className="seeall-review" style={{ float: "right" }}>
          <a href="#" style={{ textDecoration: "none", color: "#b31312" }}>
            <p>See all</p>
          </a>
        </div>
        <div className="desc-review mt-5">
          <div className="d-flex align-items-center">
            <div className="user-avatar">
              <img
                className="rounded-circle"
                src="https://i.imgur.com/nvH5zBy.jpg"
                width="45"
              />
            </div>
            <div className="user-name ms-3">
              <div className="username">
                <h2 className="fs-6 fw-bold">Asep Suseno</h2>
              </div>
              <div className="date">
                <h3 style={{ fontSize: "12px" }}>2023-03-27</h3>
              </div>
            </div>
          </div>
          <div className="user-review mt-2">
            <div className="text">
              <p style={{ fontSize: "14px" }}>
                Mantap barangnya lembut, hangat dan harganya friendly auto
                checkout deui sikat barudak!!
              </p>
            </div>
            <div className="stars d-flex gap-1">
              <Icon
                icon="ph:star-fill"
                color="#ea906c"
                width="25"
                height="25"
              />
              <Icon
                icon="ph:star-fill"
                color="#ea906c"
                width="25"
                height="25"
              />
              <Icon
                icon="ph:star-fill"
                color="#ea906c"
                width="25"
                height="25"
              />
              <Icon
                icon="ph:star-fill"
                color="#ea906c"
                width="25"
                height="25"
              />
              <Icon
                icon="ph:star-fill"
                color="#eee2de"
                width="25"
                height="25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogProduct;
