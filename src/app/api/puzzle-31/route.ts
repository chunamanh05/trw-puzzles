import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { link, logo } = data;
    
    if (!link) {
      return NextResponse.json({ error: 'Link is required' }, { status: 400 });
    }

    // Wrap the spawn process in a Promise to await its completion
    return new Promise((resolve) => {
      const pythonProcess = spawn('python', ['src/app/puzzle-31/generate_qr.py']);
      
      let stdoutData = '';
      let stderrData = '';

      // Collect data from standard output
      pythonProcess.stdout.on('data', (chunk) => {
        stdoutData += chunk.toString();
      });

      // Collect errors
      pythonProcess.stderr.on('data', (chunk) => {
        stderrData += chunk.toString();
      });

      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('Python Error:', stderrData);
          resolve(NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ 
            success: true, 
            image: `data:image/png;base64,${stdoutData.trim()}`
          }));
        }
      });

      // Send the heavy JSON payload (link + big base64 logo) via STDIN
      pythonProcess.stdin.write(JSON.stringify({ link, logo: logo || null }));
      pythonProcess.stdin.end(); // Important: close the stream so python knows we are done
    });
    
  } catch (error) {
    console.error('QR Microservice Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
