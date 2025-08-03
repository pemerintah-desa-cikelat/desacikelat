"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChartBar, ChartPie } from "../../components/ChartComponents";

export default function Infografis() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("penduduk");
    const [selectedYear, setSelectedYear] = useState(null);

    // Fetch data saat activeTab penduduk
    useEffect(() => {
        if (activeTab !== "penduduk") return;

        setLoading(true);
        fetch("/api/infografis")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal memuat data infografis:", err);
                setLoading(false);
            });
    }, [activeTab]);

    // Set tahun default saat tab apbdes aktif dan data sudah ada
    useEffect(() => {
        if (activeTab === "apbdes" && data?.apbdes?.length > 0 && !selectedYear) {
            // Ambil tahun terbaru (data sudah diurutkan asc, ambil terakhir)
            const sorted = [...data.apbdes].sort((a, b) => b.tahun - a.tahun);
            setSelectedYear(sorted[0].tahun);
        }
    }, [activeTab, data, selectedYear]);

    return (
        <div className="bg-gray-100 text-gray-800 font-inter min-h-screen flex flex-col">
            <Navbar />

            <main className="pt-36 pb-16 px-4 bg-white flex-grow">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                        <h1 className="text-3xl font-bold text-[#096B68]">INFOGRAFIS DESA CIKELAT</h1>
                        <div className="flex space-x-4">
                            {[
                                { id: "penduduk", label: "Penduduk" },
                                { id: "apbdes", label: "APBDes" },
                                { id: "bansos", label: "Bansos" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md font-semibold transition ${activeTab === tab.id
                                        ? "bg-[#129990] text-white shadow-md"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CONTENT */}

                    {/* Tab Penduduk */}
                    {activeTab === "penduduk" && (
                        <>
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center text-lg text-gray-500">
                                    <div className="w-10 h-10 border-4 border-[#129990] border-t-transparent rounded-full animate-spin mb-4"></div>
                                    Memuat data...
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#096B68] mb-12">
                                        Data Demografi dan Statistik Penduduk Desa Cikelat
                                    </h2>
                                    {/* Statistik Angka */}
                                    <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                {
                                                    id: "jumlahPenduduk",
                                                    label: "Penduduk",
                                                    desc: "Total seluruh penduduk yang tinggal di Desa Cikelat.",
                                                    value: data?.statistik?.jumlah_penduduk || 0,
                                                },
                                                {
                                                    id: "jumlahKK",
                                                    label: "Kepala Keluarga",
                                                    desc: "Jumlah total kepala keluarga yang terdata di Desa Cikelat.",
                                                    value: data?.statistik?.jumlah_kk || 0,
                                                },
                                                {
                                                    id: "jumlahLaki",
                                                    label: "Laki-laki",
                                                    desc: "Jumlah penduduk laki-laki di Desa Cikelat.",
                                                    value: data?.statistik?.laki_laki || 0,
                                                },
                                                {
                                                    id: "jumlahPerempuan",
                                                    label: "Perempuan",
                                                    desc: "Jumlah penduduk perempuan di Desa Cikelat.",
                                                    value: data?.statistik?.perempuan || 0,
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex bg-white rounded-xl shadow-md overflow-hidden"
                                                >
                                                    <div className="bg-gradient-to-b from-[#129990] to-[#0e7e78] text-white w-1/3 flex flex-col justify-center items-center p-4">
                                                        <div className="text-3xl font-bold" id={item.id}>
                                                            {item.value.toLocaleString("id-ID")}
                                                        </div>
                                                        <div className="text-sm text-center">{item.label}</div>
                                                    </div>
                                                    <div className="p-4 flex flex-col justify-center w-2/3">
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            Jumlah {item.label}
                                                        </h3>
                                                        <p className="text-sm text-gray-700">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Charts */}
                                    <div className="space-y-16 mt-10">
                                        <div>
                                            <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8">
                                                Kelompok Umur
                                            </h2>
                                            <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                                <ChartBar
                                                    labels={data.kelompok_umur.map((item) => item.rentang_umur)}
                                                    data={data.kelompok_umur.map((item) => item.jumlah)}
                                                    options={{
                                                        indexAxis: "y",
                                                        responsive: true,
                                                        plugins: { legend: { display: false } },
                                                    }}
                                                />
                                            </section>
                                        </div>

                                        <div>
                                            <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8">
                                                Distribusi Penduduk per Dusun
                                            </h2>
                                            <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                                <div className="flex flex-col lg:flex-row items-center gap-8">
                                                    {/* Chart di kiri */}
                                                    <div className="w-full lg:w-1/3">
                                                        <ChartPie
                                                            labels={data.dusun.map((item) => item.nama_dusun)}
                                                            data={data.dusun.map((item) => item.jumlah)}
                                                            options={{
                                                                responsive: true,
                                                                plugins: {
                                                                    legend: { display: false },
                                                                },
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Keterangan di kanan */}
                                                    <div className="w-full lg:w-2/3">
                                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Keterangan:</h3>
                                                        <ul className="space-y-2 text-gray-700 text-lg">
                                                            {data.dusun.map((item, idx) => (
                                                                <li key={idx}>
                                                                    <span className="font-semibold">{item.nama_dusun}</span>:{" "}
                                                                    {item.jumlah.toLocaleString("id-ID")} jiwa
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8">
                                                Pendidikan Terakhir
                                            </h2>
                                            <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                                <ChartBar
                                                    labels={data.pendidikan_terakhir.map((item) => item.jenjang)}
                                                    data={data.pendidikan_terakhir.map((item) => item.jumlah)}
                                                    options={{
                                                        responsive: true,
                                                        plugins: { legend: { display: false } },
                                                    }}
                                                />
                                            </section>
                                        </div>

                                        <div>
                                            <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8">
                                                Status Perkawinan
                                            </h2>
                                            <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                                <ChartBar
                                                    labels={data.status_perkawinan.map((item) => item.status)}
                                                    data={data.status_perkawinan.map((item) => item.jumlah)}
                                                    options={{
                                                        responsive: true,
                                                        plugins: { legend: { display: false } },
                                                    }}
                                                />
                                            </section>
                                        </div>

                                        <div>
                                            <h2 className="text-3xl font-bold text-center text-[#096B68] mb-8">
                                                Agama
                                            </h2>
                                            <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6">
                                                <ChartBar
                                                    labels={data.agama.map((item) => item.nama)}
                                                    data={data.agama.map((item) => item.jumlah)}
                                                    options={{
                                                        responsive: true,
                                                        plugins: { legend: { display: false } },
                                                    }}
                                                />
                                            </section>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {/* Tab APBDes */}
                    {activeTab === "apbdes" && (
                        <>
                            {loading ? (
                                <div className="flex justify-center items-center py-20 text-lg text-gray-500">
                                    <div className="w-10 h-10 border-4 border-[#129990] border-t-transparent rounded-full animate-spin mr-4"></div>
                                    Memuat data APBDes...
                                </div>
                            ) : data?.apbdes && data.apbdes.length > 0 ? (
                                (() => {
                                    // Sort data dari tahun terlama ke terbaru, ambil 4 terakhir
                                    const apbdesSorted = [...data.apbdes]
                                        .sort((a, b) => a.tahun - b.tahun)
                                        .slice(-4);

                                    // Dropdown urut terbaru ke lama
                                    const dropdownOptions = [...apbdesSorted].sort((a, b) => b.tahun - a.tahun);

                                    const tahunData = apbdesSorted.find((d) => d.tahun === selectedYear);

                                    return (
                                        <section className="space-y-8">
                                            {/* Header + Dropdown Tahun */}
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#096B68] mb-12">
                                                    APB Desa Cikelat Tahun {selectedYear}
                                                </h2>
                                                <select
                                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#129990]"
                                                    value={selectedYear}
                                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                                >
                                                    {dropdownOptions.map((item) => (
                                                        <option key={item.tahun} value={item.tahun}>
                                                            {item.tahun}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Layout grid: grafik kiri, card kanan */}
                                            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-start">
                                                {/* Grafik */}
                                                {apbdesSorted.length > 1 && (
                                                    <section className="bg-[#FFFBDE] rounded-xl shadow-lg p-6 w-full">
                                                        <h3 className="text-xl font-bold text-center text-[#096B68] mb-6">
                                                            Grafik Tren APBDes (Pendapatan vs Belanja)
                                                        </h3>
                                                        <ChartBar
                                                            type="line"
                                                            labels={apbdesSorted.map((item) => item.tahun)}
                                                            dataSets={[
                                                                {
                                                                    label: "Pendapatan",
                                                                    data: apbdesSorted.map((item) => item.pendapatan),
                                                                    borderColor: "#10B981",
                                                                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                                                                    tension: 0,
                                                                },
                                                                {
                                                                    label: "Belanja",
                                                                    data: apbdesSorted.map((item) => item.belanja),
                                                                    borderColor: "#EF4444",
                                                                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                                                                    tension: 0,
                                                                },
                                                            ]}
                                                            options={{
                                                                responsive: true,
                                                                plugins: {
                                                                    legend: { position: "bottom" },
                                                                    tooltip: {
                                                                        callbacks: {
                                                                            label: function (ctx) {
                                                                                return `${ctx.dataset.label}: Rp ${parseInt(ctx.raw).toLocaleString("id-ID")}`;
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                                scales: {
                                                                    y: {
                                                                        ticks: {
                                                                            callback: function (value) {
                                                                                return "Rp " + value.toLocaleString("id-ID");
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    </section>
                                                )}

                                                {/* Card Pendapatan dan Belanja */}
                                                <div className="space-y-6">
                                                    {["pendapatan", "belanja"].map((key) => {
                                                        const label = key === "pendapatan" ? "Pendapatan" : "Belanja";

                                                        return (
                                                            <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                                <div
                                                                    className="bg-gradient-to-br text-white p-6"
                                                                    style={{
                                                                        backgroundImage:
                                                                            key === "pendapatan"
                                                                                ? "linear-gradient(to bottom right, #10B981, #059669)"
                                                                                : "linear-gradient(to bottom right, #EF4444, #B91C1C)",
                                                                    }}
                                                                >
                                                                    <div className="text-2xl font-bold">
                                                                        Rp {parseInt(tahunData?.[key] || 0).toLocaleString("id-ID")}
                                                                    </div>
                                                                    <div className="text-sm uppercase tracking-wide">{label}</div>
                                                                </div>
                                                                <div className="p-4">
                                                                    <p className="text-sm text-gray-600">
                                                                        Total {label.toLowerCase()} Desa Cikelat pada tahun {selectedYear}.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {/* Tambahkan setelah ["pendapatan", "belanja"] */}
                                                    {(() => {
                                                        const saldo = tahunData ? tahunData.pendapatan - tahunData.belanja : 0;
                                                        return (
                                                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                                <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white p-6">
                                                                    <div className="text-2xl font-bold">
                                                                        Rp {saldo.toLocaleString("id-ID")}
                                                                    </div>
                                                                    <div className="text-sm uppercase tracking-wide">Saldo Anggaran</div>
                                                                </div>
                                                                <div className="p-4">
                                                                    <p className="text-sm text-gray-600">
                                                                        Sisa anggaran Desa Cikelat pada tahun {selectedYear}.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </section>
                                    );
                                })()
                            ) : (
                                <div className="text-center py-20 text-gray-600 text-xl italic">
                                    Data APBDes belum tersedia.
                                </div>
                            )}
                        </>
                    )}


                    {/* Tab Bansos */}
                    {activeTab === "bansos" && (
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#096B68] mb-12">
                                Penerima Bantuan Sosial Masyarakat Desa Cikelat
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { label: "BPJS PBI", key: "bpjs_pbi" },
                                    { label: "PKH", key: "pkh" },
                                    { label: "BPNT", key: "bpnt" },
                                    { label: "BLT", key: "blt" },
                                ].map(({ label, key }) => (
                                    <div
                                        key={key}
                                        className="bg-[#FFFBDE] rounded-xl shadow-lg p-6 text-center"
                                    >
                                        <h3 className="text-2xl font-semibold text-[#129990] mb-2">{label}</h3>
                                        <p className="text-4xl font-bold text-gray-800">
                                            {data?.bansos?.[key] ?? 0}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">Jumlah penerima</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
