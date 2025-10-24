"use client";

import { Button } from "@/app/ui/button";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function CustomJewelryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [width, height] = useWindowSize();

  return (
    <>
      {isSubmitted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
        />
      )}
      <section className="flex min-h-screen">
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
              <p className="mb-1 text-sm text-gray-200 uppercase">Contact</p>
              <a
                href="mailto:marketing@example.com"
                className="text-lg font-medium underline"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        <div className="flex w-2/3 items-center justify-center bg-white p-10">
          <form
            className="w-full max-w-xl space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitted(true);
            }}
          >
            <h3 className="text-2xl font-semibold">
              Whether it’s one piece or a full set, we’re here to help you
              design custom jewelry that makes an impact
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
              <input
                type="tel"
                placeholder="Whats app number*"
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
                  placeholder="Choose files for customization"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                  multiple
                />
              </label>
            </div>
            <Button size={"lg"} type="submit">
              {isSubmitted ? "Request submitted!!" : "Submit request"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
