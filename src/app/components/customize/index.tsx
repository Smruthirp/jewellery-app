"use client";

import { useState } from "react";

export default function CustomJewelryForm() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <section className="flex min-h-screen">
      {/* Left: Info */}
      <div
        className="relative w-1/3 bg-cover bg-center px-10 py-20 text-white"
        style={{ backgroundImage: "url('/images/everyday.avif')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold">Let’s Create Together</h2>
          <div>
            <p className="mb-1 text-sm text-gray-200 uppercase">Email</p>
            <a
              href="mailto:hello@example.com"
              className="text-lg font-medium underline"
            >
              hello@example.com
            </a>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-200 uppercase">
              Press & Media
            </p>
            <a
              href="mailto:marketing@example.com"
              className="text-lg font-medium underline"
            >
              marketing@example.com
            </a>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex w-2/3 items-center justify-center bg-white p-10">
        <form className="w-full max-w-xl space-y-6">
          <h3 className="text-2xl font-semibold">
            Whether it’s one piece or a full set, we’re here to help you design
            custom jewelry that makes an impact
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name*"
              required
              className="w-full rounded-full border border-gray-300 px-6 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email*"
              required
              className="w-full rounded-full border border-gray-300 px-6 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
            <textarea
              placeholder="Message*"
              required
              className="h-32 w-full resize-none rounded-2xl border border-gray-300 px-6 py-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
            <label className="block">
              <span className="mb-1 block font-medium">
                Upload Reference Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-gray-900"
          >
            Send →
          </button>
        </form>
      </div>
    </section>
  );
}
