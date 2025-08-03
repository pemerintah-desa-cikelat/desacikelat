import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Tambahkan jika menggunakan Neon/Supabase
})

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM pengumuman ORDER BY tanggal DESC')
    return NextResponse.json(rows)
  } catch (err) {
    console.error('Error fetching pengumuman:', err)
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
