import React, { useEffect, useState } from "react";
import { productId } from "../../services/product";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrderReviewDetail = () => {
  const [product, setProduct] = useState({
    nama_produk: "",
    harga: "",
  });

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (_id) {
          const response = await productId(_id);
          if (response) {
            setProduct(response.payload);
          }
        } else {
          console.error("ID tidak valid");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [_id]);

  const dotStyle = {
    height: "10px",
    width: "10px",
    backgroundColor: "#EA906C",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "10px",
  };

  const listStyle = {
    listStyleType: "none",
    paddingLeft: "20px",
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
            Lihat Penilaian
          </p>
        </div>

        <div className="border-bottom mx-5 mt-4 pb-1">
          <p className="fs-6 fw-bold mb-0" style={{ color: "#2B2A4C" }}>
            Rianti Kamila
          </p>
        </div>

        <div className="m-5">
          <div>
            <p className="fs-6 mb-2" style={{ color: "#B31312" }}>
              {product.nama_produk}
            </p>
          </div>
          <div className="d-flex mb-2">
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon icon="tabler:star" color="#ea906c" width="20" height="20" />
          </div>
          <div>
            <p>
              Sesuai pesanan, jaketnya lembut tapi ada sedikit cacat pada bagian
              sisinya
            </p>
          </div>
          <div className="d-flex">
            <img src={product.image} className="rounded me-2" width="70px" />
            <img src={product.image} className="rounded me-2" width="70px" />
            <img src={product.image} className="rounded" width="70px" />
          </div>
        </div>

        <div className="m-5">
          <div>
            <p className="fs-6 mb-2" style={{ color: "#B31312" }}>
              {product.nama_produk}
            </p>
          </div>
          <div className="d-flex mb-2">
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon
              icon="tabler:star-filled"
              color="#ea906c"
              width="20"
              height="20"
            />
            <Icon icon="tabler:star" color="#ea906c" width="20" height="20" />
          </div>
          <div>
            <p>
              Sesuai pesanan, jaketnya lembut tapi ada sedikit cacat pada bagian
              sisinya
            </p>
          </div>
          <div className="d-flex">
            <img src={product.image} className="rounded me-2" width="70px" />
            <img src={product.image} className="rounded me-2" width="70px" />
            <img src={product.image} className="rounded" width="70px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReviewDetail;
