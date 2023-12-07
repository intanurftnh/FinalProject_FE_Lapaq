import React, { useEffect, useState } from "react";
import { productList } from "../../services/product";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchAndDisplayData = async (searchTerm) => {
      try {
        const response = await productList();
        console.log("Response:", response);

        if (response.payload && Array.isArray(response.payload)) {
          const items = response.payload;
          const filteredItems = items.filter(
            (item) =>
              item.nama_produk &&
              item.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setNotFound(filteredItems.length === 0);
          setFilteredItems(filteredItems);
        } else {
          throw new Error("Payload bukanlah sebuah array atau tidak tersedia");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchAndDisplayData(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="body d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#B31312",
        fontFamily: "Montserrat, sans-serif",
        height: "100vh",
      }}
    >
      <div
        className="container-md p-0 pb-5 mx-3"
        style={{
          maxWidth: "390px",
          backgroundColor: "white",
          margin: "auto",
          height: "100%",
          overflow: "auto",
        }}
      >
        <nav className="navbar d-flex nav mx-auto justify-content-center align-items-center py-3">
          <div className="container-lg justify-content-center d d-flex">
            <form>
              <div className="input-group wrap-input">
                <span className="input-group-text" id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  id="search"
                  aria-describedby="basic-addon1"
                  autoFocus
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </nav>

        <div>
          <div
            className="row container-lg gap-2 d-flex justify-content-center align-items-center mx-auto mt-1"
            id="list-products"
          >
            {notFound ? (
              <span
                className="text-center fw-bold"
                style={{ color: "#B31312" }}
              >
                Hasil tidak ditemukan
              </span>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="card col-md-6 p-0"
                  style={{ width: "48%", height: "280px" }}
                >
                  <Link
                    to={`/homepage/search/produk/detail/${item._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      src={item.image || "https://i.imgur.com/2a0RWOy.jpg"}
                      className="card-img-top"
                      style={{ objectFit: "cover" }}
                      width="120px"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.imgur.com/2a0RWOy.jpg";
                      }}
                    />
                    <div className="card-body">
                      <h5
                        style={{ fontSize: "14px" }}
                        className="card-title fw-semibold"
                      >
                        {item.nama_produk}
                      </h5>
                      <p
                        className="card-text fw-bold"
                        style={{ color: "#2B2A4C", fontSize: "14px" }}
                      >
                        <span>Rp </span>
                        {item.harga}
                      </p>
                      <div
                        className="rating ms-1"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                          right: "10px",
                        }}
                      >
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
                            {item.rating || <span>0,0</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
