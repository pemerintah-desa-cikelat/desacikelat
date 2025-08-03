'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function BeritaDetailClient({ id }) {
    const [berita, setBerita] = useState(null);
    const [terbaru, setTerbaru] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const ambilData = async () => {
            try {
                const resDetail = await fetch(`/api/berita/${id}`);
                const dataDetail = await resDetail.json();
                setBerita(dataDetail);

                const resSemua = await fetch('/api/berita');
                const semua = await resSemua.json();
                const beritaLain = semua.filter((item) => item.id.toString() !== id).slice(0, 6);
                setTerbaru(beritaLain);
            } catch (err) {
                console.error('Gagal memuat data:', err);
            } finally {
                setLoading(false);
            }
        };

        ambilData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 font-inter flex justify-center items-center">
                <p>Memuat...</p>
            </div>
        );
    }

    if (!berita) {
        return (
            <div className="min-h-screen bg-gray-100 font-inter flex justify-center items-center text-red-600">
                <p>Berita tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 text-gray-800 font-inter">
            <Navbar />
            <main className="pt-36 pb-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Konten utama */}
                    <div className="flex-1 lg:basis-[75%] bg-[#FFFBDE] rounded-xl shadow p-8">
                        <a href="/berita" className="inline-block mb-6 text-[#129990] font-medium text-base hover:underline transition">← Kembali</a>
                        <h1 className="text-4xl font-bold text-[#129990] mb-4">{berita.judul}</h1>
                        <div className="text-sm text-gray-500 mb-6 flex items-center gap-4">
                            <span>{new Date(berita.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            <span>|</span>
                            <span>Sumber: {berita.sumber}</span>
                        </div>
                        <img src={berita.gambar} alt={berita.judul} className="w-full h-[500px] object-cover rounded mb-8" />
                        <p className="text-lg leading-relaxed whitespace-pre-line">{berita.isi}</p>
                    </div>

                    {/* Sidebar berita terbaru */}
                    <aside className="lg:basis-[25%] flex-shrink-0">
                        <div className="bg-[#FFFBDE] rounded-xl shadow p-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#129990]">Berita Terbaru</h2>
                            <div className="hidden lg:block space-y-4">
                                {terbaru.map((item) => (
                                    <a key={item.id} href={`/berita-detail/${item.id}`} className="flex gap-3 hover:brightness-95 p-2 rounded transition">
                                        <img src={item.gambar} alt="" className="w-20 h-16 object-cover rounded" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.judul}</h3>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Swiper */}
                            <div className="lg:hidden mt-4">
                                <Swiper
                                    loop={true}
                                    spaceBetween={16}
                                    slidesPerView={1.2}
                                    centeredSlides={true}
                                    grabCursor={true}
                                >
                                    {terbaru.slice(0, 5).map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <a href={`/berita-detail/${item.id}`} className="block rounded overflow-hidden">
                                                <img src={item.gambar} alt="" className="w-full h-36 object-cover rounded-t" />
                                                <div className="p-3">
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.judul}</h3>
                                                </div>
                                            </a>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}
