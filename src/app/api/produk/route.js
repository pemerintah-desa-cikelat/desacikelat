import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM produk ORDER BY id DESC');
    return NextResponse.json(res.rows);
  } catch (err) {
    console.error('Gagal mengambil data produk:', err);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
