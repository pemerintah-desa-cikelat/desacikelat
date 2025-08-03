'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getImageUrl } from '../../lib/getImageURL';

export default function Profil() {
    const [data, setData] = useState(null);
    const [overlayOpen, setOverlayOpen] = useState(false);

    useEffect(() => {
        fetch('/api/profil-data')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Gagal fetch data profil:', err));
    }, []);

    return (
        <div className="bg-gray-100 text-gray-800 font-inter min-h-screen flex flex-col">
            <Navbar />

            <main className="pt-36 pb-16 px-6 bg-white flex-grow">
                <div className="max-w-6xl mx-auto space-y-12">

                    <h1 className="text-4xl font-bold text-center text-[#096B68] mb-12">
                        Profil Desa Cikelat
                    </h1>

                    {!data ? (
                        <div className="text-center text-gray-500 flex flex-col items-center justify-center mt-12">
                            <div className="w-12 h-12 border-4 border-[#129990] border-t-transparent rounded-full animate-spin mb-5"></div>
                            <p className="text-xl font-medium">Memuat data profil...</p>
                        </div>
                    ) : (
                        <>
                            {/* Sejarah */}
                            <section className="bg-[#FFFBDE] shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-[#129990] mb-6 text-center">
                                    Sejarah Desa Cikelat
                                </h2>
                                <p className="text-lg text-gray-800 leading-relaxed text-justify">
                                    {data.sejarah}
                                </p>
                            </section>
                            {/* Visi */}
                            <section className="bg-[#FFFBDE] shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-[#129990] mb-6 text-center">
                                    Visi Desa Cikelat
                                </h2>
                                <p className="text-lg text-gray-800 leading-relaxed text-center">
                                    {data.visi}
                                </p>
                            </section>

                            {/* Misi */}
                            <section className="bg-[#FFFBDE] shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-[#129990] mb-6 text-center">
                                    Misi Desa Cikelat
                                </h2>
                                <ol className="list-decimal pl-8 text-lg text-gray-800 leading-relaxed space-y-4 max-w-3xl mx-auto">
                                    {data.misi.map((item, i) => (
                                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                                    ))}
                                </ol>
                            </section>

                            {/* Struktur Organisasi */}
                            <section className="bg-[#FFFBDE] shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-[#129990] mb-8 text-center">
                                    Struktur Organisasi Desa Cikelat
                                </h2>
                                <div className="flex justify-center">
                                    <img
                                        src={getImageUrl("struktur/struktur-organisasi.png")}
                                        alt="Struktur Organisasi"
                                        className="w-full max-w-3xl rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300"
                                        onClick={() => setOverlayOpen(true)}
                                    />
                                </div>
                            </section>

                            {/* Peta dan Info */}
                            <section className="bg-[#FFFBDE] shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-[#129990] mb-8 text-center">
                                    Peta Lokasi Desa Cikelat
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Info Box */}
                                    <div className="bg-white rounded-xl shadow-md p-8 space-y-6 text-center md:text-left">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-gray-700 mb-1">
                                                Luas Wilayah
                                            </h3>
                                            <p className="text-xl text-gray-900">
                                                ± {parseFloat(data.luas_wilayah).toLocaleString('id-ID')} ha
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold text-gray-700 mb-1">
                                                Jumlah Penduduk
                                            </h3>
                                            <p className="text-xl text-gray-900">
                                                ± {data.jumlah_penduduk.toLocaleString('id-ID')} jiwa
                                            </p>
                                        </div>
                                    </div>

                                    {/* Map */}
                                    <div className="rounded-xl overflow-hidden shadow-md">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.846571207046!2d106.82290191477018!3d-6.413305764445722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699d5f396fd2ff%3A0xd06eac1e962fc865!2sCikelat%2C%20Kec.%20Cisolok%2C%20Kabupaten%20Sukabumi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1721212800000!5m2!1sid!2sid"
                                            width="100%"
                                            height="400"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </main>

            {/* Overlay Full Image */}
            {overlayOpen && data && (
                <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-black/50 z-50 flex items-center justify-center p-6 overflow-auto">
                    <button
                        className="absolute top-6 right-6 text-white text-5xl font-bold leading-none focus:outline-none"
                        onClick={() => setOverlayOpen(false)}
                        aria-label="Tutup gambar"
                    >
                        ×
                    </button>
                    <img
                        src={getImageUrl("struktur/struktur-organisasi.png")}
                        alt="Struktur Organisasi Full"
                        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                    />
                </div>
            )}

            <Footer />
        </div>
    );
}
