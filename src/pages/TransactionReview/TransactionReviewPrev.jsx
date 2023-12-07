import React, { useState, useEffect } from 'react';
import { addComment } from '../../services/order';
import { getUserToken } from '../../utils/jwt';

const TransactionReviewPrev = () => {
    const [tokenUser, setTokenUser] = useState(null);
    const [formData, setFormData] = useState({
      nama: '',
      deskripsi: '',
      rating: '',
      image: null,
    });
  
    useEffect(() => {
      const tokenUserData = getUserToken();
      console.log(tokenUserData);
      setTokenUser(tokenUserData);
    }, []);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const body = new FormData();
      body.append('nama', formData.nama);
      body.append('deskripsi', formData.deskripsi);
      body.append('rating', formData.rating);
      body.append('image', formData.image);
  
      // Gunakan tokenUser yang sudah diatur
      const result = await addComment(body, tokenUser.token);
      // Lakukan sesuatu dengan result jika diperlukan
    };

  return (
    <div className="body d-flex justify-content-center align-items-center" style={{ backgroundColor: '#B31312', fontFamily: 'Montserrat, sans-serif', fontSize: '12px'}}>
        <div className="container-md p-0 pb-5" style={{ maxWidth: '390px', backgroundColor: 'white', margin: 'auto' }}>

            <div className='pt-4 pb-1' style={{boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)', marginBottom: '3px'}}>
                <p className='text-center fs-6 fw-bold' style={{color: '#B31312'}}>Nilai Produk</p>
            </div>

            <div className="my-5 mx-4">
                <form onSubmit={handleSubmit} style={{fontSize: '14px'}}>
                    <div className="mb-4">
                        <label htmlFor="nama" className="form-label fw-bold">Nama</label>
                        <input 
                            className="form-control"
                            id="nama" 
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deskripsi" className="form-label fw-bold">Deskripsi</label>
                        <textarea
                            className="form-control"
                            id="deskripsi"
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                            row="3"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rating" class="form-label fw-bold">Rating</label>
                        <input
                            className="form-control"
                            id="rating"
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                        />
                        <div id="passwordHelpBlock" className="form-text">
                            contoh rating : 5.0 (min 0.0 dan max 5.0)                       
                        </div>
                    </div>

                    <div className="mb-4">
                        <label for="formFile" className="form-label fw-bold">Gambar produk</label>
                        <input className="form-control" type="file" id="formFile" onChange={handleImageChange}/>
                    </div>

                    <div className="d-grid gap-2 mt-5">
                        <button className="btn text-white fw-bold" type="submit" style={{backgroundColor: "#B31312"}}>Kirim Komentar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  );
};

export default TransactionReviewPrev;
