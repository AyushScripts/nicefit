"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  getRandomChallenge,
  type Challenge,
  CHALLENGE_COUNT,
} from "@/lib/getChallenge";

export default function Home() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const showHero = challenge === null;

  const handleGetChallenge = useCallback(() => {
    const exclude = new Set(seenIdsRef.current);
    if (challenge) exclude.add(challenge.id);
    const next = getRandomChallenge(exclude);
    setChallenge(next);
    setAnimKey((k) => k + 1);
    // If we have cycled through all, reset seen to only include current
    if (exclude.size + 1 >= CHALLENGE_COUNT) {
      seenIdsRef.current = new Set([next.id]);
    } else {
      exclude.add(next.id);
      seenIdsRef.current = exclude;
    }
  }, [challenge]);

  const gradientButton = useMemo(
    () =>
      "mt-6 inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 active:scale-[0.99] transition-transform",
    []
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-[5%] py-12 md:py-16 lg:py-20">
      <section className="w-full max-w-5xl">
        {showHero && (
          <div className="relative flex min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem] flex-col items-center justify-center rounded-3xl border border-gray-200 p-8 text-center md:p-16 shadow-sm">
            <div className="w-full max-w-2xl">
              <div className="text-6xl md:text-7xl lg:text-8xl mb-4">💪</div>
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:mb-6 md:text-7xl lg:text-8xl">NiceFit</h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600">
                Fun daily fitness & health challenges to make you stronger, one day at a time.
              </p>
            </div>
            <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className={gradientButton} onClick={handleGetChallenge}>
                Get Today’s Challenge
              </button>
            </div>
          </div>
        )}

        {challenge && (
          <div
            key={animKey}
            className={`mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-xl shadow-gray-200/50 animate-in ${showHero ? "mt-10 md:mt-12" : ""}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl md:text-4xl" aria-hidden>
                {challenge.emoji}
              </div>
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-semibold">Your Challenge</h2>
                <p className="mt-1 text-gray-700 text-base md:text-lg leading-relaxed">
                  {challenge.text}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button className={gradientButton} onClick={handleGetChallenge}>
                New Challenge
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
