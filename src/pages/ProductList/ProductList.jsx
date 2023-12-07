import React, { useState, useEffect } from "react";
import { productList } from "../../services/product";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productList();
        if (response && response.payload) {
          setProducts(response.payload);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageError = (event) => {
    event.target.src = "https://i.imgur.com/2a0RWOy.jpg";
  };

  const openAddProductPage = () => {
    navigate("/homepage/dashboard/produk-saya/tambah-produk");
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
          Produk Saya
        </p>
      </div>

      <div className="product-list px-4 pt-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product._id}>
              <Link
                to={`/homepage/dashboard/produk-saya/detail/${product._id}`}
                className="text-decoration-none"
              >
                <div
                  key={product._id}
                  className="product-card d-flex align-items-center mb-3 p-3"
                  style={{ boxShadow: "0 3px 2px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="image">
                    <img
                      className="rounded"
                      src={product.image}
                      alt={product.nama_produk}
                      width="70px"
                      height="70px"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="title ms-3" style={{ width: "225px" }}>
                    <h3
                      className="fs-6 mb-2 fw-bold"
                      style={{ color: "#2B2A4C" }}
                    >
                      {product.nama_produk}
                    </h3>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ color: "#ea906c" }}>
                        <p className="mb-0">
                          <span>Rp </span>
                          {product.harga}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <Icon
                          icon="tabler:star-filled"
                          color="#ea906c"
                          width="17"
                          height="17"
                        />
                        <span
                          className="fs-6 ms-1 fw-bold"
                          style={{ color: "#ea906c" }}
                        >
                          {product.rating || <p className="mb-0">5,0</p>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div className="d-grid gap-2 mx-4 mt-4 mb-5">
        <button
          className="btn fw-bold"
          type="button"
          onClick={openAddProductPage}
          style={{ backgroundColor: "#B31312", color: "white" }}
        >
          Tambah Produk
        </button>
      </div>
    </>
  );
};

export default ProductList;
