'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ProdukDetailClient({ id }) {
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/produk/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduk(data);
      })
      .catch(() => setProduk(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <Navbar />

      <main className="pt-36 pb-20 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col gap-10 lg:flex-row">
          {loading ? (
            <p className="text-center w-full">Memuat data produk...</p>
          ) : produk ? (
            <>
              <div className="lg:w-1/2">
                <img
                  src={produk.gambar}
                  alt={produk.nama}
                  className="w-full h-[450px] object-cover rounded-lg shadow"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-[#129990] mb-4">{produk.nama}</h2>
                  <p className="text-2xl font-semibold text-gray-800 mb-6">
                    Rp{produk.harga.toLocaleString('id-ID')}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{produk.deskripsi}</p>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hubungi Penjual:</p>
                    <a
                      href={`https://wa.me/${produk.kontak.replace(/[^0-9]/g, '')}`}
                      className="text-xl text-[#129990] font-semibold hover:underline"
                    >
                      {produk.kontak}
                    </a>
                  </div>
                  <a
                    href="/belanja"
                    className="inline-block text-[#129990] hover:underline text-lg font-semibold transition"
                  >
                    ← Kembali
                  </a>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center w-full text-red-600">Produk tidak ditemukan.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
