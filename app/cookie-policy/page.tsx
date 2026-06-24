import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Rotary Club of Ely",
  description:
    "Cookie policy for the Rotary Club of Ely website, explaining how cookies and similar technologies are used.",
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-rotary-gold">
        Website information
      </p>

      <h1 className="font-heading text-4xl font-black text-rotary-blue md:text-5xl">
        Cookie Policy
      </h1>

      <p className="mt-6 text-lg leading-8 text-slate-700">
        This website is operated by the Rotary Club of Ely. This page explains
        how we use cookies and similar technologies on our website.
      </p>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          What are cookies?
        </h2>

        <p>
          Cookies are small text files that may be stored on your device when
          you visit a website. They can help websites work properly, remember
          preferences, improve performance, or understand how visitors use the
          site.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          How we use cookies
        </h2>

        <p>
          At present, our public website is intended to use only essential
          cookies or similar technologies where necessary for basic website
          functionality, security, or administration.
        </p>

        <p>
          We do not intentionally use advertising cookies, tracking pixels, or
          marketing cookies on the public website.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Analytics and third-party content
        </h2>

        <p>
          If we introduce analytics tools, embedded third-party content, maps,
          videos, or social media widgets in future, this policy will be updated
          to explain what is used and, where required, visitors will be asked
          for consent before non-essential cookies are set.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Managing cookies
        </h2>

        <p>
          You can manage or delete cookies through your browser settings. Most
          browsers allow you to block cookies, delete existing cookies, or
          receive a warning before cookies are stored.
        </p>
      </section>

      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Updates to this policy
        </h2>

        <p>
          We may update this Cookie Policy from time to time, especially if the
          website starts using additional services such as analytics, maps,
          embedded media, or other third-party tools.
        </p>
      </section>
      <section className="mt-10 space-y-5 text-slate-700">
        <h2 className="font-heading text-2xl font-bold text-rotary-blue">
          Privacy
        </h2>

        <p>
          For information about how we handle personal information submitted
          through this website, please read our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-rotary-blue underline decoration-rotary-gold underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
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
