// app/api/chat/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth(); // 🔐 Check if user is signed in

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await req.json();

  // Your chat logic here (for now, just return dummy data)
  const reply = `This is a simulated reply to: "${message}"`;

  return NextResponse.json({ reply });
}
