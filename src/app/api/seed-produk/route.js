import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Koneksi ke database (ambil dari .env.local)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function POST(req) {
    try {
        const data = await req.json();

        const items = Array.isArray(data) ? data : [data]; // Handle 1 data atau array sekaligus

        const hasil = [];

        for (const item of items) {
            const { nama, harga, gambar, kontak, deskripsi } = item;

            if (!nama || harga === undefined || harga === null) {
                return NextResponse.json({ error: 'Field nama dan harga wajib diisi' }, { status: 400 });
            }

            const query = `
        INSERT INTO produk (nama, harga, gambar, kontak, deskripsi)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
            const values = [nama, harga, gambar || null, kontak || null, deskripsi || null];

            const result = await pool.query(query, values);
            hasil.push(result.rows[0]);
        }

        return NextResponse.json({ message: 'Produk berhasil ditambahkan', data: hasil });
    } catch (err) {
        console.error('Gagal menambahkan produk:', err);
        return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}

