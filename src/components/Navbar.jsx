"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getImageUrl } from '../lib/getImageURL';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil Desa" },
    { href: "/infografis", label: "Infografis" },
    { href: "/peta", label: "Peta" },
    { href: "/berita", label: "Berita" },
    { href: "/belanja", label: "Belanja" },
  ];

  return (
    <header
      className={`bg-[#129990] text-white transition-transform duration-300 fixed w-full top-0 z-50 ${isHidden ? "-translate-y-full" : ""
        }`}
    >
      {/* Overlay */}
      {menuOpen && (
        <div
          id="overlay"
          className="fixed inset-0 backdrop-blur-sm bg-white/5 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`fixed top-0 right-0 h-full w-3/5 max-w-[320px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#129990]">NAVIGASI</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-4 text-base font-medium text-gray-700">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} onClick={closeMenu}>
              <div
                className={`block transition hover:text-[#129990] ${pathname === link.href ? "underline text-[#129990]" : ""
                  }`}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navbar Content */}
      <div className="w-full flex items-center justify-between px-0 py-4">
        <Link href="/" className="flex items-center space-x-4 pl-4 cursor-pointer">
          <img src={getImageUrl("img/sukabumi.png")} alt="Logo Sukabumi" className="h-16 w-16 object-contain" />
          <div className="-ml-2">
            <div className="text-xl font-bold leading-tight">Desa Cikelat</div>
            <div className="text-sm text-white/80">Kabupaten Sukabumi</div>
          </div>
        </Link>

        {/* Mobile Button */}
        <div className="lg:hidden px-4 py-2 flex justify-end">
          <button onClick={openMenu}>
            <img src={getImageUrl("img/ham.png")} alt="Menu" className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex pr-4 max-[899px]:hidden">
          <nav className="flex-nowrap flex space-x-10 text-lg font-semibold pr-6">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <div className={`whitespace-nowrap hover:underline transition ${pathname === link.href ? "underline" : ""}`}>
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
}
