import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { editProductId, productId } from "../../services/product";
import { useParams, useNavigate } from "react-router-dom";
import { getUserTokenSeller } from "../../utils/jwt";

const EditProduct = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    nama_produk: "",
    kategori: "",
    harga: "",
    deskripsi: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productId(_id);

        // Pastikan productData memiliki nilai yang valid sebelum mengatur state
        if (productData) {
          console.log("Product Data:", productData); // Tambahkan ini untuk memastikan data sudah terambil dengan benar

          setFormData({
            nama_produk: productData.payload.nama_produk || "",
            kategori: productData.payload.kategori || "",
            harga: productData.payload.harga || "",
            deskripsi: productData.payload.deskripsi || "",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      }
    };

    fetchProduct();
  }, [_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value); // Tambahkan ini di dalam `handleChange`
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const tokenUserData = getUserTokenSeller();
      console.log(tokenUserData);
      setTokenUserSeller(tokenUserData);
      const response = await editProductId(tokenUserData.token, _id, formData);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            '<span style="font-size: 16px; color: green;">Produk berhasil diubah</span>',
          showConfirmButton: false,
          width: "300px",
          timer: 2000,
        });
        navigate("/homepage/dashboard/produk-saya");
      } else {
        throw new Error("Gagal mengubah produk");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal mengubah produk</span>',
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
            Edit Produk
          </p>
        </div>

        <div className="pt-4 px-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="nama_produk"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Produk
              </label>
              <input
                type="text"
                className="form-control"
                name="nama_produk"
                placeholder="Masukkan Nama Produk"
                value={formData.nama_produk}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="kategori"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Kategori Produk
              </label>
              <select
                className="form-select"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              >
                <option value="">Pilih Kategori</option>
                <option value="Kecantikan">Kecantikan</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="harga"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Harga Produk
              </label>
              <div className="input-group mb-3">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{ border: "2px solid #2B2A4C", height: "40px" }}
                >
                  Rp
                </span>
                <input
                  type="number"
                  className="form-control"
                  name="harga"
                  placeholder="Contoh: 25.000"
                  value={formData.harga}
                  onChange={handleChange}
                  style={{ border: "2px solid #2B2A4C", height: "40px" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="deskripsi"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Deskripsi Produk
              </label>
              <textarea
                name="deskripsi"
                className="form-control"
                placeholder="Masukkan Deskripsi Produk"
                value={formData.deskripsi}
                onChange={handleChange}
                style={{ border: "2px solid #2B2A4C", height: "280px" }}
              />
            </div>

            <div className="d-grid gap-2 mt-4 mb-3">
              <button
                className="btn fw-bold text-white"
                type="submit"
                style={{ backgroundColor: "#B31312" }}
              >
                Edit Produk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
