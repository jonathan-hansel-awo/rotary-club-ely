"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot check — bots fill this, humans don't
  const honeypot = formData.get("website") as string;
  if (honeypot) {
    // Return success to fool the bot, but don't send anything
    return {
      status: "success",
      message: "Thank you, we will be in touch soon.",
    };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const interest = (formData.get("interest") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  // Server-side validation
  const errors: FormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the errors below.",
      errors,
    };
  }

  try {
    await resend.emails.send({
      from: "Rotary Club of Ely <onboarding@resend.dev>",
      to: "info@rotaryclubofely.co.uk",
      replyTo: email,
      subject: `New enquiry from ${name} — ${interest || "General Enquiry"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #17458F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Enquiry — Rotary Club of Ely</h1>
          </div>
          <div style="background: #f8f7f4; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e0db; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a4845; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #1a1918;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a4845;">Email</td>
                <td style="padding: 8px 0; color: #1a1918;"><a href="mailto:${email}" style="color: #0067c8;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a4845;">Interest</td>
                <td style="padding: 8px 0; color: #1a1918;">${interest || "General Enquiry"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e0db; margin: 16px 0;">
            <p style="font-weight: 600; color: #4a4845; margin: 0 0 8px;">Message</p>
            <p style="color: #1a1918; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #e2e0db; margin: 16px 0;">
            <p style="font-size: 12px; color: #8a8681; margin: 0;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
    });

    return {
      status: "success",
      message: "Thank you for your message. We will be in touch soon.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      status: "error",
      message:
        "Sorry, something went wrong sending your message. Please try again or email us directly at info@rotaryclubofely.co.uk.",
    };
  }
}
