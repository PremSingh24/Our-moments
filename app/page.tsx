"use client";

import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Music2,
  VolumeX,
  Sparkles,
  ChevronDown,
  Stars
} from "lucide-react";

const photos = [
  "/IMG-20261101-WA0010.jpg",
  "/IMG-20261102-WA0029.jpg",
  "/IMG-20261102-WA0034.jpg",
  "/IMG-20261102-WA0038.jpg",
  "https://ourmoments.live/wp-content/uploads/om-photos/om_2697779c5f492932f1880bd8d0d24715_1793873592.webp"
];

const wishes = [
  "You are my today and all my tomorrows. 💗",
  "My favorite place is right beside you. 🫶",
  "You make my ordinary world magical. ✨",
  "In every lifetime, I'd still choose you. 💞",
  "Life with you is the only thing I imagine."
];

const letter = `Har saal sochta tha ki kaise tumhe wish karu,
Kaise kisi bahane se tumse baat ho paaye.
Kuch saal door sahi, par ab hum saath hain,
Kuch adhure din sahi, par ab nayi shuruaat hai. 💗

Tumhari har khushi ki wajah ban jaun,
Tumhare har kal mein tumhara saath nibhaun.
Janamdin mubarak ho, meri jaan! 🥹💖

Pehle tumhe wish karne ka bahana dhoondhta tha,
Aaj tumhe apna kehna hi meri sabse khoobsurat wajah hai.`;

const confetti = Array.from({ length: 34 }, (_, i) => i);

