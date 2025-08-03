// app/api/home-data/route.js

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    const profilRes = await client.query('SELECT * FROM profil_desa LIMIT 1');
    const statistikRes = await client.query('SELECT * FROM statistik_penduduk LIMIT 1');
    const pengumumanRes = await client.query('SELECT * FROM pengumuman ORDER BY tanggal DESC LIMIT 3');

    client.release();

    const profil = profilRes.rows[0];
    const statistik = statistikRes.rows[0];
    const pengumuman = pengumumanRes.rows;

    return NextResponse.json({
      sejarah: profil.sejarah,
      nama_kepala_desa: profil.nama_kepala_desa,
      jabatan_kepala_desa: profil.jabatan_kepala_desa,
      sambutan: profil.sambutan,
      jumlah_penduduk: statistik.jumlah_penduduk,
      jumlah_kk: statistik.jumlah_kk,
      laki_laki: statistik.laki_laki,
      perempuan: statistik.perempuan,
      pengumuman: pengumuman,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
