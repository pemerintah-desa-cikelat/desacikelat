import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const { rows } = await pool.query('SELECT * FROM berita WHERE id = $1', [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Gagal mengambil berita detail:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
