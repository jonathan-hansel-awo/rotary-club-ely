import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAboutPage, getClubMembers } from '@/lib/sanity.fetch'
import { urlForImage } from '@/sanity/lib/image'
import { ClubMember } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Rotary Club of Ely — over 80 years of community service, charitable giving, and bringing people together in East Cambridgeshire.",
  openGraph: {
    title: "About | Rotary Club of Ely",
    description:
      "Over 80 years of community service in Ely. Learn who we are, what we do, and how to get involved.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

export default async function AboutPage() {
  const [page, members] = await Promise.all([
    getAboutPage(),
    getClubMembers(),
  ])

  return (
    <main id="main-content">

      {/* Interior Hero */}
      <section className="bg-rotary-blue-dark py-20 pt-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-rotary-gold mb-3">
            Who We Are
          </p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight">
            About the Rotary Club of Ely
          </h1>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-16 bg-off-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {page?.body ? (
            <div className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-grey-900
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-grey-700 prose-p:leading-relaxed
              prose-a:text-rotary-azure prose-a:no-underline hover:prose-a:underline
              prose-strong:text-grey-900">
              <PortableText value={page.body} />
            </div>
          ) : (
            <p className="text-grey-500">About page content coming soon.</p>
          )}
        </div>
      </section>

      {/* Meeting Details Callout — 4.3 */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-off-white rounded-2xl p-8 sm:p-12 border-t-4 border-rotary-gold shadow-md max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-rotary-gold-dark mb-3">
              Come and See Us
            </p>
            <h2 className="font-heading font-bold text-2xl text-grey-900 mb-6">
              Our Weekly Meetings
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rotary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-grey-900">Every Thursday</p>
                  <p className="text-grey-700">8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rotary-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-grey-900">The City of Ely Bowls Club</p>
                  <p className="text-grey-700">Ely, Cambridgeshire</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-rotary-gold hover:bg-rotary-gold-dark text-grey-900 font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Members — 4.2 */}
      {members && members.length > 0 && (
        <section className="py-16 bg-off-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-rotary-gold-dark mb-3">
              Our People
            </p>
            <h2 className="font-heading font-bold text-3xl text-grey-900 mb-12">
              Club Leadership
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member: ClubMember) => (
                <div key={member._id} className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-grey-200">
                    {member.photo!.asset ? (
                      <Image
                        src={urlForImage(member.photo!).width(96).height(96).url()}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-rotary-blue text-white font-heading font-bold text-2xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-grey-900 text-lg leading-tight">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="text-sm text-rotary-gold-dark font-medium mt-1">
                      {member.role}
                    </p>
                  )}
                  {member.bio && (
                    <p className="text-sm text-grey-700 mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}