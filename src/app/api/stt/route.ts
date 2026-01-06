import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audio = formData.get("audio") as Blob;

  if (!audio) {
    return NextResponse.json({ error: "No audio" }, { status: 400 });
  }

  const buffer = Buffer.from(await audio.arrayBuffer());

  // 🔹 Send buffer to STT engine (Whisper / Azure / etc)
  const text = "Transcribed text here";

  return NextResponse.json({ text });
}
