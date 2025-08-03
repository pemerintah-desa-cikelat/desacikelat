import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM footer LIMIT 1');
    client.release();

    return NextResponse.json(result.rows[0] || {});
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