export default function Home() {
  const [started, setStarted] = useState(false);
  const [music, setMusic] = useState(false);
  const [musicMessage, setMusicMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const [wish, setWish] = useState<number | null>(null);
  const [candle, setCandle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const melodyTimerRef = useRef<number | null>(null);
  const melodyIndexRef = useRef(0);

  const stopFallback = () => {
    if (melodyTimerRef.current !== null) {
      window.clearInterval(melodyTimerRef.current);
      melodyTimerRef.current = null;
    }

    const context = audioContextRef.current;
    audioContextRef.current = null;

    if (context && context.state !== "closed") {
      void context.close();
    }
  };

  const startFallback = async () => {
    const context = new window.AudioContext();
    audioContextRef.current = context;

    await context.resume();

    const notes = [
      523.25, 659.25, 783.99, 659.25,
      587.33, 698.46, 783.99, 698.46
    ];

    const playNote = () => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = "sine";
      oscillator.frequency.value =
        notes[melodyIndexRef.current % notes.length];

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.45);

      melodyIndexRef.current++;
    };

    playNote();
    melodyTimerRef.current = window.setInterval(playNote, 520);
  };

  const toggleMusic = async () => {
    if (music) {
      audioRef.current?.pause();
      stopFallback();
      setMusic(false);
      setMusicMessage("");
      return;
    }

    try {
      const audio = audioRef.current;

      if (!audio) {
        throw new Error("Audio element unavailable");
      }

      audio.volume = 0.35;
      await audio.play();

      setMusic(true);
      setMusicMessage("");
    } catch {
      try {
        await startFallback();
        setMusic(true);
        setMusicMessage(
          "The original track couldn't load, so a soft melody is playing instead. ♡"
        );
      } catch {
        setMusic(false);
        setMusicMessage(
          "Music couldn't start. Please try again or check your browser settings."
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      if (melodyTimerRef.current !== null) {
        window.clearInterval(melodyTimerRef.current);
      }

      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <main>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/picshore-timeless-affection.mp3"
      />

      <div className="ambient">
        {confetti.map((i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 9) * -0.8}s`,
              animationDuration: `${8 + (i % 7)}s`
            }}
          >
            ✦
          </i>
        ))}
      </div>

      <nav>
        <div className="brand">
          <Heart size={17} fill="currentColor" /> our little universe
        </div>

        <button className="music" onClick={toggleMusic}>
          {music ? <Music2 size={16} /> : <VolumeX size={16} />}
          {music ? "Music on" : "Music off"}
        </button>
      </nav>

      {musicMessage && (
        <p
          role="status"
          style={{
            textAlign: "center",
            fontSize: "13px",
            padding: "8px 16px",
            opacity: 0.8
          }}
        >
          {musicMessage}
        </p>
      )}

      {!started ? (
        <section className="hero">
          <div className="eyebrow">
            <Sparkles size={14} /> a little surprise, made with love
          </div>

          <div className="orb">♡</div>

          <p className="script">To my favourite person</p>

          <h1>
            Happy Birthday,
            <br />
            <em>Poulami</em>
            <span className="pink"> ♡</span>
          </h1>

          <p className="sub">
            A tiny corner of the internet, made just for you.
            <br />
            Because someone as special as you deserves a little magic.
          </p>

          <button className="primary" onClick={() => setStarted(true)}>
            Open your surprise <Heart size={17} fill="currentColor" />
          </button>

          <span className="from">
            with all my love, <b>Prem</b>
          </span>

          <div className="scrollhint">
            <ChevronDown size={17} /> your surprise awaits
          </div>
        </section>
      ) : (
        <>
          <section className="intro section">
            <div className="eyebrow">
              <Stars size={14} /> today is all about you
            </div>

            <p className="script">The world got a little brighter</p>

            <h2>
              Because <em>you</em> were born.
            </h2>

            <p className="sub">26 looks beautiful on you, Poulami.</p>

            <div
              className="cake"
              onClick={() => setCandle(!candle)}
              role="button"
              tabIndex={0}
              aria-label="Blow the candles"
            >
              🎂<span className={candle ? "flame out" : "flame"}>🕯️</span>
            </div>

            <button className="soft" onClick={() => setCandle(true)}>
              {candle ? "Wish made! ✨" : "Tap the candle to make a wish"}
            </button>
          </section>

          <section className="section memories">
            <div className="eyebrow">♡ little moments, big feelings</div>

            <h2>
              My favourite memories
              <br />
              have <em>you</em> in them.
            </h2>

            <div className="gallery">
              {photos.map((p, i) => (
                <figure key={p} className={`photo p${i}`}>
                  <img
                    src={p}
                    alt={`Our memory ${i + 1}`}
                    loading="lazy"
                  />
                  <figcaption>
                    {[
                      "A moment I keep close",
                      "My favourite kind of day",
                      "Just us, being us",
                      "A memory worth keeping",
                      "More moments to come"
                    ][i]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="section wishes">
            <div className="eyebrow">
              <Sparkles size={14} /> little reminders
            </div>

            <h2>
              Things I hope you <em>never forget.</em>
            </h2>

            <div className="wishgrid">
              {wishes.map((w, i) => (
                <button
                  className={`wish ${wish === i ? "chosen" : ""}`}
                  key={w}
                  onClick={() => setWish(i)}
                >
                  <span>{["♡", "✧", "☼", "∞", "✿"][i]}</span>
                  {wish === i ? w : "Tap to reveal a little thought"}
                </button>
              ))}
            </div>
          </section>

          <section className="section letter">
            <div className="eyebrow">a letter, from my heart</div>

            <h2>
              For you, <em>always.</em>
            </h2>

            <article className="paper">
              <div className="paperheart">♡</div>
              <p className="script">Meri jaan,</p>
              <p>{letter}</p>

              <div className="signature">
                Forever yours,
                <br />
                <b>Prem</b> ♡
              </div>
            </article>
          </section>

          <section className="final section">
            <div
              className="gift"
              onClick={() => setOpened(!opened)}
              role="button"
              tabIndex={0}
              aria-label="Open your final surprise"
            >
              {opened ? "💖" : "🎁"}
            </div>

            <h2>
              {opened
                ? "My favourite gift is you."
                : "One last little surprise…"}
            </h2>

            <p className="sub">
              {opened
                ? "Here's to every birthday, every silly moment, and every tomorrow together."
                : "There's one thing I want you to know. Tap the gift."}
            </p>

            <button
              className="primary"
              onClick={() => setOpened(!opened)}
            >
              {opened ? "Close your surprise" : "Unwrap your surprise"}
              <Heart size={17} fill="currentColor" />
            </button>

            {opened && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "720px",
                  margin: "32px auto 0",
                  padding: "0 12px"
                }}
              >
                <p
                  className="script"
                  style={{ textAlign: "center", marginBottom: "16px" }}
                >
                  A little something to make us smile. 🥹
                </p>

                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    display: "block",
                    width: "100%",
                    borderRadius: "18px",
                    background: "#000",
                    maxHeight: "75vh"
                  }}
                >
                  <source
                    src="/VID_20261105_032342_898.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support video playback.
                </video>
              </div>
            )}

            <p className="closing">
              Happy 26th birthday, Poulami. I love you. ♡
            </p>
          </section>
        </>
      )}

      <footer>made with ♡ by Prem · just for Poulami</footer>
    </main>
  );
}
