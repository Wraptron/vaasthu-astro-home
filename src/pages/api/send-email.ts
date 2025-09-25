// import nodemailer from "nodemailer";

// export const prerender = false;

// export async function POST({ request }: { request: Request }) {
//   try {
//     const data = await request.json();
//     const clientEmail = data.email;

//     if (!clientEmail) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Client email missing" }),
//         { status: 400 }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: import.meta.env.SMTP_USER, // your Gmail (sender)
//         pass: import.meta.env.SMTP_PASS, // Gmail app password
//       },
//     });

//     // 1️⃣ Email to YOU (site owner) with client’s form details
//     await transporter.sendMail({
//       from: import.meta.env.SMTP_USER,
//       to: import.meta.env.SMTP_USER, // your Gmail
//       subject: "📩 New Consultation Request",
//       html: `
//         <h2>New Consultation Request</h2>
//         <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
//         <p><strong>Phone:</strong> ${data.phone}</p>
//         <p><strong>Email:</strong> ${data.email}</p>
//         <p><strong>Consultation:</strong> ${data.consultation}</p>
//         <p><strong>Project Info:</strong> ${data.projectInfo || "N/A"}</p>
//       `,
//     });

//     // 2️⃣ Confirmation email to CLIENT
//     await transporter.sendMail({
//       from: import.meta.env.SMTP_USER,
//       to: clientEmail,
//       subject: "✅ Your Form Submission Was Successful",
//       html: `
//         <h2>Thank You for Contacting Us!</h2>
//         <p>Dear ${data.firstName},</p>
//         <p>Your form has been successfully submitted. We have received your details and will get back to you shortly.</p>
//         <br>
//         <p>Best regards,<br>Your Company Team</p>
//       `,
//     });

//     return new Response(
//       JSON.stringify({ success: true, message: "✅ Emails sent to both client and admin!" }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("❌ Email error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "❌ Email sending failed.", error: error.message }),
//       { status: 500 }
//     );
//   }
// }
import nodemailer from "nodemailer";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    const { firstName, lastName, phone, email, consultation, projectInfo } = data;

    // Basic validation
    if (!firstName || !lastName || !phone || !email || !consultation) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required." }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1️⃣ Email to site owner/admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "📩 New Consultation Request",
      text: `
New Consultation Request
Name: ${firstName} ${lastName}
Phone: ${phone}
Email: ${email}
Consultation: ${consultation}
Project Info: ${projectInfo || "N/A"}
      `,
      html: `
<h2>New Consultation Request</h2>
<p><strong>Name:</strong> ${firstName} ${lastName}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Consultation:</strong> ${consultation}</p>
<p><strong>Project Info:</strong> ${projectInfo || "N/A"}</p>
      `,
    });

    // 2️⃣ Confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "✅ Your Form Submission Was Successful",
      text: `
Hi ${firstName},

Your form has been successfully submitted. We have received your details and will get back to you shortly.

Best regards,
Your Company Team
      `,
      html: `
<h2>Thank You for Contacting Us!</h2>
<p>Dear ${firstName},</p>
<p>Your form has been successfully submitted. We have received your details and will get back to you shortly.</p>
<br>
<p>Best regards,<br>Your Company Team</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "✅ Emails sent to both client and admin!" }),
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
