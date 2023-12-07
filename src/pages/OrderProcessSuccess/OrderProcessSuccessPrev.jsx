import React, { useEffect, useState } from 'react';
import { productId } from '../../services/product';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

const OrderProcessSuccessPrev = () => {
    const [product, setProduct] = useState({
        nama_produk: '',
        harga: ''
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
                    console.error('ID tidak valid');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, [_id]);

    const dotStyle = {
        height: '10px',
        width: '10px',
        backgroundColor: '#EA906C',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '10px',
      };
    
      const listStyle = {
        listStyleType: 'none',
        paddingLeft: '20px',
      };

    return (
        <div className="body d-flex justify-content-center align-items-center" style={{ backgroundColor: '#B31312', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', height: '100vh' }}>
            <div className="container-md p-0 pb-5" style={{ maxWidth: '390px', backgroundColor: 'white', margin: 'auto', height: '100%', overflow: 'auto' }}>
                <div className='pt-4 pb-1' style={{boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)', marginBottom: '3px'}}>
                    <p className='text-center fs-6 fw-bold' style={{color: '#B31312'}}>Pesanan Selesai</p>
                </div>

                <div className='text-center my-4'>
                    <Icon icon="lets-icons:check-fill" color="#2b2a4c" width="100"/>
                    <p className='fs-6 fw-bold' style={{color: "#2B2A4C"}}>Pesanan Selesai</p>
                </div>

                <div className='m-5 px-3 py-4 rounded' style={{boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)'}}>
                    <div style={{color: '#2B2A4C'}}>
                        <p className='mb-0 fw-bold fs-6'>Rianti Kamila</p>
                        <p className='mb-0 fs-0'>0897 6090 0008</p>
                        <p className='mb-0' style={{fontSize: "10px"}}>Kp. Kenari Cahaya, Jl Kembang Sakti</p>
                    </div>
                    <div className='mt-3'>
                        <p className='mb-0 fw-bold fs-6'>{product.nama_produk}</p>
                        <p>Rp {product.harga}</p>
                    </div>
                    <div>
                        <p className='mb-0 fw-bold fs-6'>Nomor Resi</p>
                        <div className='rounded d-flex justify-content-center align-items-center p-1' style={{backgroundColor: "#EA906C", padding: "1px"}}>
                            <p className='text-white fs-6 fw-bold mb-0'>4528 9689 1258 9865</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mb-2 mx-5 fw-bold fs-6' style={{color: '#B31312'}}>Status Pengiriman</p>
                    <div className="mx-4">
                        <ul style={listStyle}>
                            <li>
                                <span style={dotStyle}></span>
                                Anda mengatur jasa kirim
                            </li>
                            <li>
                                <span style={dotStyle}></span>
                                Paket sedang di ambil
                            </li>
                            <li>
                                <span style={dotStyle}></span>
                                Paket telah diterima jasa kirim
                            </li>
                            <li>
                                <span style={dotStyle}></span>
                                Paket diantarkan ke jasa kirim terdekat
                            </li>
                            <li>
                                <span style={dotStyle}></span>
                                Paket sedang diantar ke alamat tujuan
                            </li>
                            <li style={{color: '#B31312'}}>
                                <span style={dotStyle}></span>
                                Paket telah diterima
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderProcessSuccessPrev;