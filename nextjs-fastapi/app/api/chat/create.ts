import { connectToMongo } from "../lib/mongo";
import ChatSummary from "../model/mongo_model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToMongo();
    const body = await req.json();
    const chat = await ChatSummary.create(body);
    return NextResponse.json(chat);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
