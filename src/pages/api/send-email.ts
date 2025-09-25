import nodemailer from "nodemailer";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    const clientEmail = data.email;

    if (!clientEmail) {
      return new Response(
        JSON.stringify({ success: false, message: "Client email missing" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.SMTP_USER, // your Gmail (sender)
        pass: import.meta.env.SMTP_PASS, // Gmail app password
      },
    });

    // 1️⃣ Email to YOU (site owner) with client’s form details
    await transporter.sendMail({
      from: import.meta.env.SMTP_USER,
      to: import.meta.env.SMTP_USER, // your Gmail
      subject: "📩 New Consultation Request",
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Consultation:</strong> ${data.consultation}</p>
        <p><strong>Project Info:</strong> ${data.projectInfo || "N/A"}</p>
      `,
    });

    // 2️⃣ Confirmation email to CLIENT
    await transporter.sendMail({
      from: import.meta.env.SMTP_USER,
      to: clientEmail,
      subject: "✅ Your Form Submission Was Successful",
      html: `
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear ${data.firstName},</p>
        <p>Your form has been successfully submitted. We have received your details and will get back to you shortly.</p>
        <br>
        <p>Best regards,<br>Your Company Team</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "✅ Emails sent successfully we will contact you" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "❌ Email sending failed.", error: error.message }),
      { status: 500 }
    );
  }
}
