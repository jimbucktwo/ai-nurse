import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ChatSummary from "../model/mongo_model";

// Connect to MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "nursai",
  });
}

export async function POST(req: Request) {
  try {
    const { userId, conversation } = await req.json();

    // Join all text into one for extraction (simple version)
    const fullText = conversation.map((msg: any) => msg.text).join(" ");

    // Rough parsing logic – adjust as needed
    const ageMatch = fullText.match(/(?:age|Age)[^\d]*(\d{1,3})/);
    const genderMatch = fullText.match(/(?:gender|Gender)[^\w]*(male|female|other)/i);
    const severityMatch = fullText.match(/(?:severity.*?score)[^\d]*(\d{1,2})/i);
    const symptomMatch = fullText.match(/symptom[s]?[^\w]*(.*?)(?:diagnosis|$)/i);
    const diagnosisMatch = fullText.match(/diagnosis(?:es)?[^\w]*(.*?)(?:remedy|$)/i);
    const remedyMatch = fullText.match(/remedy[^\w]*(.*)/i);

    const summary = await ChatSummary.create({
        userId,
        age: ageMatch?.[1] ? parseInt(ageMatch[1]) : null,
        gender: genderMatch?.[1]?.toLowerCase() || null,
        symptoms: symptomMatch?.[1]?.trim() || null,
        pre_diagnosis: diagnosisMatch?.[1]
          ? diagnosisMatch[1]
              .split(/,|and/)
              .map((s: string) => s.trim())
          : [],
        severityScore: severityMatch?.[1] ? parseInt(severityMatch[1]) : null,
        possible_remedy: remedyMatch?.[1]
          ? remedyMatch[1]
              .split(/,|and/)
              .map((r: string) => r.trim())
          : [],
      });
      

    return NextResponse.json(summary);
  } catch (err) {
    console.error("Summary extraction error:", err);
    return NextResponse.json({ error: "Failed to extract or save summary." }, { status: 500 });
  }
}
