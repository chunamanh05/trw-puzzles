import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { link } = await req.json();
    
    if (!link) {
      return NextResponse.json({ error: 'Link is required' }, { status: 400 });
    }

    // Call the python script as a microservice child process
    // The script prints the base64 encoded PNG to stdout
    const { stdout } = await execAsync(`python src/app/puzzle-31/generate_qr.py "${link}"`);
    const base64Image = stdout.trim();

    return NextResponse.json({ 
      success: true, 
      image: `data:image/png;base64,${base64Image}`
    });
    
  } catch (error) {
    console.error('QR Microservice Error:', error);
    return NextResponse.json({ error: 'Failed to generate QR code from Python microservice' }, { status: 500 });
  }
}
