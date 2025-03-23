import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Report from "../model/mongo_model"; // alias for your Report collection

let isConnected = false;

export async function POST(req: Request) {
  try {
    // ⛓ Ensure DB is connected (only once)
    if (!isConnected) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        dbName: "Patients",
      });
      isConnected = true;
    }

    const { userId, conversation } = await req.json();

    console.log("📨 Received from client:", { userId, conversation });

    const fullText = conversation.map((m: any) => m.text).join(" ");
    console.log("🧠 Full text for extraction:", fullText);

    // 🧪 Improved Regex Extraction
    const ageMatch = fullText.match(/\b(\d{1,3})[-\s]*year[-\s]*old\b|\b(?:age|Age)[^\d]*(\d{1,3})\b/);
    const genderMatch = fullText.match(/\b(male|female|other)\b/i);
    const severityMatch = fullText.match(/(?:severity.*?score|score:)\s*(\d+)/i);
    const symptomMatch = fullText.match(/(?:symptom[s]?[:\-]?\s*)([^.\n]+)/i);
    const diagnosisMatch = fullText.match(/possible considerations:([\s\S]*?)Total Score/i);
    const remedyMatch = fullText.match(/recommendation:\s*- .*?: (.*?)[\n.]/i);

    console.log("🧪 Extraction results:", {
      age: ageMatch?.[1] || ageMatch?.[2],
      gender: genderMatch?.[1],
      severity: severityMatch?.[1],
      symptoms: symptomMatch?.[1],
      diagnosis: diagnosisMatch?.[1],
      remedy: remedyMatch?.[1],
    });

    // ⏳ Only save if we have at least some info
    if (
      ageMatch || genderMatch || severityMatch ||
      symptomMatch || diagnosisMatch || remedyMatch
    ) {
      const saved = await Report.create({
        userId,
        age: ageMatch?.[1] ? parseInt(ageMatch[1]) :
             ageMatch?.[2] ? parseInt(ageMatch[2]) : undefined,
        gender: genderMatch?.[1]?.toLowerCase() || undefined,
        symptoms: symptomMatch?.[1]?.trim() || undefined,
        pre_diagnosis: diagnosisMatch?.[1]
          ? diagnosisMatch[1]
              .split(/[\n•\d-]+/)
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],
        severityScore: severityMatch?.[1]
          ? parseInt(severityMatch[1])
          : undefined,
        possible_remedy: remedyMatch?.[1]
          ? remedyMatch[1]
              .split(/,|and/)
              .map((r: string) => r.trim())
          : [],
      });

      console.log("✅ Saved summary:", saved);
      return NextResponse.json(saved);
    } else {
      console.log("🟡 Not enough info to save summary yet.");
      return NextResponse.json({ message: "Not enough info to save summary yet." });
    }
  } catch (error) {
    console.error("❌ Failed to parse or save:", error);
    return NextResponse.json({ error: "Failed to extract or save summary." }, { status: 500 });
  }
}
