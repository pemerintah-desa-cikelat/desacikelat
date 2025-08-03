import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    const profil = await client.query('SELECT * FROM profil_desa LIMIT 1');
    const statistik = await client.query('SELECT * FROM statistik_penduduk LIMIT 1');

    client.release();

    const row = profil.rows[0] ?? {};
    const stat = statistik.rows[0] ?? {};

    return NextResponse.json({
      sejarah: row.sejarah ?? '',
      visi: row.visi ?? '',
      misi: row.misi?.split('\n') ?? [], // pisah jadi array berdasarkan newline
      struktur_organisasi: row.struktur_organisasi ?? '',
      luas_wilayah: row.luas_wilayah ?? '',
      jumlah_penduduk: stat.jumlah_penduduk ?? 0,
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
