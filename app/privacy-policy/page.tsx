import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Rotary Club of Ely",
  description:
    "Privacy policy for the Rotary Club of Ely website, explaining how we handle personal information submitted through the site.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-rotary-gold">
        Website information
      </p>

      <h1 className="font-heading text-4xl font-black text-rotary-blue md:text-5xl">
        Privacy Policy
      </h1>

      <p className="mt-6 text-lg leading-8 text-slate-700">
        This Privacy Policy explains how the Rotary Club of Ely handles personal
        information submitted through this website.
      </p>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Who we are
        </h2>

        <p>
          This website is operated by the Rotary Club of Ely, a local Rotary
          club serving Ely and the surrounding community.
        </p>

        <p>
          You can contact us using the contact details provided on this website.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Information we may collect
        </h2>

        <p>
          We may collect personal information when you choose to contact us,
          enquire about membership, ask about events, request information, or
          otherwise communicate with us through the website.
        </p>

        <p>This may include:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number, if provided</li>
          <li>The content of your message or enquiry</li>
          <li>Any other information you choose to send to us</li>
        </ul>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          How we use your information
        </h2>

        <p>
          We use personal information only for appropriate club purposes, such
          as:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Responding to your enquiry</li>
          <li>Providing information about Rotary Club of Ely activities</li>
          <li>
            Handling membership, volunteering, event, or donation enquiries
          </li>
          <li>Maintaining appropriate records of club communications</li>
          <li>Improving the content and usefulness of this website</li>
        </ul>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Legal basis for using your information
        </h2>

        <p>
          We only use personal information where we have a lawful reason to do
          so. This may include responding to your request, fulfilling a
          legitimate club interest, complying with legal obligations, or using
          your consent where required.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Sharing your information
        </h2>

        <p>
          We do not sell your personal information. We may share information
          with appropriate Rotary Club of Ely officers or members where needed
          to respond to your enquiry or carry out club activities.
        </p>

        <p>
          We may also share information where required by law, regulation, or a
          legitimate safeguarding, legal, or administrative need.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Website hosting and service providers
        </h2>

        <p>
          This website may use third-party service providers for hosting,
          content management, form handling, email delivery, security, and
          website maintenance. These providers may process limited technical or
          contact information only where necessary to provide their services.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          How long we keep information
        </h2>

        <p>
          We keep personal information only for as long as reasonably necessary
          for the purpose for which it was provided, including responding to
          enquiries, managing club activities, meeting administrative needs, or
          complying with legal requirements.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Your rights
        </h2>

        <p>
          Depending on the circumstances, you may have rights over your personal
          information, including the right to request access, correction,
          deletion, restriction, objection, or withdrawal of consent.
        </p>

        <p>
          To exercise these rights, please contact us using the contact details
          provided on this website.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Cookies
        </h2>

        <p>
          Our use of cookies and similar technologies is explained in our{" "}
          <Link
            href="/cookie-policy"
            className="font-semibold text-rotary-blue underline decoration-rotary-gold underline-offset-4"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Updates to this policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time to reflect changes
          to the website, our activities, or legal requirements.
        </p>
      </section>

      <div className="mt-12 rounded-3xl bg-rotary-blue/5 p-6">
        <p className="text-sm text-slate-600">Last updated: June 2026</p>

        <Link
          href="/"
          className="mt-4 inline-flex font-semibold text-rotary-blue hover:text-rotary-gold"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
