 "use client";
import { useEffect, useState } from "react";
import { Heart, Music2, VolumeX, Sparkles, Gift, ChevronDown, Stars } from "lucide-react";

const photos = [
 "https://ourmoments.live/wp-content/uploads/om-photos/om_9607222155d2c2d2ff62f8e9b2f7ea21_1793873551.webp",
 "https://ourmoments.live/wp-content/uploads/om-photos/om_1099737fb67fb963d26e44b8090b6f2e_1793873551.webp",
 "https://ourmoments.live/wp-content/uploads/om-photos/om_7efbfb3581e9d3ec394afc4647d12f07_1793873551.webp",
 "https://ourmoments.live/wp-content/uploads/om-photos/om_fc9808b8fabdaffe415aef0888266921_1793873551.webp",
 "https://ourmoments.live/wp-content/uploads/om-photos/om_2697779c5f492932f1880bd8d0d24715_1793873592.webp"
];
const wishes = [
 "You are my today and all my tomorrows. 💗",
 "My favorite place is right beside you. 🫶",
 "You make my ordinary world magical. ✨",
 "In every lifetime, I'd still choose you. 💞",
 "Life with you is the only thing I imagine."
];
const letter = `Har saal sochta tha ki kaise tumhe wish karu,\nKaise kisi bahane se tumse baat ho paaye.\nKuch saal door sahi, par ab hum saath hain,\nKuch adhure din sahi, par ab nayi shuruaat hai. 💗\n\nTumhari har khushi ki wajah ban jaun,\nTumhare har kal mein tumhara saath nibhaun.\nJanamdin mubarak ho, meri jaan! 🥹💖\n\nPehle tumhe wish karne ka bahana dhoondhta tha,\nAaj tumhe apna kehna hi meri sabse khoobsurat wajah hai.`;
const confetti = Array.from({length: 34}, (_,i)=>i);

export default function Home() {
 const [started,setStarted]=useState(false);
 const [music,setMusic]=useState(false);
 const [opened,setOpened]=useState(false);
 const [wish,setWish]=useState<number|null>(null);
 const [candle,setCandle]=useState(false);
 useEffect(()=>{ if(!started) return; const el=document.getElementById("birthday-audio") as HTMLAudioElement|null; if(music) el?.play().catch(()=>{}); else el?.pause(); },[music,started]);
 return <main>
  <audio id="birthday-audio" loop src="https://cdn.pixabay.com/audio/2022/10/25/audio_946b6c6c6b.mp3"/>
  <div className="ambient">{confetti.map(i=><i key={i} style={{left:`${(i*37)%100}%`,animationDelay:`${(i%9)*-.8}s`,animationDuration:`${8+(i%7)}s`}}>✦</i>)}</div>
  <nav><div className="brand"><Heart size={17} fill="currentColor"/> our little universe</div><button className="music" onClick={()=>setMusic(!music)}>{music?<Music2 size={16}/>:<VolumeX size={16}/>} {music?"Music on":"Music off"}</button></nav>
  {!started ? <section className="hero">
    <div className="eyebrow"><Sparkles size={14}/> a little surprise, made with love</div>
    <div className="orb">♡</div>
    <p className="script">To my favourite person</p>
    <h1>Happy Birthday,<br/><em>Poulami</em><span className="pink"> ♡</span></h1>
    <p className="sub">A tiny corner of the internet, made just for you.<br/>Because someone as special as you deserves a little magic.</p>
    <button className="primary" onClick={()=>setStarted(true)}>Open your surprise <Heart size={17} fill="currentColor"/></button>
    <span className="from">with all my love, <b>Prem</b></span>
    <div className="scrollhint"><ChevronDown size={17}/> your surprise awaits</div>
  </section> : <>
   <section className="intro section">
    <div className="eyebrow"><Stars size={14}/> today is all about you</div>
    <p className="script">The world got a little brighter</p>
    <h2>Because <em>you</em> were born.</h2>
    <p className="sub">26 looks beautiful on you, Poulami.</p>
    <div className="cake" onClick={()=>setCandle(!candle)} role="button" tabIndex={0} aria-label="Blow the candles">🎂<span className={candle?"flame out":"flame"}>🕯️</span></div>
    <button className="soft" onClick={()=>setCandle(true)}>{candle?"Wish made! ✨":"Tap the candle to make a wish"}</button>
   </section>
   <section className="section memories">
    <div className="eyebrow">♡ little moments, big feelings</div><h2>My favourite memories<br/>have <em>you</em> in them.</h2>
    <div className="gallery">{photos.map((p,i)=><figure key={p} className={`photo p${i}`}><img src={p} alt={`Our memory ${i+1}`} loading="lazy"/><figcaption>{["A moment I keep close","My favourite kind of day","Just us, being us","A memory worth keeping","More moments to come"][i]}</figcaption></figure>)}</div>
   </section>
   <section className="section wishes">
    <div className="eyebrow"><Sparkles size={14}/> little reminders</div><h2>Things I hope you <em>never forget.</em></h2>
    <div className="wishgrid">{wishes.map((w,i)=><button className={`wish ${wish===i?"chosen":""}`} key={w} onClick={()=>setWish(i)}><span>{["♡","✧","☼","∞","✿"][i]}</span>{wish===i?w:"Tap to reveal a little thought"}</button>)}</div>
   </section>
   <section className="section letter">
    <div className="eyebrow">a letter, from my heart</div><h2>For you, <em>always.</em></h2>
    <article className="paper"><div className="paperheart">♡</div><p className="script">Meri jaan,</p><p>{letter}</p><div className="signature">Forever yours,<br/><b>Prem</b> ♡</div></article>
   </section>
   <section className="final section">
    <div className="gift" onClick={()=>setOpened(!opened)}>{opened?"💖":"🎁"}</div>
    <h2>{opened?"My favourite gift is you.":"One last little surprise…"}</h2>
    <p className="sub">{opened?"Here's to every birthday, every silly moment, and every tomorrow together.":"There's one thing I want you to know. Tap the gift."}</p>
    <button className="primary" onClick={()=>setOpened(!opened)}>{opened?"A million more memories":"Unwrap your surprise"} <Heart size={17} fill="currentColor"/></button>
    <p className="closing">Happy 26th birthday, Poulami. I love you. ♡</p>
   </section>
  </>}
  <footer>made with ♡ by Prem · just for Poulami</footer>
 </main>;
}
