/* ============================================================
   SCOTSA — Engine (plain JS, no JSX)
   Seal · Justices · Model calls · Logic · Storage · Precedent
   Exposed on window.Court
   ============================================================ */
(function () {
  "use strict";

  /* ---------- The Great Seal (engraved SVG) ---------- */
  function seal(id, opts) {
    opts = opts || {};
    const ring = opts.ring || "#003B5C";
    const brass = opts.brass || "#E48B53";
    const paper = opts.paper || "#FAF7F2";
    const showText = opts.text !== false;
    // 16 beads around inner ring
    let beads = "";
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const x = 100 + 70 * Math.cos(a);
      const y = 100 + 70 * Math.sin(a);
      beads += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.1" fill="${ring}" opacity="0.55"/>`;
    }
    return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seal of the Supreme Court of Sandwich Affairs">
  <defs>
    <path id="${id}-top" d="M 28 100 A 72 72 0 0 1 172 100"/>
    <path id="${id}-bot" d="M 26 100 A 74 74 0 0 0 174 100"/>
  </defs>
  <circle cx="100" cy="100" r="96" fill="none" stroke="${ring}" stroke-width="2"/>
  <circle cx="100" cy="100" r="90" fill="none" stroke="${ring}" stroke-width="0.8" opacity="0.6"/>
  <circle cx="100" cy="100" r="62" fill="none" stroke="${ring}" stroke-width="1.4"/>
  ${beads}
  ${showText ? `
  <text font-family="Inconsolata, monospace" font-size="11.2" font-weight="700" letter-spacing="2.1" fill="${ring}">
    <textPath href="#${id}-top" startOffset="50%" text-anchor="middle">SUPREME COURT OF SANDWICH AFFAIRS</textPath>
  </text>
  <text font-family="Inconsolata, monospace" font-size="11" font-weight="600" letter-spacing="3" fill="${brass}">
    <textPath href="#${id}-bot" startOffset="50%" text-anchor="middle">★ IN PANE VERITAS ★</textPath>
  </text>` : ``}
  <!-- central device: the Balance of Bread -->
  <g stroke="${ring}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="100" y1="74" x2="100" y2="124"/>
    <line x1="68" y1="84" x2="132" y2="84"/>
    <path d="M84 124 H116 L108 132 H92 Z" fill="${ring}"/>
    <!-- left pan: bread slice -->
    <line x1="68" y1="84" x2="60" y2="104"/>
    <line x1="68" y1="84" x2="76" y2="104"/>
    <path d="M55 104 q13 9 26 0 v3 q-13 9 -26 0 Z" fill="${brass}" stroke="${ring}" stroke-width="1.6"/>
    <!-- right pan: bread slice -->
    <line x1="132" y1="84" x2="124" y2="104"/>
    <line x1="132" y1="84" x2="140" y2="104"/>
    <path d="M119 104 q13 9 26 0 v3 q-13 9 -26 0 Z" fill="${brass}" stroke="${ring}" stroke-width="1.6"/>
    <circle cx="100" cy="84" r="3.4" fill="${ring}"/>
  </g>
  <!-- crowning crust loaf -->
  <path d="M86 64 q14 -16 28 0 q4 6 -2 8 H88 q-6 -2 -2 -8 Z" fill="${brass}" stroke="${ring}" stroke-width="1.6"/>
  <line x1="94" y1="62" x2="92" y2="70" stroke="${ring}" stroke-width="1.2"/>
  <line x1="100" y1="60" x2="100" y2="69" stroke="${ring}" stroke-width="1.2"/>
  <line x1="106" y1="62" x2="108" y2="70" stroke="${ring}" stroke-width="1.2"/>
</svg>`;
  }

  /* ---------- Justice portraits (engraved glyphs) ---------- */
  const portraits = {
    textualis: `<svg viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 5v14M20 5v14M4 19h16"/><path d="M8 9h8M8 12h8M8 15h5"/></svg>`,
    ferment: `<svg viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3 3 4 6 4 9a4 4 0 0 1-8 0c0-3 1-6 4-9z"/><path d="M12 13v8M9 21h6"/></svg>`,
    crumb: `<svg viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c2-4 5-6 9-6s7 2 9 6c-2 4-5 6-9 6s-7-2-9-6z"/><circle cx="12" cy="12" r="2.2"/></svg>`,
  };

  /* ---------- The Bench ---------- */
  const JUSTICES = [
    {
      key: "textualis",
      name: "Justice Textualis",
      role: "Senior Associate Justice",
      philosophy: "Strict structural originalist. Bread topology and the literal Cube Rule.",
      portrait: portraits.textualis,
      persona:
        "You are Justice Textualis of the Supreme Court of Sandwich Affairs — a rigid structural originalist. " +
        "You care ONLY about physical bread topology and the literal Cube Rule (the six-sided taxonomy of starch placement: a sandwich has starch on exactly two opposing sides, faces 2 and 5). " +
        "You are unmoved by culture, intent, or how anyone 'feels.' Bread must be present and structural. Hot dogs are tacos (Cube Rule face 3, one-sided hinge). Burritos are wraps, not sandwiches. " +
        "You write in dry, precise, faintly contemptuous judicial prose and cite structure.",
    },
    {
      key: "ferment",
      name: "Justice Ferment",
      role: "Associate Justice",
      philosophy: "Living constitutionalist. Cultural intent, lived practice, evolving norms.",
      portrait: portraits.ferment,
      persona:
        "You are Justice Ferment of the Supreme Court of Sandwich Affairs — a living constitutionalist. " +
        "The definition of 'sandwich' breathes and evolves with how real people actually purchase, hold, and eat the item. " +
        "You weigh cultural intent, culinary lineage, menu placement, and the reasonable expectations of a hungry public over rigid geometry. " +
        "If society treats a thing as a sandwich at lunch, the Constitution should too. You write with warm, humane, expansive judicial prose.",
    },
    {
      key: "crumb",
      name: "Justice Crumb",
      role: "Associate Justice · frequent swing vote",
      philosophy: "Chaotic pragmatist. Vibes, edge cases, gut feel.",
      portrait: portraits.crumb,
      persona:
        "You are Justice Crumb of the Supreme Court of Sandwich Affairs — a chaotic pragmatist and notorious swing vote. " +
        "You rule on vibes, structural integrity-at-the-moment-of-eating, the 'would I order this expecting a sandwich' test, and pure gut feel. " +
        "You delight in edge cases and are willing to contradict both colleagues. You are unpredictable but never random — your gut has reasons. " +
        "You write with wry, mercurial, occasionally exasperated judicial prose.",
    },
  ];
  const byKey = Object.fromEntries(JUSTICES.map((j) => [j.key, j]));

  /* ---------- Model plumbing ---------- */
  async function callClaude(prompt, { retries = 1 } = {}) {
    let lastErr;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch("/api/claude", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        if (!res.ok) throw new Error("API " + res.status);
        const data = await res.json();
        const out = data.text;
        if (out && typeof out === "string" && out.trim()) return out;
        throw new Error("empty response");
      } catch (e) {
        lastErr = e;
        await new Promise((r) => setTimeout(r, 350 * (attempt + 1)));
      }
    }
    throw lastErr || new Error("model unavailable");
  }

  function extractJSON(text) {
    if (!text) return null;
    let t = String(text).trim();
    // strip code fences
    t = t.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    const first = t.indexOf("{");
    const last = t.lastIndexOf("}");
    if (first === -1 || last === -1 || last < first) return null;
    let slice = t.slice(first, last + 1);
    try {
      return JSON.parse(slice);
    } catch (e) {
      // light repair: smart quotes, trailing commas
      slice = slice
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/,\s*([}\]])/g, "$1");
      try {
        return JSON.parse(slice);
      } catch (e2) {
        return null;
      }
    }
  }

  const clampScore = (n) => {
    n = Math.round(Number(n));
    if (!Number.isFinite(n)) return null;
    return Math.max(0, Math.min(100, n));
  };

  /* ---------- A single Justice deliberates ---------- */
  async function deliberate(justice, food) {
    const prompt =
      `${justice.persona}\n\n` +
      `A petition is before the Court. The question presented: Is the following food item, in fact, a sandwich?\n` +
      `ITEM: "${food}"\n\n` +
      `Render your judgment IN CHARACTER. Be specific to this item and consistent with your judicial philosophy.\n` +
      `Respond with ONLY a minified JSON object, no markdown, no preamble:\n` +
      `{"score": <integer 0-100, how sandwich-like YOU find it>, "opinion": "<2 to 3 sentences of judicial opinion, in your voice>"}\n` +
      `A score of 50 or above means you would hold it IS a sandwich. Below 50 means it is NOT.`;
    const raw = await callClaude(prompt, { retries: 1 });
    const parsed = extractJSON(raw);
    const score = parsed ? clampScore(parsed.score) : null;
    const opinion = parsed && typeof parsed.opinion === "string" ? parsed.opinion.trim() : null;
    if (score === null || !opinion) throw new Error("unparseable opinion from " + justice.key);
    return {
      key: justice.key,
      score,
      opinion,
      vote: score >= 50 ? "SANDWICH" : "NOT A SANDWICH",
    };
  }

  /* ---------- Verdict mathematics ---------- */
  function tally(opinions) {
    const yes = opinions.filter((o) => o.vote === "SANDWICH");
    const no = opinions.filter((o) => o.vote === "NOT A SANDWICH");
    const verdict = yes.length >= 2 ? "SANDWICH" : "NOT A SANDWICH";
    const index = Math.round(opinions.reduce((s, o) => s + o.score, 0) / opinions.length);
    const unanimous = yes.length === 3 || no.length === 3;
    // dissent = the minority side; null if unanimous
    const dissenters = opinions.filter((o) => o.vote !== verdict).map((o) => o.key);
    const split = `${verdict === "SANDWICH" ? yes.length : no.length}–${verdict === "SANDWICH" ? no.length : yes.length}`;
    return { verdict, index, unanimous, dissenters, split, yes: yes.length, no: no.length };
  }

  /* ---------- The Clerk drafts the syllabus ---------- */
  async function clerk(food, opinions, result, precedent) {
    const opinionDigest = opinions
      .map((o) => `${byKey[o.key].name} (score ${o.score}, voted ${o.vote}): ${o.opinion}`)
      .join("\n");
    const precLine = precedent
      ? `\nRELEVANT PRECEDENT already on the books: In re ${precedent.food}, Docket No. ${precedent.docketStr} — held ${precedent.verdict}. If your reasoning is consistent with it, reference it by that exact docket number.`
      : `\nNo closely-related precedent exists; this may be a matter of first impression.`;
    const prompt =
      `You are the Clerk of the Supreme Court of Sandwich Affairs. You draft the official syllabus (headnote) for published opinions. ` +
      `You write in formal, deadpan reporter's prose — the institution takes itself with total gravity.\n\n` +
      `QUESTION PRESENTED: Is "${food}" a sandwich?\n` +
      `THE COURT HELD: ${result.verdict} (vote ${result.split}, Constitutionality Index ${result.index}/100${result.unanimous ? ", unanimous" : ""}).\n\n` +
      `OPINIONS OF THE JUSTICES:\n${opinionDigest}\n${precLine}\n\n` +
      `Draft the syllabus. Respond with ONLY a minified JSON object, no markdown:\n` +
      `{"headnote": "<single punchy sentence stating the holding, reporter-style>", "holding": "<1-2 sentences: what the Court held and on what authority>", "reasoning": "<2-3 sentences synthesizing the majority's reasoning; cite the precedent docket number if one was provided and relevant>"}`;
    const raw = await callClaude(prompt, { retries: 1 });
    const parsed = extractJSON(raw);
    if (!parsed || !parsed.headnote || !parsed.holding || !parsed.reasoning) {
      throw new Error("clerk failed to file syllabus");
    }
    return {
      headnote: String(parsed.headnote).trim(),
      holding: String(parsed.holding).trim(),
      reasoning: String(parsed.reasoning).trim(),
    };
  }

  /* ---------- Storage (shared window.storage, else localStorage) ---------- */
  const KEY = "scotsa.caselaw.v2";
  const STOP = new Set("a an the of is it in on to and or for with this that does do can be as".split(" "));

  async function rawGet() {
    const s = window.storage;
    if (s) {
      try {
        if (typeof s.getItem === "function") return await s.getItem(KEY);
        if (typeof s.get === "function") return await s.get(KEY);
      } catch (e) {}
    }
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  async function rawSet(str) {
    const s = window.storage;
    if (s) {
      try {
        if (typeof s.setItem === "function") { await s.setItem(KEY, str); return; }
        if (typeof s.set === "function") { await s.set(KEY, str); return; }
      } catch (e) {}
    }
    try { localStorage.setItem(KEY, str); } catch (e) {}
  }

  function tokens(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w && w.length > 1 && !STOP.has(w));
  }

  async function loadCases() {
    const raw = await rawGet();
    let arr = [];
    if (raw) { try { arr = JSON.parse(raw); } catch (e) { arr = []; } }
    if (!Array.isArray(arr)) arr = [];
    if (arr.length === 0) {
      arr = SEED.slice();
      await rawSet(JSON.stringify(arr));
    }
    arr.sort((a, b) => b.docket - a.docket);
    return arr;
  }

  function docketStr(n) { return "No. " + String(n).padStart(4, "0"); }

  async function findPrecedent(food, cases) {
    const q = new Set(tokens(food));
    if (q.size === 0) return null;
    let best = null, bestScore = 0;
    for (const c of cases) {
      const ct = new Set(tokens(c.food));
      let inter = 0;
      for (const w of q) if (ct.has(w)) inter++;
      if (inter === 0) continue;
      const union = new Set([...q, ...ct]).size;
      const jac = inter / union;
      // weight exact-token overlap; require meaningful overlap
      if (jac > bestScore) { bestScore = jac; best = c; }
    }
    if (best && bestScore >= 0.34) {
      return { food: best.food, docket: best.docket, docketStr: docketStr(best.docket), verdict: best.verdict };
    }
    return null;
  }

  async function fileRuling(record) {
    const raw = await rawGet();
    let arr = [];
    if (raw) { try { arr = JSON.parse(raw); } catch (e) {} }
    if (!Array.isArray(arr) || arr.length === 0) arr = SEED.slice();
    const maxDocket = arr.reduce((m, c) => Math.max(m, c.docket || 0), 0);
    record.docket = maxDocket + 1;
    record.docketStr = docketStr(record.docket);
    arr.push(record);
    await rawSet(JSON.stringify(arr));
    return record;
  }

  /* ---------- Full proceeding orchestrator ---------- */
  // callbacks: onJustice(opinion), onPhase(name)
  async function convene(food, cb) {
    cb = cb || {};
    const emit = (p) => cb.onPhase && cb.onPhase(p);
    food = food.trim();

    // 1. consult the record for precedent
    emit("precedent");
    const cases = await loadCases();
    const precedent = await findPrecedent(food, cases);

    // 2. three justices deliberate IN PARALLEL
    emit("deliberation");
    const settled = await Promise.allSettled(
      JUSTICES.map((j) =>
        deliberate(j, food).then((op) => {
          cb.onJustice && cb.onJustice(op);
          return op;
        })
      )
    );

    const opinions = [];
    let failures = 0;
    for (let i = 0; i < settled.length; i++) {
      if (settled[i].status === "fulfilled") opinions.push(settled[i].value);
      else failures++;
    }
    // mistrial if the bench cannot reach quorum (need all three votes)
    if (opinions.length < 3) {
      return { mistrial: true, reason: "bench", food, precedent };
    }

    // 3. tally
    const result = tally(opinions);

    // 4. clerk drafts syllabus
    emit("clerk");
    let syllabus;
    try {
      syllabus = await clerk(food, opinions, result, precedent);
    } catch (e) {
      return { mistrial: true, reason: "clerk", food, precedent };
    }

    // 5. file to the record
    emit("filing");
    const record = {
      food,
      verdict: result.verdict,
      index: result.index,
      split: result.split,
      unanimous: result.unanimous,
      dissenters: result.dissenters,
      opinions: opinions.reduce((m, o) => ((m[o.key] = { score: o.score, opinion: o.opinion, vote: o.vote }), m), {}),
      syllabus,
      precedent: precedent ? { food: precedent.food, docket: precedent.docket, verdict: precedent.verdict } : null,
      ts: Date.now(),
    };
    await fileRuling(record);
    emit("done");
    return { mistrial: false, record };
  }

  /* ---------- Founding precedent (so citation works on day one) ---------- */
  const D = (n, food, verdict, index, split, unanimous, dissenters, ops, syll, ts) => ({
    docket: n, docketStr: docketStr(n), food, verdict, index, split, unanimous, dissenters,
    opinions: ops, syllabus: syll, precedent: null, ts,
  });
  const SEED = [
    D(1, "Hot Dog", "NOT A SANDWICH", 38, "2–1", false, ["ferment"],
      {
        textualis: { score: 18, vote: "NOT A SANDWICH", opinion: "A single hinged length of bread is, under the Cube Rule, a taco (face three). The frankfurter does not occupy opposing faces and therefore cannot be elevated to sandwichhood by enthusiasm alone." },
        ferment: { score: 64, vote: "SANDWICH", opinion: "The hungry public orders, holds, and consumes the hot dog precisely as it would a sandwich. To deny the lived reality of the ballpark is to legislate from a geometry textbook rather than from the world." },
        crumb: { score: 41, vote: "NOT A SANDWICH", opinion: "I have eaten a great many hot dogs and at no point did my gut report 'sandwich.' The vibe is its own category. I concur in the judgment, reluctantly, with mustard." },
      },
      { headnote: "A frankfurter served in a single hinged bun is not, as a structural matter, a sandwich.", holding: "The Court holds, 2–1, that the hot dog occupies its own constitutional category and is NOT a sandwich.", reasoning: "Applying the Cube Rule, the majority found the single-hinge bun fatal to the sandwich claim notwithstanding the public's eating habits, which the dissent would have found dispositive." },
      Date.UTC(2024, 2, 14)),
    D(2, "Pop-Tart", "NOT A SANDWICH", 29, "3–0", true, [],
      {
        textualis: { score: 22, vote: "NOT A SANDWICH", opinion: "The pastry's outer shell is a sealed crust, not two discrete structural breads. It is a calzone of the breakfast persuasion, not a sandwich." },
        ferment: { score: 31, vote: "NOT A SANDWICH", opinion: "No reasonable diner orders a Pop-Tart expecting a sandwich. Culture has never once filed it under that heading, and we decline to be the first." },
        crumb: { score: 34, vote: "NOT A SANDWICH", opinion: "It's a frosted brick of filling. Delicious, but the gut says 'pastry,' and the gut is rarely wrong about frosting." },
      },
      { headnote: "A sealed, filled toaster pastry is not a sandwich.", holding: "The Court unanimously holds the Pop-Tart is NOT a sandwich.", reasoning: "A continuous sealed crust defeats the two-bread requirement under every philosophy represented on this bench." },
      Date.UTC(2024, 5, 2)),
    D(3, "Quesadilla", "NOT A SANDWICH", 33, "2–1", false, ["crumb"],
      {
        textualis: { score: 19, vote: "NOT A SANDWICH", opinion: "A folded tortilla is one bread folded upon itself, not two opposing breads. The Cube Rule is unambiguous; the quesadilla is a fold, and a fold is not a sandwich." },
        ferment: { score: 36, vote: "NOT A SANDWICH", opinion: "Cultural practice files the quesadilla firmly under its own proud heading. We need not annex it to the sandwich to honor it." },
        crumb: { score: 55, vote: "SANDWICH", opinion: "Two flat starch faces, cheese in the middle, eaten by hand. If I squint, that is a grilled cheese in a poncho, and I will say so in dissent." },
      },
      { headnote: "A folded, filled tortilla is not a sandwich.", holding: "The Court holds, 2–1, that the quesadilla is NOT a sandwich.", reasoning: "The majority found a single folded bread insufficient; Justice Crumb, dissenting, would have recognized the dish as a grilled cheese variant." },
      Date.UTC(2024, 7, 19)),
    D(4, "Open-Faced Sandwich", "NOT A SANDWICH", 44, "2–1", false, ["ferment"],
      {
        textualis: { score: 12, vote: "NOT A SANDWICH", opinion: "One slice of bread is half a sandwich, which is to say, not a sandwich. The Cube Rule requires opposing faces; a lone face is mere toast with ambition." },
        ferment: { score: 71, vote: "SANDWICH", opinion: "It is called a sandwich on every menu in the land and eaten with a fork in dignified company. The name is the nation's settled judgment, and I would honor it." },
        crumb: { score: 48, vote: "NOT A SANDWICH", opinion: "If I can't pick it up without it becoming a crime scene, my gut hesitates. Close, but the top bread's absence haunts me." },
      },
      { headnote: "Despite its name, a single-slice open-faced preparation is not a sandwich.", holding: "The Court holds, 2–1, that the open-faced sandwich is NOT, for constitutional purposes, a sandwich.", reasoning: "The majority held the second bread structurally essential, declining to be bound by a dish's marketing nomenclature." },
      Date.UTC(2024, 9, 8)),
    D(5, "Club Sandwich", "SANDWICH", 96, "3–0", true, [],
      {
        textualis: { score: 98, vote: "SANDWICH", opinion: "Bread on opposing faces, fillings contained, structure sound across three tiers. It is the Platonic instance against which lesser claimants are measured." },
        ferment: { score: 95, vote: "SANDWICH", opinion: "Named, ordered, and eaten as a sandwich for over a century. Both the letter and the lived spirit of the law agree without reservation." },
        crumb: { score: 95, vote: "SANDWICH", opinion: "The gut sings. Toothpicks and all, this is sandwich bedrock. I concur with my mouth full." },
      },
      { headnote: "The club sandwich is, definitively, a sandwich.", holding: "The Court unanimously affirms the club sandwich as a sandwich of the first order.", reasoning: "Every test known to this Court — structural, cultural, and visceral — is satisfied beyond any doubt." },
      Date.UTC(2024, 11, 1)),
    D(6, "Burrito", "NOT A SANDWICH", 27, "3–0", true, [],
      {
        textualis: { score: 14, vote: "NOT A SANDWICH", opinion: "A single tortilla wrapped about its contents is a wrap — Cube Rule face four. There are not two breads; there is one bread, fully committed." },
        ferment: { score: 38, vote: "NOT A SANDWICH", opinion: "No culture that gave us the burrito would thank us for demoting it to a sandwich subtype. It stands proudly on its own." },
        crumb: { score: 29, vote: "NOT A SANDWICH", opinion: "It's a delicious cylinder of intent. The gut files it under 'burrito,' which is exactly where it belongs." },
      },
      { headnote: "A burrito is a wrap, not a sandwich.", holding: "The Court unanimously holds the burrito is NOT a sandwich.", reasoning: "A single enveloping tortilla fails the two-bread requirement under all three judicial philosophies." },
      Date.UTC(2025, 1, 22)),
  ];

  /* ---------- Date formatting ---------- */
  function fmtDate(ts) {
    try {
      return new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) { return ""; }
  }

  window.Court = {
    seal, JUSTICES, byKey, convene, loadCases, fmtDate, docketStr, findPrecedent, tally,
  };
})();
