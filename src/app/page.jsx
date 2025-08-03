import { getHomeData } from '../lib/getHomeData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import AnnouncementItem from '../components/AnnouncementItem';
import { getImageUrl } from '../lib/getImageURL';

export default async function Home() {
  const data = await getHomeData();

  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <Navbar />

      {/* Hero */}
      <main className="relative overflow-hidden h-screen">
        <img
          src={getImageUrl("img/homepage.png")}
          alt="Desa Cikelat"
          className="w-full h-full object-cover filter blur-[3.5px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50"></div>
        <div
          className="absolute top-1/2 left-1/2 md:left-20 transform -translate-y-1/2 -translate-x-1/2 md:translate-x-0 text-white z-10 text-center md:text-left px-4"
          style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 1)' }}
        >
          <h1 className="text-5xl font-bold mb-2">Selamat Datang</h1>
          <h2 className="text-3xl font-semibold mb-2">Website Resmi Desa Cikelat</h2>
          <p className="text-xl">Pusat Informasi Desa Cikelat</p>
        </div>
      </main>

      {/* Pengumuman */}
      <section className="bg-white py-14 px-6">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">📢 PENGUMUMAN</h2>
        <div className="max-w-7xl mx-auto space-y-6">
          {data.pengumuman?.length > 0 ? (
            data.pengumuman.map((item, i) => (
              <AnnouncementItem
                key={i}
                judul={item.judul}
                tanggal={item.tanggal}
                isi={item.isi}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">Belum ada pengumuman.</p>
          )}
        </div>
      </section>

      {/* Sejarah Desa */}
      <section className="bg-white py-14 px-6">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">SEJARAH DESA CIKELAT</h2>
        <div className="max-w-7xl mx-auto bg-[#FFFBDE] shadow-xl rounded-2xl p-8 text-lg leading-relaxed">
          <p className="text-gray-800">{data.sejarah}</p>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="bg-white py-14 px-6">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">SAMBUTAN KEPALA DESA</h2>
        <div className="max-w-7xl mx-auto bg-[#FFFBDE] rounded-2xl shadow-xl p-8 md:flex md:items-start md:space-x-10">
          <div className="flex-shrink-0 flex justify-center mb-6 md:mb-0">
            <img
              src={getImageUrl("foto_kades/kepala-desa.png")}
              alt="Kepala Desa"
              className="w-52 h-52 md:w-64 md:h-64 object-contain"
            />
          </div>
          <div className="text-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{data.nama_kepala_desa}</h3>
            <p className="text-base md:text-lg text-gray-700 mb-3">{data.jabatan_kepala_desa}</p>
            <div className="text-lg leading-relaxed">
              {data.sambutan
                .split(/\n\s*\n/)
                .map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Administrasi Penduduk */}
      <section className="bg-white py-10 px-4">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">ADMINISTRASI PENDUDUK</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: 'penduduk',
              label: 'Jumlah Penduduk',
              value: data.jumlah_penduduk,
              desc: 'Total seluruh penduduk yang tinggal di Desa Cikelat.',
            },
            {
              id: 'kk',
              label: 'Jumlah Kepala Keluarga',
              value: data.jumlah_kk,
              desc: 'Jumlah total kepala keluarga yang terdata di Desa Cikelat.',
            },
            {
              id: 'laki',
              label: 'Penduduk Laki-laki',
              value: data.laki_laki,
              desc: 'Jumlah penduduk laki-laki di Desa Cikelat.',
            },
            {
              id: 'perempuan',
              label: 'Penduduk Perempuan',
              value: data.perempuan,
              desc: 'Jumlah penduduk perempuan di Desa Cikelat.',
            },
          ].map((item, index) => (
            <div key={index} className="flex bg-[#FFFBDE] rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-b from-[#129990] to-[#0e7e78] text-white w-1/3 flex flex-col justify-center items-center p-4">
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm text-center">
                  {{
                    penduduk: 'Penduduk',
                    kk: 'Kepala Keluarga',
                    laki: 'Laki-laki',
                    perempuan: 'Perempuan',
                  }[item.id]}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center w-2/3">
                <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="bg-white py-14 px-6">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">BERITA TERBARU</h2>
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto mb-10">
          {data.berita.map((item, index) => (
            <Link
              key={item.id || index}
              href={`berita-detail/${item.id}`}
              className="block bg-[#FFFBDE] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-1">{item.tanggal}</p>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-3">{item.judul}</h3>
                <p className="text-sm text-gray-400 mt-1">Sumber: {item.sumber}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-x-auto flex space-x-4 px-2 pb-2 snap-x">
          {data.berita.map((item, index) => (
            <Link
              key={item.id || index}
              href={`berita-detail?id=${item.id}`}
              className="bg-[#FFFBDE] shadow-md rounded-lg min-w-[80%] snap-start shrink-0 hover:shadow-lg transition duration-200"
            >
              <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{item.tanggal}</p>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-3">{item.judul}</h3>
                <p className="text-sm text-gray-400 mt-1">Sumber: {item.sumber}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-right max-w-7xl mx-auto mt-6">
          <a href="/berita" className="inline-block text-[#129990] font-medium hover:underline transition">
            Lihat Berita Lebih Banyak →
          </a>
        </div>
      </section>

      {/* Produk UMKM */}
      <section className="bg-white py-14 px-6">
        <h2 className="text-4xl font-bold text-center text-[#096B68] mb-10">PRODUK UMKM DESA</h2>
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto mb-10">
          {data.produk.map((item, index) => (
            <Link
              key={item.id || index}
              href={`produk-detail?id=${item.id}`}
              className="block bg-[#FFFBDE] shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-200"
            >
              <img src={item.gambar} alt={item.nama} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.nama}</h3>
                <p className="text-sm text-gray-500 mt-1">Rp {item.harga?.toLocaleString('id-ID')}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden overflow-x-auto flex space-x-4 px-2 pb-2 snap-x">
          {data.produk.map((item, index) => (
            <Link
              key={item.id || index}
              href={`produk-detail?id=${item.id}`}
              className="bg-[#FFFBDE] shadow-md rounded-lg min-w-[80%] snap-start shrink-0 hover:shadow-lg transition duration-200"
            >
              <img src={item.gambar} alt={item.nama} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.nama}</h3>
                <p className="text-sm text-gray-500 mt-1">Rp {item.harga?.toLocaleString('id-ID')}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-right max-w-7xl mx-auto mt-6">
          <a href="/belanja" className="inline-block text-[#129990] font-medium hover:underline transition">
            Lihat Produk Lainnya →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
