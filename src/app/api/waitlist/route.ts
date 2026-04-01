import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, track } = await request.json();
    if (!email || !track) {
      return NextResponse.json({ error: "email and track required" }, { status: 400 });
    }

    // Insert into Supabase
    const supabase = await createClient();
    const { error } = await supabase.from("waitlist").insert([{ email, track }]);
    if (error && error.code !== "23505") {
      throw error;
    }

    // Send email notification to Tagylym
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"Tagylym Waitlist" <${gmailUser}>`,
        to: "tagylym11@gmail.com",
        subject: `Новая запись в вейтлист: ${track.toUpperCase()}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 480px;">
            <h2 style="color: #4F46E5;">Новый участник в вейтлисте</h2>
            <p><strong>Трек:</strong> ${track.toUpperCase()}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6B7280; font-size: 12px;">Tagylym — Robotics Education Platform</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
