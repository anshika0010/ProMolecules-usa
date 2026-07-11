import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SupportTicket from "@/models/SupportTicket";

export async function POST(req) {
  try {
    console.log("Connecting DB...");
    await connectDB();
    console.log("DB Connected");

    const body = await req.json();
    console.log("Body:", body);

    const ticket = await SupportTicket.create(body);
    console.log("Ticket Created:", ticket);

    return NextResponse.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}