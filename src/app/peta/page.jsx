'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Peta() {
  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <Navbar />

      <main className="pt-36 pb-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-[#096B68] mb-8">Peta Lokasi Desa Cikelat</h1>
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.846571207046!2d106.82290191477018!3d-6.413305764445722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699d5f396fd2ff%3A0xd06eac1e962fc865!2sCikelat%2C%20Kec.%20Cisolok%2C%20Kabupaten%20Sukabumi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1721212800000!5m2!1sid!2sid"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
