import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Report from "../model/mongo_model"; // Adjust the import path as necessary

// Connect to MongoDB only once
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "Patients",
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, conversation } = body;

    console.log("📨 Received from client:", JSON.stringify(body, null, 2));

    const fullText = conversation.map((m: any) => m.text).join(" ");
    console.log("🧠 Full text for extraction:", fullText);

    // Improved regex
    const ageMatch = fullText.match(/(?:\b(?:i am|i'm|age is|age)?\s*)(\d{1,3})(?=\s*(years? old)?\b)/i);
    const genderMatch = fullText.match(/\b(male|female|non-binary|other)\b/i);
    const severityMatch = fullText.match(/(?:severity[^\d]*|\b(?:pain|score)\D*)(\d{1,2})/i);
    const symptomMatch = fullText.match(/symptoms?[:\-\s]*([^\.\n]+)/i);
    const diagnosisMatch = fullText.match(/diagnosis(?:es)?[:\-\s]*([^\.\n]+)?/i);
    const remedyMatch = fullText.match(/recommendation[:\-\s]*([^\.\n]+)?/i);

    const pre_diagnosis = diagnosisMatch?.[1]
      ?.split(/,|and/)
      ?.map((s: string) => s.trim()) || [];

    const possible_remedy = remedyMatch?.[1]
      ?.split(/,|and/)
      ?.map((r: string) => r.trim()) || [];

    const result = {
      userId,
      age: ageMatch?.[1] || null,
      gender: genderMatch?.[1] || null,
      symptoms: symptomMatch?.[1]?.trim() || null,
      pre_diagnosis,
      severityScore: severityMatch?.[1] ? parseInt(severityMatch[1]) : null,
      possible_remedy,
    };

    console.log("🧪 Extraction results:", result);

    // Loosened condition to allow more partial saves
    if (!result.symptoms && !result.severityScore && !result.pre_diagnosis.length) {
      return NextResponse.json({ error: "Insufficient data to save report." }, { status: 400 });
    }

    const summary = await Report.create(result);
    return NextResponse.json(summary);
  } catch (err) {
    console.error("❌ Failed to parse or save:", err);
    return NextResponse.json({ error: "Failed to extract or save summary." }, { status: 500 });
  }
}