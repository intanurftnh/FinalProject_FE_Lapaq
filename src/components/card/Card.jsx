import React from "react";
import "./Card.css";

function Card({buttonName, kategori, url, namaProduct, descripsi, harga}) {
  return (
    <div className="container py-5">
      <h1 className="text-center">{kategori}</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
        <div className="col">
          <div className="card">
            <img
              src={url}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{namaProduct}</h5>
              <p className="card-text">
                {descripsi}
              </p>
            </div>
            <div className="mb-5 d-flex justify-content-around">
              <h3>{harga}</h3>
              <button className="btn btn-primary">{buttonName}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
