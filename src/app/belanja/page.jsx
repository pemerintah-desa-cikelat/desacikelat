'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Belanja = () => {
  const [produk, setProduk] = useState([]);
  const [halaman, setHalaman] = useState(1);
  const [loading, setLoading] = useState(true);
  const produkPerHalaman = 6;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch('/api/produk');
        const data = await res.json();
        // Kasih delay sedikit agar "Memuat..." sempat muncul
        setTimeout(() => {
          setProduk(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Gagal memuat produk:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalHalaman = Math.ceil(produk.length / produkPerHalaman);
  const indexMulai = (halaman - 1) * produkPerHalaman;
  const dataHalaman = produk.slice(indexMulai, indexMulai + produkPerHalaman);

  const gantiHalaman = (nomor) => {
    setHalaman(nomor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800 font-inter">
      <Navbar />

      <main className="pt-36 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#096B68] mb-12">Produk UMKM</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[300px]">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#129990] border-t-transparent rounded-full mb-3" />
                <p className="text-lg text-gray-500">Memuat...</p>
              </div>
            ) : dataHalaman.length === 0 ? (
              <div className="col-span-full text-center text-red-600">
                Tidak ada produk tersedia.
              </div>
            ) : (
              dataHalaman.map((item) => (
                <a
                  key={item.id}
                  href={`/produk-detail/${item.id}`}
                  className="block bg-[#FFFBDE] shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-200"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rp{item.harga.toLocaleString('id-ID')}
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
          {/* Pagination */}
          {!loading && totalHalaman > 1 && (
            <div className="mt-10 flex justify-center space-x-2">
              <button
                onClick={() => gantiHalaman(halaman - 1)}
                disabled={halaman === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
              >
                «
              </button>
              {[...Array(totalHalaman)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => gantiHalaman(i + 1)}
                  className={`px-4 py-2 rounded-md font-semibold ${halaman === i + 1
                    ? 'bg-[#129990] text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-100 transition'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => gantiHalaman(halaman + 1)}
                disabled={halaman === totalHalaman}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
              >
                »
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Belanja;
