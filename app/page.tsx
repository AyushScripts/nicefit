"use client";

import { useCallback, useMemo, useState } from "react";
import { getChallenge, type Challenge } from "@/lib/getChallenge";

export default function Home() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);

  const handleGetChallenge = useCallback(() => {
    const next = getChallenge();
    setChallenge(next);
    setAnimKey((k) => k + 1);
  }, []);

  const gradientButton = useMemo(
    () =>
      "mt-6 inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 active:scale-[0.99] transition-transform",
    []
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-2xl text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl sm:text-7xl mb-4">💪</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">NiceFit</h1>
          <p className="mt-3 text-base sm:text-xl text-gray-600 max-w-[42ch]">
            Fun daily fitness & health challenges to make you stronger, one day at a time.
          </p>
          <button className={gradientButton} onClick={handleGetChallenge}>
            Get Today’s Challenge
          </button>
        </div>

        {challenge && (
          <div
            key={animKey}
            className="mt-10 sm:mt-12 mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl shadow-gray-200/50 animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl sm:text-4xl" aria-hidden>
                {challenge.emoji}
              </div>
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-semibold">Your Challenge</h2>
                <p className="mt-1 text-gray-700 text-base sm:text-lg leading-relaxed">
                  {challenge.text}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button className={gradientButton} onClick={handleGetChallenge}>
                Try Another Challenge
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
