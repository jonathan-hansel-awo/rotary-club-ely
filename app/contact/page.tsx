/* eslint-disable react/no-unescaped-entities */
import ContactForm from '@/components/contact/ContactForm'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact & Join Us | Rotary Club of Ely',
  description: 'Get in touch with the Rotary Club of Ely. We meet every Thursday at 8pm at The City of Ely Bowls Club. New visitors always welcome.',
}

export default function ContactPage() {
  return (
    <main id="main-content">

      {/* Interior Hero */}
      <section className="bg-rotary-blue-dark py-20 pt-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-rotary-gold mb-3">
            Get In Touch
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight">
            Contact & Join Us
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl">
            Whether you're curious about joining, have a question about our events, or want to explore a partnership — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-off-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Form — takes up more space */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Contact Details Sidebar */}
            <div className="lg:col-span-2 space-y-6">

              {/* Meeting Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-rotary-gold">
                <h2 className="font-heading font-bold text-lg text-grey-900 mb-4">
                  Visit Us in Person
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rotary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-grey-900 text-sm">When</p>
                      <p className="text-grey-700 text-sm">Every Thursday at 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rotary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-grey-900 text-sm">Where</p>
                      <p className="text-grey-700 text-sm">The City of Ely Bowls Club</p>
                      <p className="text-grey-700 text-sm">Ely, Cambridgeshire</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rotary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-grey-900 text-sm">Email</p>
                      <a
                        href="mailto:info@rotaryclubofely.co.uk"
                        className="text-rotary-azure hover:text-rotary-blue text-sm transition-colors duration-150"
                      >
                        info@rotaryclubofely.co.uk
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Members Welcome */}
              <div className="bg-rotary-blue rounded-2xl p-6 shadow-sm">
                <h2 className="font-heading font-bold text-lg text-white mb-2">
                  Thinking About Joining?
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  You're welcome to come along to a Thursday meeting as a guest before making any commitment. Just drop us a message and we'll make sure you're expected.
                </p>
                <p className="text-rotary-gold text-sm font-medium">
                  No obligation. Just come and see. 
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  )
}