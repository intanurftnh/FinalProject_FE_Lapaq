import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getOrder } from '../../services/order';
import { productId } from '../../services/product';
import { getUserToken } from '../../utils/jwt';
import Swal from 'sweetalert2';

const OrderHistoryPrev = () => {
  const [products, setProducts] = useState([]);
  const [tokenUser, setTokenUser] = useState();
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenUserData = getUserToken();
        setTokenUser(tokenUserData);

        const token = tokenUserData.token;
        const userBuyerId = tokenUserData.user._id;

        const response = await getOrder(userBuyerId, token);
        if (response && Array.isArray(response.payload)) {
          const updatedProducts = await Promise.all(response.payload.map(async (product) => {
            const productDetails = await productId(product.product_id);
            return {
              ...productDetails,
              status: product.status // Sesuaikan dengan properti status produk Anda
            };
          }));
          setProducts(updatedProducts);
        } else {
          console.error('Data produk tidak ditemukan atau bukanlah array:', response);
        }
      } catch (error) {
        console.error('Gagal mengambil data dari server:', error);
      }
    };

    fetchData();
  }, []);

  const filterIcons = [
    { id: 'kemas', icon: 'icon-park-outline:transaction-order' },
    { id: 'kirim', icon: 'basil:location-outline' },
    { id: 'selesai', icon: 'ant-design:file-done-outlined' },
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <div className='pt-4 pb-1' style={{ boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)', marginBottom: '3px' }}>
        <p className='text-center fs-6 fw-bold' style={{ color: '#B31312' }}>Riwayat pemesanan</p>
      </div>

      <div className="container mt-5">
        <div className="row">
          {filterIcons.map((filterIcon) => (
            <div key={filterIcon.id} className="col-4 d-flex justify-content-center align-items-center">
              <button
                className='btn btn-lg btn-block mb-3 rounded-circle'
                style={{
                  backgroundColor: activeFilter === filterIcon.id ? '#B31312' : '#EEE2DE',
                  color: activeFilter === filterIcon.id ? '#FFFFFF' : '#B31312',
                  width: '60px',
                  height: '60px'
                }}
                onClick={() => handleFilterClick(filterIcon.id)}
              >
                <Icon icon={filterIcon.icon} width="25" />
              </button>
            </div>
          ))}
        </div>

        <div className="row m-3">
          {products
            .filter((product) => activeFilter === '' || product.status === activeFilter)
            .map((product) => (
              <div key={product._id} className="product-card d-flex align-items-center rounded mb-3 py-1 px-2" style={{ boxShadow: '0 3px 2px rgba(0, 0, 0, 0.1)' }}>
                <div className="image">
                  <img className="rounded" src={product.payload.image} alt={product.payload.nama_produk} width="70px" height="70px" />
                </div>
                <div className="title ms-3" style={{ width: '225px' }}>
                  <h3 className="fs-6 mb-2 fw-bold" style={{ color: '#2B2A4C' }}>{product.payload.nama_produk}</h3>
                  <div style={{ color: "#ea906c" }}>
                    <p className="mb-0"><span>Rp </span>{product.payload.harga}</p>
                  </div>
                  <div className='mt-2'>
                    {activeFilter === 'kemas' && <p style={{ color: '#2B2A4C' }}>Produk sedang di kemas penjual</p>}
                    {activeFilter === 'kirim' && <p style={{ color: '#2B2A4C' }}>Produk sedang di kirim</p>}
                    {activeFilter === 'selesai' && <p style={{ color: '#2B2A4C' }}>Produk telah diterima</p>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPrev;
