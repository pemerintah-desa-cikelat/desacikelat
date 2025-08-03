import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Setup koneksi database Neon dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const data = await req.json(); // Ambil data dari body request (array berita)

    const client = await pool.connect();

    // Kosongkan tabel terlebih dahulu (opsional, tergantung kebutuhan)
    await client.query('DELETE FROM berita');

    // Insert satu per satu
    for (const item of data) {
      const { judul, isi, tanggal, sumber, gambar } = item;
      const tanggalISO = new Date(tanggal).toISOString().split('T')[0];

      await client.query(
        `INSERT INTO berita (judul, isi, tanggal, sumber, gambar)
         VALUES ($1, $2, $3, $4, $5)`,
        [judul, isi, tanggalISO, sumber, gambar]
      );
    }

    client.release();
    return NextResponse.json({ message: 'Data berita berhasil disimpan.' });
  } catch (error) {
    console.error('Gagal menyisipkan berita:', error);
    return NextResponse.json({ error: 'Gagal menyisipkan data' }, { status: 500 });
  }
}
