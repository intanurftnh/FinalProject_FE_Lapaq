import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/product";
import { getUserTokenSeller } from "../../utils/jwt";

const AddProduct = () => {
  const navigate = useNavigate();
  const [tokenUserSeller, setTokenUserSeller] = useState(null);
  const [formData, setFormData] = useState({
    img: null,
    product: "",
    kategori: "",
    harga: "",
    deskripsi: "",
  });

  // Buat useRef untuk input file
  const imageInputRef = useRef(null);

  useEffect(() => {
    const tokenUserData = getUserTokenSeller();
    console.log(tokenUserData);
    setTokenUserSeller(tokenUserData);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      img: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Memeriksa apakah ada input yang kosong
    if (
      formData.product === "" ||
      formData.harga === "" ||
      formData.deskripsi === ""
    ) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Form tidak boleh kosong</span>',
        showConfirmButton: false,
        width: "300px",
        timer: "3000",
      });
      return;
    }

    // Memeriksa apakah kategori sudah dipilih
    if (formData.kategori === "") {
      Swal.fire({
        icon: "question",
        title:
          '<span style="font-size: 16px; color:#3876BF;">Pilih kategori produk</span>',
        showConfirmButton: false,
        width: "300px",
        timer: 3000,
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("seller_id", tokenUserSeller.user_id);
      data.append("nama_produk", formData.product);
      data.append("harga", formData.harga);
      data.append("deskripsi", formData.deskripsi);
      data.append("kategori", formData.kategori);
      data.append("image", formData.img);

      // Panggil fungsi addProduct dengan formData yang telah dibuat
      const response = await addProduct(data, tokenUserSeller.token);

      if (response && response.message === "data berhasil ditambahkan") {
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            '<span style="font-size: 16px; color: green;">Produk berhasil ditambahkan</span>',
          showConfirmButton: false,
          width: "300px",
          timer: 2000,
        });

        // Clear form after successful submission
        setFormData({
          img: null,
          product: "",
          harga: "",
          jumlahStok: "",
          deskripsi: "",
          kategori: "",
        });

        navigate("/homepage/dashboard/produk-saya");

        // Reset input file value after successful submission
        if (imageInputRef.current) {
          imageInputRef.current.value = ""; // Atur kembali nilai input file ke kosong
        }
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title:
          '<span style="font-size: 16px; color: red;">Gagal menambahkan produk</span>',
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
            Tambah Produk
          </p>
        </div>

        <div className="pt-4 px-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="img"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Gambar Produk
              </label>
              <input
                type="file"
                className="form-control"
                name="img"
                onChange={handleImageChange}
                ref={imageInputRef}
                style={{ border: "2px solid #2B2A4C", height: "40px" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="product"
                className="form-label fw-bold"
                style={{ color: "#2B2A4C", fontSize: "14px" }}
              >
                Nama Produk
              </label>
              <input
                type="text"
                className="form-control"
                name="product"
                value={formData.product}
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
                  placeholder="Contoh: 25000"
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
