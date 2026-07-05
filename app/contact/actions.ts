"use server";

import { Resend } from "resend";

const CLUB_EMAIL = "info@rotaryclubofely.co.uk";
const FROM_EMAIL = "Rotary Club of Ely <website@rotaryclubofely.co.uk>";

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

function getFormString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return replacements[char] ?? char;
  });
}

function getResendErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  return JSON.stringify(error);
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const honeypot = getFormString(formData, "website");

  if (honeypot) {
    return {
      status: "success",
      message: "Thank you, we will be in touch soon.",
    };
  }

  const name = getFormString(formData, "name");
  const email = getFormString(formData, "email");
  const interest = getFormString(formData, "interest") || "General Enquiry";
  const message = getFormString(formData, "message");

  const errors: FormState["errors"] = {};

  if (!name || name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the errors below.",
      errors,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable.");

    return {
      status: "error",
      message:
        "Sorry, the contact form is not fully configured yet. Please email us directly at info@rotaryclubofely.co.uk.",
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeInterest = escapeHtml(interest);
  const safeMessage = escapeHtml(message);

  const cleanInterestForSubject = interest
    .replace(/[\r\n]+/g, " ")
    .slice(0, 80);

  try {
    const internalEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CLUB_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name} — ${cleanInterestForSubject}`,
      text: `
New enquiry — Rotary Club of Ely

Name: ${name}
Email: ${email}
Interest: ${interest}

Message:
${message}

Reply directly to this email to respond to ${name}.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="background: #17458F; padding: 24px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 21px;">
              New Enquiry — Rotary Club of Ely
            </h1>
          </div>

          <div style="background: #f8f7f4; padding: 24px; border-radius: 0 0 10px 10px; border: 1px solid #e2e0db; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #4a4845; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #1a1918;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #4a4845;">Email</td>
                <td style="padding: 8px 0; color: #1a1918;">
                  <a href="mailto:${safeEmail}" style="color: #0067c8;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #4a4845;">Interest</td>
                <td style="padding: 8px 0; color: #1a1918;">${safeInterest}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e2e0db; margin: 18px 0;" />

            <p style="font-weight: 700; color: #4a4845; margin: 0 0 8px;">Message</p>
            <p style="color: #1a1918; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>

            <hr style="border: none; border-top: 1px solid #e2e0db; margin: 18px 0;" />

            <p style="font-size: 13px; color: #4A4845; margin: 0;">
              Reply directly to this email to respond to ${safeName}.
            </p>
          </div>
        </div>
      `,
    });

    if (internalEmail.error) {
      console.error(
        "Contact form internal email error:",
        getResendErrorMessage(internalEmail.error),
      );

      return {
        status: "error",
        message:
          "Sorry, something went wrong sending your message. Please try again or email us directly at info@rotaryclubofely.co.uk.",
      };
    }

    const autoReply = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: CLUB_EMAIL,
      subject: "Thank you for contacting the Rotary Club of Ely",
      text: `
Hello ${name},

Thank you for getting in touch with the Rotary Club of Ely.

We have received your enquiry and a member of the club will review it and respond as soon as possible. If your message relates to attending a meeting, partnership, charitable support, or one of our events, we will make sure it reaches the right person.

For reference, we usually meet most Thursdays at 8:00pm at The City of Ely Bowls Club, Ely, Cambridgeshire.

Warm regards,

Rotary Club of Ely
${CLUB_EMAIL}

This is an automated acknowledgement of your message.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px;">
          <div style="background: #17458F; padding: 24px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 21px;">
              Thank you for contacting us
            </h1>
          </div>

          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e0db; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #1a1918; line-height: 1.6; margin-top: 0;">Hello ${safeName},</p>

            <p style="color: #1a1918; line-height: 1.6;">
              Thank you for getting in touch with the Rotary Club of Ely.
            </p>

            <p style="color: #1a1918; line-height: 1.6;">
              We have received your enquiry and a member of the club will review it and respond as soon as possible.
              If your message relates to attending a meeting, partnership, charitable support, or one of our events,
              we will make sure it reaches the right person.
            </p>

            <p style="color: #1a1918; line-height: 1.6;">
              For reference, we usually meet most Thursdays at 8:00pm at The City of Ely Bowls Club, Ely, Cambridgeshire.
            </p>

            <p style="color: #1a1918; line-height: 1.6; margin-bottom: 0;">
              Warm regards,<br />
              <strong>Rotary Club of Ely</strong><br />
              <a href="mailto:${CLUB_EMAIL}" style="color: #0067c8;">${CLUB_EMAIL}</a>
            </p>

            <hr style="border: none; border-top: 1px solid #e2e0db; margin: 20px 0;" />

            <p style="font-size: 12px; color: #6b6761; margin: 0;">
              This is an automated acknowledgement of your message.
            </p>
          </div>
        </div>
      `,
    });

    if (autoReply.error) {
      console.error(
        "Contact form auto-reply error:",
        getResendErrorMessage(autoReply.error),
      );
    }

    return {
      status: "success",
      message:
        "Thank you for your message. We have received your enquiry and will be in touch soon.",
    };
  } catch (error) {
    console.error("Contact form email send error:", error);

    return {
      status: "error",
      message:
        "Sorry, something went wrong sending your message. Please try again or email us directly at info@rotaryclubofely.co.uk.",
    };
  }
}
