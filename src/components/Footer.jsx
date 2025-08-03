'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getImageUrl } from '../lib/getImageURL';

export default function Footer() {
  const [footer, setFooter] = useState({ kontak: '', email: '' });

  useEffect(() => {
    fetch('/api/footer')
      .then(res => res.json())
      .then(data => setFooter(data))
      .catch(err => console.error('Gagal memuat data footer:', err));
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil Desa" },
    { href: "/infografis", label: "Infografis" },
    { href: "/peta", label: "Peta" },
    { href: "/berita", label: "Berita" },
    { href: "/belanja", label: "Belanja" },
  ];

  return (
    <footer className="bg-[#0e7e78] text-white mt-20">
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        {/* Info Desa */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
          <img
            src={getImageUrl("img/sukabumi.png")}
            alt="Logo Kabupaten Sukabumi"
            className="w-20 md:w-24 h-auto"
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">Desa Cikelat</h3>
            <p>
              Kecamatan Cisolok, Kabupaten Sukabumi
              <br />
              Provinsi Jawa Barat, Indonesia
              <br />
              Kode Pos 43366
            </p>
          </div>
        </div>

        {/* Navigasi */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Hubungi Kami</h3>
          <p>
            Email:{' '}
            <a href={`mailto:${footer.email}`} className="underline">
              {footer.email || '—'}
            </a>
          </p>
          <p>
            Telepon:{' '}
            <a href={`tel:${footer.kontak}`} className="underline">
              {footer.kontak || '—'}
            </a>
          </p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-white/20 text-sm bg-[#0c605b]">
        &copy; 2025 Desa Cikelat. All rights reserved.
      </div>
    </footer>
  );
}
