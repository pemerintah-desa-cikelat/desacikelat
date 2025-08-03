'use client';

import { useState, useRef, useEffect } from 'react';

export default function AnnouncementItem({ judul, tanggal, isi }) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Jika scrollHeight > clientHeight berarti teks overflow dan terpotong
      setShowButton(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [isi]);

  return (
    <div className="bg-[#FFFBDE] p-8 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-semibold text-[#129990] mb-2">{judul}</h3>
      <p className="text-gray-700 text-base mb-2">
        {new Date(tanggal).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p
        ref={textRef}
        className={`text-gray-800 text-lg leading-relaxed ${
          expanded ? '' : 'line-clamp-3'
        }`}
        style={{ WebkitLineClamp: expanded ? 'none' : 3 }}
      >
        {isi}
      </p>
      {showButton && (
        <button
          className="mt-2 text-[#129990] font-semibold hover:underline"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Baca lebih sedikit' : 'Baca selengkapnya'}
        >
          {expanded ? 'Baca lebih sedikit' : 'Baca selengkapnya'}
        </button>
      )}
    </div>
  );
}
