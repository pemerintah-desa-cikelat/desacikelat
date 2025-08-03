'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const beritaPerHalaman = 6;

export default function Berita() {
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [halamanSaatIni, setHalamanSaatIni] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/berita')
      .then((res) => res.json())
      .then((data) => {
        const urutTerbaru = data.sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
        );
        setTimeout(() => {
          setSemuaBerita(urutTerbaru);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.error('Gagal memuat data berita:', err);
        setLoading(false);
      });
  }, []);

  const gantiHalaman = (nomor) => {
    setHalamanSaatIni(nomor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const renderBerita = () => {
    const mulai = (halamanSaatIni - 1) * beritaPerHalaman;
    const selesai = mulai + beritaPerHalaman;
    const dataTampil = semuaBerita.slice(mulai, selesai);

    return dataTampil.map((item, index) => (
      <a
        key={item.id || index}
        href={`berita-detail/${item.id}`}
        className="block bg-[#FFFBDE] shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-200"
      >
        <img
          src={item.gambar}
          alt="Foto Berita"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-1">
            {new Date(item.tanggal).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-3">
            {item.judul}
          </h3>
          <p className="text-sm text-gray-400 mt-2">Sumber: {item.sumber}</p>
        </div>
      </a>
    ));
  };

  const renderPagination = () => {
    const totalHalaman = Math.ceil(semuaBerita.length / beritaPerHalaman);
    if (totalHalaman <= 1) return null;

    return (
      <div className="mt-10 flex justify-center space-x-2">
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
          disabled={halamanSaatIni === 1}
          onClick={() => gantiHalaman(halamanSaatIni - 1)}
        >
          «
        </button>

        {Array.from({ length: totalHalaman }, (_, i) => (
          <button
            key={i}
            onClick={() => gantiHalaman(i + 1)}
            className={`px-4 py-2 rounded-md font-semibold ${halamanSaatIni === i + 1
              ? 'bg-[#129990] text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100 transition'
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
          disabled={halamanSaatIni === totalHalaman}
          onClick={() => gantiHalaman(halamanSaatIni + 1)}
        >
          »
        </button>

      </div>
    );
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <Navbar />

      <main className="pt-36 pb-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#096B68] mb-12">
            Berita Desa
          </h1>

          {/* Grid Berita */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[300px]">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#129990] border-t-transparent rounded-full mb-3" />
                <p className="text-lg text-gray-500">Memuat...</p>
              </div>
            ) : semuaBerita.length === 0 ? (
              <div className="col-span-full text-center text-red-600">
                Tidak ada berita tersedia.
              </div>
            ) : (
              renderBerita()
            )}
          </div>

          {/* Pagination */}
          {!loading && renderPagination()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
