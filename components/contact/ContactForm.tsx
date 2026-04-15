/* eslint-disable react/no-unescaped-entities */
"use client";

import { useActionState } from "react";
import { submitContactForm, type FormState } from "@/app/contact/actions";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-grey-900">
              Message Sent
            </h3>
            <p className="text-grey-700 mt-1">{state.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md">
      <h2 className="font-heading font-bold text-2xl text-grey-900 mb-2">
        Send Us a Message
      </h2>
      <p className="text-grey-700 mb-8">
        We'd love to hear from you. Fill in the form and we'll get back to you
        as soon as possible.
      </p>

      {/* Error summary */}
      {state.status === "error" && state.message && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} noValidate>
        {/* Honeypot — hidden from humans, bots fill it in */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-grey-900">
              Name{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={`px-4 py-3 rounded-md border-2 bg-white text-grey-900 placeholder:text-grey-300 text-base transition-colors duration-200 outline-none focus:border-rotary-blue focus:shadow-[0_0_0_3px_rgba(247,168,27,0.3)] ${
                state.errors?.name ? "border-red-400" : "border-grey-200"
              }`}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="text-sm text-red-600" role="alert">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-grey-900"
            >
              Email{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              className={`px-4 py-3 rounded-md border-2 bg-white text-grey-900 placeholder:text-grey-300 text-base transition-colors duration-200 outline-none focus:border-rotary-blue focus:shadow-[0_0_0_3px_rgba(247,168,27,0.3)] ${
                state.errors?.email ? "border-red-400" : "border-grey-200"
              }`}
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Interest */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="interest"
              className="text-sm font-medium text-grey-900"
            >
              I'm interested in...
            </label>
            <select
              id="interest"
              name="interest"
              className="px-4 py-3 rounded-md border-2 border-grey-200 bg-white text-grey-900 text-base transition-colors duration-200 outline-none focus:border-rotary-blue focus:shadow-[0_0_0_3px_rgba(247,168,27,0.3)]"
            >
              <option value="General Enquiry">General Enquiry</option>
              <option value="Joining the Club">Joining the Club</option>
              <option value="Event Information">Event Information</option>
              <option value="Partnership or Sponsorship">
                Partnership or Sponsorship
              </option>
              <option value="Charitable Support">Charitable Support</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-grey-900"
            >
              Message{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us how we can help..."
              className={`px-4 py-3 rounded-md border-2 bg-white text-grey-900 placeholder:text-grey-300 text-base transition-colors duration-200 outline-none focus:border-rotary-blue focus:shadow-[0_0_0_3px_rgba(247,168,27,0.3)] resize-y min-h-[120px] ${
                state.errors?.message ? "border-red-400" : "border-grey-200"
              }`}
              aria-describedby={
                state.errors?.message ? "message-error" : undefined
              }
            />
            {state.errors?.message && (
              <p
                id="message-error"
                className="text-sm text-red-600"
                role="alert"
              >
                {state.errors.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-rotary-gold hover:bg-rotary-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-grey-900 font-semibold px-8 py-3 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {isPending ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Enquiry
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
