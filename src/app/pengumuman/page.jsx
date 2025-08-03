import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnnouncementItem from '@/components/AnnouncementItem'

export default async function PengumumanPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pengumuman`, {
    cache: 'no-store',
  })

  const data = await res.json()

  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <Navbar />

      <main className="pt-32 px-6 pb-20 bg-white min-h-screen">
        <h1 className="text-5xl font-bold text-center text-[#096B68] mb-12">📢 Pengumuman</h1>

        <div className="max-w-5xl mx-auto space-y-6">
          {data?.length > 0 ? (
            data.map((item, i) => (
              <AnnouncementItem
                key={item.id || i}
                judul={item.judul}
                tanggal={item.tanggal}
                isi={item.isi}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">Belum ada pengumuman.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
