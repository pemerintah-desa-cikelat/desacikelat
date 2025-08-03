import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // untuk Neon
  },
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, judul, TO_CHAR(tanggal, 'DD FMMonth YYYY') AS tanggal, gambar, sumber, isi
       FROM berita
       ORDER BY tanggal DESC`
    );
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching berita:', error);
    return NextResponse.json({ error: 'Gagal mengambil data berita' }, { status: 500 });
  }
}
