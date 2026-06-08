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
    D(7, "Bánh Mì", "SANDWICH", 90, "3–0", true, [],
      {
        textualis: { score: 88, vote: "SANDWICH", opinion: "A split baguette presents starch on two opposing faces with fillings properly contained between them. The Cube Rule is satisfied with rare elegance; colonial provenance does not diminish a sound structure." },
        ferment: { score: 92, vote: "SANDWICH", opinion: "A century of lived practice — French loaf, Vietnamese hand — has settled this dish firmly in the sandwich tradition across two continents. The public orders it as a sandwich and is never once surprised." },
        crumb: { score: 90, vote: "SANDWICH", opinion: "Crunchy bread, stuff inside, eaten standing up on a sidewalk. The gut renders its verdict before the second bite: this is sandwich bedrock, passport stamps and all." },
      },
      { headnote: "A filled split baguette of Vietnamese tradition is, definitively, a sandwich.", holding: "The Court unanimously holds the bánh mì to be a sandwich of the first order.", reasoning: "Structural, cultural, and visceral tests align without friction; a split loaf bounding contained fillings satisfies every philosophy on this bench." },
      Date.UTC(2025, 1, 4)),
    D(8, "Cubano", "SANDWICH", 93, "3–0", true, [],
      {
        textualis: { score: 95, vote: "SANDWICH", opinion: "Two opposing faces of pressed bread, fillings fused under heat into a single sound body. The press does not destroy the two-bread structure; it perfects it. The claim is unimpeachable." },
        ferment: { score: 91, vote: "SANDWICH", opinion: "Born of immigrant kitchens and cigar-factory lunch counters, the medianoche has been a sandwich in name and practice for generations. Lineage and law concur." },
        crumb: { score: 93, vote: "SANDWICH", opinion: "Pressed, welded, impossible to deny. My gut had no questions. I concur with both hands and a napkin." },
      },
      { headnote: "The pressed Cuban sandwich is, beyond cavil, a sandwich.", holding: "The Court unanimously affirms the Cubano as a sandwich of the highest structural order.", reasoning: "Heat-fused opposing breads and a documented culinary lineage satisfy every test this Court applies." },
      Date.UTC(2025, 1, 15)),
    D(9, "Panini", "SANDWICH", 89, "3–0", true, [],
      {
        textualis: { score: 90, vote: "SANDWICH", opinion: "Two faces of bread, grill-marked and structural, fillings bounded between. That the grammar is plural abroad and singular at home is no concern of this Court; the geometry is dispositive." },
        ferment: { score: 88, vote: "SANDWICH", opinion: "Pressed bread bar culture has carried the panino through Italian daily life for a century. The hungry public's expectation is unambiguous." },
        crumb: { score: 89, vote: "SANDWICH", opinion: "Hot, crisp, hand-held, gone in six bites. The gut needs no deliberation; this is a sandwich that went to finishing school." },
      },
      { headnote: "The pressed Italian panino is a sandwich.", holding: "The Court unanimously holds the panini to be a sandwich.", reasoning: "Two structural breads enclosing contained fillings satisfy the originalist test, with culture and gut in full agreement." },
      Date.UTC(2025, 1, 26)),
    D(10, "Katsu Sando", "SANDWICH", 92, "3–0", true, [],
      {
        textualis: { score: 92, vote: "SANDWICH", opinion: "Pillowy milk-bread on two opposing faces, crusts removed, a breaded cutlet contained within. Crustlessness offends the eye but not the Cube Rule. Structurally flawless." },
        ferment: { score: 90, vote: "SANDWICH", opinion: "The convenience-store sando is a beloved institution of Japanese daily life, sold and consumed unmistakably as a sandwich. Its very name concedes the point." },
        crumb: { score: 94, vote: "SANDWICH", opinion: "Immaculate. The crusts are gone but the soul remains. My gut wept slightly. Affirmed with enthusiasm." },
      },
      { headnote: "The Japanese katsu sando is a sandwich.", holding: "The Court unanimously holds the katsu sando to be a sandwich.", reasoning: "Removal of crusts does not disturb the two-face structure; cultural practice and gut feeling concur completely." },
      Date.UTC(2025, 2, 9)),
    D(11, "Tramezzino", "SANDWICH", 83, "3–0", true, [],
      {
        textualis: { score: 85, vote: "SANDWICH", opinion: "Two soft crustless triangles enclosing a contained filling. The form is dainty but structurally orthodox; opposing faces are present and load-bearing." },
        ferment: { score: 84, vote: "SANDWICH", opinion: "A staple of Venetian bars since the 1920s, the tramezzino has never once been mistaken for anything but a small, civilized sandwich." },
        crumb: { score: 80, vote: "SANDWICH", opinion: "Tiny, triangular, vanishes in three bites. The gut approves, then orders another four." },
      },
      { headnote: "The crustless Venetian tramezzino is a sandwich.", holding: "The Court unanimously holds the tramezzino to be a sandwich.", reasoning: "Diminutive scale and absent crusts do not defeat a sound two-bread structure recognized in long cultural practice." },
      Date.UTC(2025, 2, 20)),
    D(12, "Croque Monsieur", "SANDWICH", 83, "3–0", true, [],
      {
        textualis: { score: 88, vote: "SANDWICH", opinion: "Two faces of bread, ham and béchamel contained, the whole gratinéed. Sauce atop the structure does not dissolve the structure. The two-bread requirement is met." },
        ferment: { score: 86, vote: "SANDWICH", opinion: "A fixture of every French café since 1910, ordered and served as a sandwich without controversy. The bistro menu is the nation's settled judgment." },
        crumb: { score: 74, vote: "SANDWICH", opinion: "It arrives under a blanket of cheese and sometimes a fork, which gives the gut pause — but underneath it is plainly two breads doing sandwich work. I concur, knife notwithstanding." },
      },
      { headnote: "The French croque monsieur is a sandwich.", holding: "The Court unanimously holds the croque monsieur to be a sandwich.", reasoning: "A molten topping and occasional utensil do not negate two structural breads enclosing contained fillings." },
      Date.UTC(2025, 2, 31)),
    D(13, "Pan-Bagnat", "SANDWICH", 85, "3–0", true, [],
      {
        textualis: { score: 82, vote: "SANDWICH", opinion: "A round Niçoise loaf, split and filled, its crumb soaked in oil. Saturation tests integrity but not topology; two opposing faces remain. The claim survives." },
        ferment: { score: 88, vote: "SANDWICH", opinion: "The fisherman's lunch of the Riviera, eaten by hand on the harbor for generations. Few sandwiches are more honestly named or more honestly eaten." },
        crumb: { score: 84, vote: "SANDWICH", opinion: "Soggy in the best way, held together by conviction and olive oil. The gut salutes a sandwich that earns its keep." },
      },
      { headnote: "The Niçoise pan-bagnat is a sandwich.", holding: "The Court unanimously holds the pan-bagnat to be a sandwich.", reasoning: "Oil-soaked crumb compromises neatness, not structure; the split loaf bounds its fillings on opposing faces." },
      Date.UTC(2025, 3, 11)),
    D(14, "Torta", "SANDWICH", 88, "3–0", true, [],
      {
        textualis: { score: 86, vote: "SANDWICH", opinion: "A bolillo or telera roll, split horizontally into two opposing faces, fillings contained. Unlike its folded countrymen the taco and burrito, the torta presents genuine two-bread structure. The distinction is decisive." },
        ferment: { score: 90, vote: "SANDWICH", opinion: "Mexico's great sandwich tradition stands proudly beside its tortilla traditions, not beneath them. The torta is ordered and eaten as a sandwich the country over." },
        crumb: { score: 88, vote: "SANDWICH", opinion: "Crusty roll, split and stacked, eaten by hand. The gut, which rejected the burrito, embraces the torta without contradiction. Bread shape is everything." },
      },
      { headnote: "The Mexican torta is a sandwich.", holding: "The Court unanimously holds the torta to be a sandwich.", reasoning: "A horizontally split roll supplies the two opposing faces that fold-based dishes lack, distinguishing the torta from the burrito and the taco." },
      Date.UTC(2025, 3, 22)),
    D(15, "Chivito", "SANDWICH", 87, "3–0", true, [],
      {
        textualis: { score: 87, vote: "SANDWICH", opinion: "A split bun bearing steak and considerable ballast on two opposing faces. Overloading strains integrity but not the underlying topology. Sandwich." },
        ferment: { score: 88, vote: "SANDWICH", opinion: "Uruguay's national sandwich, ordered with pride and consumed with effort in every cantina. Cultural standing could scarcely be clearer." },
        crumb: { score: 86, vote: "SANDWICH", opinion: "An avalanche between two buns. Ambitious, structurally heroic, unmistakably a sandwich. The gut needed a moment and a second napkin." },
      },
      { headnote: "The Uruguayan chivito is a sandwich.", holding: "The Court unanimously holds the chivito to be a sandwich.", reasoning: "Heroic overstuffing does not defeat a split-bun structure with two opposing faces; national practice confirms the holding." },
      Date.UTC(2025, 4, 3)),
    D(16, "Vada Pav", "SANDWICH", 81, "3–0", true, [],
      {
        textualis: { score: 76, vote: "SANDWICH", opinion: "A pav bun, split, enclosing a fried potato dumpling. The split supplies two opposing faces; the filling's identity is immaterial to structure. The Cube Rule does not discriminate by cuisine." },
        ferment: { score: 86, vote: "SANDWICH", opinion: "Mumbai's beloved street sandwich, often called the city's own burger. Millions order and eat it as a sandwich daily; the law should honor what the public has long settled." },
        crumb: { score: 82, vote: "SANDWICH", opinion: "A spiced potato bomb in a soft bun, eaten on the run. The gut says sandwich, the chutney says yes faster." },
      },
      { headnote: "The Mumbai vada pav is a sandwich.", holding: "The Court unanimously holds the vada pav to be a sandwich.", reasoning: "A split pav bun furnishes two opposing faces; the nature of the filling is constitutionally irrelevant to sandwich-hood." },
      Date.UTC(2025, 4, 14)),
    D(17, "Choripán", "SANDWICH", 72, "3–0", true, [],
      {
        textualis: { score: 66, vote: "SANDWICH", opinion: "Unlike the frankfurter's single hinged bun, the choripán employs a crusty roll sliced clean through into two opposing faces. That structural difference, narrow but real, removes it from the hot dog's taco classification." },
        ferment: { score: 80, vote: "SANDWICH", opinion: "The roadside grill sandwich of the Southern Cone, eaten by hand at every asado. Lived practice files it squarely under sandwich." },
        crumb: { score: 71, vote: "SANDWICH", opinion: "A split sausage in a split roll — and the split is what saves it. The gut, which once doubted the hot dog, finds the choripán lands on the right side of the bread." },
      },
      { headnote: "A grilled chorizo served in a sliced crusty roll is a sandwich.", holding: "The Court unanimously holds the choripán to be a sandwich, distinguishing it from the hot dog.", reasoning: "A roll sliced fully through presents two opposing faces, unlike the single hinged frankfurter bun; the structural distinction is dispositive." },
      Date.UTC(2025, 4, 25)),
    D(18, "Gyro", "NOT A SANDWICH", 45, "2–1", false, ["ferment"],
      {
        textualis: { score: 24, vote: "NOT A SANDWICH", opinion: "A single pita folded about its contents is one bread bent upon itself — Cube Rule face three, the taco classification. There are not two opposing faces; there is one face and a wish." },
        ferment: { score: 68, vote: "SANDWICH", opinion: "The gyro is a pillar of Greek street eating, held and consumed exactly as the hungry public consumes a sandwich. I would honor that settled practice and hold it within the canon." },
        crumb: { score: 44, vote: "NOT A SANDWICH", opinion: "Delicious chaos that drips down the wrist. The gut wavers: hand-held like a sandwich, but it eats like a wrap escaping custody. I cannot quite get there." },
      },
      { headnote: "A folded pita gyro is not, structurally, a sandwich.", holding: "The Court holds, 2–1, that the gyro is NOT a sandwich.", reasoning: "The majority found a single folded bread insufficient under the Cube Rule; Justice Ferment, dissenting, would have honored the dish's lived practice as a sandwich." },
      Date.UTC(2025, 5, 5)),
    D(19, "Döner Kebab", "NOT A SANDWICH", 43, "2–1", false, ["ferment"],
      {
        textualis: { score: 22, vote: "NOT A SANDWICH", opinion: "Whether wrapped in lavash or stuffed in a pocket, the döner remains a single bread enveloping its contents. One bread is not two; the wrap and the pocket alike fail the opposing-faces requirement." },
        ferment: { score: 66, vote: "SANDWICH", opinion: "Reinvented on the streets of Berlin and beloved across a continent, the döner is purchased and eaten as a handheld meal in the sandwich mold. The living constitution should embrace it." },
        crumb: { score: 41, vote: "NOT A SANDWICH", opinion: "A glorious mess. The gut admits the joy and withholds the title; this eats like a wrap with ambitions, and ambition is not classification." },
      },
      { headnote: "The döner kebab is not a sandwich.", holding: "The Court holds, 2–1, that the döner kebab is NOT a sandwich.", reasoning: "A single enveloping bread, whether wrap or pocket, fails the two-face test; the dissent would have credited the dish's handheld cultural role." },
      Date.UTC(2025, 5, 16)),
    D(20, "Shawarma", "NOT A SANDWICH", 40, "2–1", false, ["ferment"],
      {
        textualis: { score: 20, vote: "NOT A SANDWICH", opinion: "Rolled in a single flatbread, the shawarma is a wrap by any honest measure — Cube Rule face four. The roll commits one bread fully around the contents; opposing faces are absent." },
        ferment: { score: 58, vote: "SANDWICH", opinion: "From Beirut to Toronto, the shawarma is a handheld staple ordered in the same breath as a sandwich. I would extend the canon to meet the public where it eats." },
        crumb: { score: 42, vote: "NOT A SANDWICH", opinion: "Spiced, dripping, rolled tight. The gut enjoys it immensely and still files it under 'wrap.' Rolling is not stacking." },
      },
      { headnote: "A rolled flatbread shawarma is a wrap, not a sandwich.", holding: "The Court holds, 2–1, that the shawarma is NOT a sandwich.", reasoning: "A single bread rolled fully about its contents fails the opposing-faces requirement; Justice Ferment, dissenting, would recognize its handheld cultural standing." },
      Date.UTC(2025, 5, 27)),
    D(21, "Gua Bao", "NOT A SANDWICH", 46, "2–1", false, ["ferment"],
      {
        textualis: { score: 30, vote: "NOT A SANDWICH", opinion: "A single steamed bun folded over braised pork is one bread hinged upon itself. The fold, however pillowy, is the taco's structure in softer dress. Not a sandwich." },
        ferment: { score: 62, vote: "SANDWICH", opinion: "The lotus-leaf bun is a treasured handheld of Taiwanese night markets, eaten precisely as one eats a small sandwich. Cultural practice points one way only." },
        crumb: { score: 46, vote: "NOT A SANDWICH", opinion: "A cloud hugging pork belly. The gut adores it and quietly notes it is a fold, not a stack. So close, and yet a fold." },
      },
      { headnote: "The folded steamed gua bao is not a sandwich.", holding: "The Court holds, 2–1, that the gua bao is NOT a sandwich.", reasoning: "A single folded bun replicates taco topology rather than two-bread structure; the dissent would have honored its handheld cultural role." },
      Date.UTC(2025, 6, 8)),
    D(22, "Smørrebrød", "NOT A SANDWICH", 43, "2–1", false, ["ferment"],
      {
        textualis: { score: 12, vote: "NOT A SANDWICH", opinion: "One slice of dense rye, dressed atop. As this Court held of the open-faced preparation, a lone face is half a sandwich — which is to say, none. The Danish name changes nothing the geometry decides." },
        ferment: { score: 72, vote: "SANDWICH", opinion: "Smørrebrød is the cultivated heart of Danish lunch, presented and revered as an open sandwich for centuries. The word 'sandwich' lives in its very category; I would honor that inheritance." },
        crumb: { score: 46, vote: "NOT A SANDWICH", opinion: "Beautiful, fork-and-knife, impossible to lift without incident. The gut admires the artistry and misses the missing lid." },
      },
      { headnote: "The Danish open-faced smørrebrød is not a sandwich.", holding: "The Court holds, 2–1, that the smørrebrød is NOT a sandwich.", reasoning: "Consistent with the Court's open-faced precedent, a single slice lacks the structurally essential second bread; the dissent would defer to settled cultural nomenclature." },
      Date.UTC(2025, 6, 19)),
    D(23, "Bunny Chow", "NOT A SANDWICH", 37, "2–1", false, ["ferment"],
      {
        textualis: { score: 22, vote: "NOT A SANDWICH", opinion: "A hollowed quarter-loaf filled with curry is a vessel, not a stack — a bread bowl. There are no opposing faces enclosing the contents; there is a container. The taxonomy is that of the bowl." },
        ferment: { score: 50, vote: "SANDWICH", opinion: "Born in Durban's Indian community, bunny chow is a proud handheld institution eaten bread-and-all. I would read the canon generously enough to seat it at the table." },
        crumb: { score: 40, vote: "NOT A SANDWICH", opinion: "You eat the bowl, which is delightful and disqualifying. The gut files it lovingly under 'edible vessel.'" },
      },
      { headnote: "Curry served in a hollowed bread loaf is a bread bowl, not a sandwich.", holding: "The Court holds, 2–1, that bunny chow is NOT a sandwich.", reasoning: "A hollowed loaf functions as a container rather than two enclosing faces; the dissent would have credited its handheld bread-and-all consumption." },
      Date.UTC(2025, 6, 30)),
    D(24, "Zapiekanka", "NOT A SANDWICH", 41, "2–1", false, ["ferment"],
      {
        textualis: { score: 24, vote: "NOT A SANDWICH", opinion: "A halved baguette dressed and baked open-faced. Two pieces of bread set side by side is not two opposing faces enclosing a filling; it is two open faces. The open-face precedent controls." },
        ferment: { score: 55, vote: "SANDWICH", opinion: "The midnight staple of Polish milk bars and train stations, sold and eaten as a beloved handheld. Practice argues for inclusion." },
        crumb: { score: 43, vote: "NOT A SANDWICH", opinion: "An open-faced baguette under melted cheese. The gut keeps reaching for the absent top half and keeps coming back empty." },
      },
      { headnote: "An open-faced baked baguette is not a sandwich.", holding: "The Court holds, 2–1, that the zapiekanka is NOT a sandwich.", reasoning: "Two breads lying open-faced supply no enclosing second face; the open-faced precedent governs, over the dissent's appeal to practice." },
      Date.UTC(2025, 7, 10)),
    D(25, "Maki Sushi Roll", "NOT A SANDWICH", 20, "3–0", true, [],
      {
        textualis: { score: 8, vote: "NOT A SANDWICH", opinion: "Rice and nori are not bread. Where there is no starch loaf there are no opposing bread faces, and the Cube Rule has nothing to weigh. The claim does not reach the threshold." },
        ferment: { score: 30, vote: "NOT A SANDWICH", opinion: "Sushi is its own ancient and exacting tradition, never once filed under sandwich by the culture that perfected it. I see no public expectation to honor here." },
        crumb: { score: 22, vote: "NOT A SANDWICH", opinion: "Enclosed, sure — but in rice and seaweed. The gut, which knows a sandwich by its bread, returns a firm no." },
      },
      { headnote: "A maki sushi roll is not a sandwich.", holding: "The Court unanimously holds the maki roll is NOT a sandwich.", reasoning: "Absent any bread, no opposing-face structure exists to assess; cultural tradition and gut feeling concur in the negative." },
      Date.UTC(2025, 7, 21)),
    D(26, "Onigiri", "NOT A SANDWICH", 18, "3–0", true, [],
      {
        textualis: { score: 6, vote: "NOT A SANDWICH", opinion: "A pressed rice triangle wrapped in nori contains a filling but offers no bread whatsoever. With no starch loaf, there is nothing for the Cube Rule to measure. Plainly outside the canon." },
        ferment: { score: 26, vote: "NOT A SANDWICH", opinion: "The rice ball is a cherished tradition unto itself, never advanced as a sandwich by anyone who eats it. There is no settled practice for me to vindicate." },
        crumb: { score: 21, vote: "NOT A SANDWICH", opinion: "Hand-held and filled, yes — but it is rice in a seaweed coat. The gut likes it and does not call it a sandwich." },
      },
      { headnote: "Onigiri is not a sandwich.", holding: "The Court unanimously holds onigiri is NOT a sandwich.", reasoning: "A rice-and-nori construction contains no bread and therefore no opposing bread faces; every philosophy on this bench agrees." },
      Date.UTC(2025, 8, 1)),
    D(27, "Samosa", "NOT A SANDWICH", 27, "3–0", true, [],
      {
        textualis: { score: 18, vote: "NOT A SANDWICH", opinion: "A sealed fried pastry pocket, crimped on every side. As with the toaster pastry, a continuous sealed shell is not two discrete breads. It is a fried parcel, not a sandwich." },
        ferment: { score: 33, vote: "NOT A SANDWICH", opinion: "The samosa is a snack of its own venerable lineage across South Asia, never ordered as a sandwich. I find no public expectation to extend the canon." },
        crumb: { score: 30, vote: "NOT A SANDWICH", opinion: "A crispy triangle of spiced filling. The gut files it with the empanada and the dumpling, none of which are sandwiches." },
      },
      { headnote: "A sealed fried samosa is not a sandwich.", holding: "The Court unanimously holds the samosa is NOT a sandwich.", reasoning: "A continuous crimped shell defeats the two-bread requirement, consistent with the Court's sealed-pastry precedent." },
      Date.UTC(2025, 8, 12)),
    D(28, "Calzone", "NOT A SANDWICH", 33, "3–0", true, [],
      {
        textualis: { score: 20, vote: "NOT A SANDWICH", opinion: "A single disc of dough folded and sealed about its filling is one continuous bread, crimped shut. There are no opposing faces; there is one enclosing shell. It is a pie, not a sandwich." },
        ferment: { score: 35, vote: "NOT A SANDWICH", opinion: "The calzone is a proud member of the pizza family, never sold or ordered as a sandwich in any tradition I can locate. The canon need not annex it." },
        crumb: { score: 44, vote: "NOT A SANDWICH", opinion: "A sealed pocket of molten cheese. Tempting to call it a folded sandwich, but the gut keeps landing on 'pizza turnover.'" },
      },
      { headnote: "A sealed folded calzone is not a sandwich.", holding: "The Court unanimously holds the calzone is NOT a sandwich.", reasoning: "A single folded, sealed dough forms an enclosing shell rather than two opposing faces, placing it in the pie family." },
      Date.UTC(2025, 8, 23)),
    D(29, "Jianbing", "NOT A SANDWICH", 27, "3–0", true, [],
      {
        textualis: { score: 16, vote: "NOT A SANDWICH", opinion: "A thin batter crêpe folded several times about egg and crisp is a wrap of the most diaphanous kind. One folded sheet is not two opposing bread faces. The structure fails at the threshold." },
        ferment: { score: 34, vote: "NOT A SANDWICH", opinion: "The morning crêpe of Chinese street corners is its own brilliant tradition, never sold under the sandwich heading. I find no settled expectation to honor." },
        crumb: { score: 31, vote: "NOT A SANDWICH", opinion: "A folded savory crêpe, gloriously messy. The gut enjoys breakfast and declines to issue a sandwich certificate." },
      },
      { headnote: "A folded jianbing crêpe is not a sandwich.", holding: "The Court unanimously holds the jianbing is NOT a sandwich.", reasoning: "A single folded batter crêpe supplies no opposing bread faces; cultural practice and gut feeling agree it falls outside the canon." },
      Date.UTC(2025, 9, 4)),
    D(30, "Arepa", "SANDWICH", 52, "2–1", false, ["textualis"],
      {
        textualis: { score: 40, vote: "NOT A SANDWICH", opinion: "A cornmeal cake split and filled flirts with two faces, yet a single round griddle-cake sliced part-way is closer to a pocket than to two discrete breads. I would withhold the title. I respectfully dissent." },
        ferment: { score: 60, vote: "SANDWICH", opinion: "The stuffed arepa is a daily handheld across northern South America, split and filled and eaten just as a sandwich is. The public's practice is plain and I would honor it." },
        crumb: { score: 56, vote: "SANDWICH", opinion: "Split corn cake, packed with cheese, eaten by hand. The gut says it crosses the line — barely, corn-forward, but it crosses." },
      },
      { headnote: "A split-and-filled arepa is, narrowly, a sandwich.", holding: "The Court holds, 2–1, that the stuffed arepa IS a sandwich.", reasoning: "The majority found a split, filled griddle-cake sufficiently two-faced and credited its handheld practice; Justice Textualis, dissenting, deemed it a pocket rather than two breads." },
      Date.UTC(2025, 9, 15)),
    D(31, "Francesinha", "SANDWICH", 56, "2–1", false, ["crumb"],
      {
        textualis: { score: 70, vote: "SANDWICH", opinion: "Beneath the molten cheese and the moat of beer-and-tomato sauce lies an orthodox structure: two opposing breads enclosing layered meats. Sauce poured over a sandwich does not unmake the sandwich. The geometry holds." },
        ferment: { score: 61, vote: "SANDWICH", opinion: "Porto's decadent specialty is descended directly from the croque monsieur and eaten as a sit-down sandwich citywide. Both lineage and practice favor inclusion." },
        crumb: { score: 38, vote: "NOT A SANDWICH", opinion: "It arrives swimming in sauce, eaten with a knife and fork, often beside fries drowning in the same. The gut tastes a stew with a bread raft, not a sandwich. I dissent, soggily." },
      },
      { headnote: "The sauce-drenched francesinha is, structurally, a sandwich.", holding: "The Court holds, 2–1, that the francesinha IS a sandwich.", reasoning: "The majority held that an enveloping sauce does not dissolve two enclosing breads; Justice Crumb, dissenting, found the dish had passed from sandwich into stew." },
      Date.UTC(2025, 9, 26)),
    D(32, "Hamburger", "SANDWICH", 60, "2–1", false, ["crumb"],
      {
        textualis: { score: 70, vote: "SANDWICH", opinion: "A split bun presents starch on two opposing faces enclosing a contained patty. The Cube Rule is indifferent to the public's romantic attachment; structurally the hamburger is a sandwich and always has been." },
        ferment: { score: 66, vote: "SANDWICH", opinion: "Menus, statutes, and a century of lunch counters have, more often than not, filed the burger within the sandwich family even while granting it pride of place. I would honor that settled, if affectionate, classification." },
        crumb: { score: 44, vote: "NOT A SANDWICH", opinion: "Everyone calls it a burger, no one calls it a sandwich, and the gut respects the will of the people. It is its own glorious genus. I dissent with relish." },
      },
      { headnote: "The hamburger is, structurally, a sandwich — its own protests notwithstanding.", holding: "The Court holds, 2–1, that the hamburger IS a sandwich.", reasoning: "The majority found a split bun enclosing a patty to satisfy the two-face requirement and to enjoy settled menu classification; Justice Crumb, dissenting, would have recognized the burger as a sovereign category." },
      Date.UTC(2025, 10, 6)),
    D(33, "Ice Cream Sandwich", "SANDWICH", 59, "2–1", false, ["textualis"],
      {
        textualis: { score: 44, vote: "NOT A SANDWICH", opinion: "Two soft wafer biscuits are not bread, and a thing does not become bread by being christened a sandwich on its wrapper. The form mimics the sandwich; the substance does not. I respectfully dissent." },
        ferment: { score: 70, vote: "SANDWICH", opinion: "It is named a sandwich, sold as a sandwich, and eaten as a sandwich by every child who has ever chased a truck down the street. The nation's settled understanding deserves the Court's deference." },
        crumb: { score: 64, vote: "SANDWICH", opinion: "Two flat faces, cold filling, eaten by hand with predictable drippage. The gut says the name fits. Sandwich, with napkins." },
      },
      { headnote: "The ice cream sandwich is, by name and practice, a sandwich.", holding: "The Court holds, 2–1, that the ice cream sandwich IS a sandwich.", reasoning: "The majority credited the dish's universal naming and handheld practice; Justice Textualis, dissenting, held that wafer biscuits are not bread and nomenclature cannot supply the deficiency." },
      Date.UTC(2025, 10, 15)),
    D(34, "Hot Pocket", "NOT A SANDWICH", 32, "3–0", true, [],
      {
        textualis: { score: 22, vote: "NOT A SANDWICH", opinion: "A single sealed dough sleeve crimped about a molten filling is a calzone of the freezer aisle. There are no opposing faces; there is one shell. The sealed-pastry rule controls." },
        ferment: { score: 34, vote: "NOT A SANDWICH", opinion: "Convenient, microwavable, and beloved at midnight — but the culture has never once ordered one as a sandwich. I find no settled expectation to honor here." },
        crumb: { score: 40, vote: "NOT A SANDWICH", opinion: "A lava-filled pocket that scalds the unwary. The gut files it with the empanada and the calzone, none of which made the cut." },
      },
      { headnote: "A sealed Hot Pocket is not a sandwich.", holding: "The Court unanimously holds the Hot Pocket is NOT a sandwich.", reasoning: "A single crimped, sealed dough shell forms a pocket rather than two opposing faces, consistent with the Court's sealed-pastry precedent." },
      Date.UTC(2025, 10, 24)),
    D(35, "Crunchwrap Supreme", "NOT A SANDWICH", 35, "3–0", true, [],
      {
        textualis: { score: 18, vote: "NOT A SANDWICH", opinion: "A single tortilla pleated and sealed into a hexagonal parcel is one bread folded shut — Cube Rule face four, a wrap of advanced engineering. Ingenuity does not amend the geometry." },
        ferment: { score: 40, vote: "NOT A SANDWICH", opinion: "A modern marvel of the drive-thru, yet sold squarely within the taco-and-wrap tradition, never as a sandwich. The living constitution sees a wrap." },
        crumb: { score: 47, vote: "NOT A SANDWICH", opinion: "A sealed flying saucer of fast food. The gut admires the architecture and stops just short of the title. So engineered, so close, still a wrap." },
      },
      { headnote: "A folded, sealed Crunchwrap is a wrap, not a sandwich.", holding: "The Court unanimously holds the Crunchwrap Supreme is NOT a sandwich.", reasoning: "A single pleated tortilla sealed about its contents supplies no opposing faces; the dish falls within the wrap family under every philosophy." },
      Date.UTC(2025, 11, 3)),
    D(36, "S'more", "SANDWICH", 60, "3–0", true, [],
      {
        textualis: { score: 64, vote: "SANDWICH", opinion: "Two graham crackers present opposing starch faces enclosing a contained filling of marshmallow and chocolate. The Cube Rule does not discriminate by campfire; the structure is sound and the holding follows." },
        ferment: { score: 56, vote: "SANDWICH", opinion: "An American campfire institution, assembled and eaten by hand as a small sandwich in all but name. Practice nudges it just across the line." },
        crumb: { score: 60, vote: "SANDWICH", opinion: "Two crackers, gooey middle, eaten with both hands and great mess. The gut, against its own dignity, concedes: this is a cracker sandwich." },
      },
      { headnote: "The campfire s'more is, structurally, a sandwich.", holding: "The Court unanimously holds the s'more IS a sandwich.", reasoning: "Two graham-cracker faces enclosing a contained filling satisfy the structural test, with cultural practice and gut feeling concurring." },
      Date.UTC(2025, 11, 12)),
    D(37, "KFC Double Down", "NOT A SANDWICH", 35, "2–1", false, ["ferment"],
      {
        textualis: { score: 8, vote: "NOT A SANDWICH", opinion: "Two fried chicken filets are not bread, and a sandwich with no bread is no sandwich at all but a structural heresy. Where the loaf is wholly absent, the Cube Rule has nothing to measure and everything to condemn." },
        ferment: { score: 58, vote: "SANDWICH", opinion: "It was marketed, sold, and consumed explicitly and proudly as a sandwich. If the maker and the public agree on the heading, the living constitution should not overrule them on a technicality of crumb." },
        crumb: { score: 38, vote: "NOT A SANDWICH", opinion: "Meat where the bread should be. The gut recoils — if the bun can be chicken, the center cannot hold, and neither can the sandwich. No." },
      },
      { headnote: "A bunless meat-on-meat construction is not a sandwich.", holding: "The Court holds, 2–1, that the KFC Double Down is NOT a sandwich.", reasoning: "The majority held the total absence of bread fatal to the claim; Justice Ferment, dissenting, would have deferred to the item's explicit marketing and consumption as a sandwich." },
      Date.UTC(2025, 11, 21)),
    D(38, "McGriddle", "SANDWICH", 65, "3–0", true, [],
      {
        textualis: { score: 66, vote: "SANDWICH", opinion: "Two griddlecakes serve as opposing starch faces enclosing egg, cheese, and meat. A pancake is a bread of the griddle; the two-face requirement is, however syrupy, satisfied." },
        ferment: { score: 72, vote: "SANDWICH", opinion: "Ordered every morning as a breakfast sandwich and understood as nothing else, the McGriddle enjoys the public's settled classification. The menu is the nation's judgment." },
        crumb: { score: 58, vote: "SANDWICH", opinion: "Sweet, savory, structurally a sandwich with a sugar problem. The gut blinks at the syrup and then says yes." },
      },
      { headnote: "The McGriddle is a breakfast sandwich.", holding: "The Court unanimously holds the McGriddle IS a sandwich.", reasoning: "Two griddlecake faces enclosing a contained filling satisfy the structural test; the dish is universally ordered and understood as a breakfast sandwich." },
      Date.UTC(2025, 11, 30)),
    D(39, "Lasagna", "NOT A SANDWICH", 34, "3–0", true, [],
      {
        textualis: { score: 30, vote: "NOT A SANDWICH", opinion: "Many alternating layers of pasta and filling, served by the slab and eaten with a fork, form a baked casserole, not a sandwich. A sandwich has two enclosing faces, not an indefinite accordion of them." },
        ferment: { score: 25, vote: "NOT A SANDWICH", opinion: "An icon of the Italian table, never once advanced as a sandwich by the tradition that perfected it. There is no public expectation to vindicate." },
        crumb: { score: 46, vote: "NOT A SANDWICH", opinion: "One could squint and call it a tower of tiny pasta sandwiches, and the gut briefly does — then remembers the fork, the plate, the sauce, and recants." },
      },
      { headnote: "Lasagna is a layered casserole, not a sandwich.", holding: "The Court unanimously holds lasagna is NOT a sandwich.", reasoning: "An indefinite stack of fork-eaten layers lacks the discrete two-face structure of a sandwich and is universally understood as a casserole." },
      Date.UTC(2026, 0, 8)),
    D(40, "KitKat", "NOT A SANDWICH", 39, "3–0", true, [],
      {
        textualis: { score: 40, vote: "NOT A SANDWICH", opinion: "Thin wafers layered and then wholly encased in a chocolate shell describe a sealed confection, not two enclosing breads. The wafer is not bread, and the shell is not a face." },
        ferment: { score: 30, vote: "NOT A SANDWICH", opinion: "A chocolate bar of long and happy standing, never ordered or understood as a sandwich. The canon need not annex the candy aisle." },
        crumb: { score: 46, vote: "NOT A SANDWICH", opinion: "Crisp wafer layers, snapped along the seam. The gut enjoys it greatly and classifies it, correctly, as a candy bar." },
      },
      { headnote: "A KitKat is a chocolate bar, not a sandwich.", holding: "The Court unanimously holds the KitKat is NOT a sandwich.", reasoning: "Wafers encased in a continuous chocolate shell form a sealed confection lacking two bread faces; cultural practice agrees it is candy." },
      Date.UTC(2026, 0, 17)),
    D(41, "A Single Grape", "NOT A SANDWICH", 4, "3–0", true, [],
      {
        textualis: { score: 1, vote: "NOT A SANDWICH", opinion: "There is no bread. There is no filling. There is, in fact, only a grape. The Court strains to articulate a theory under which this petition was filed in good faith." },
        ferment: { score: 4, vote: "NOT A SANDWICH", opinion: "No culture on earth, however generous, has mistaken a single grape for a sandwich. The living constitution declines the invitation." },
        crumb: { score: 8, vote: "NOT A SANDWICH", opinion: "It's a grape. The gut is, for once, entirely at peace. Delicious. Not a sandwich." },
      },
      { headnote: "A single grape is not a sandwich.", holding: "The Court unanimously holds that a single grape is NOT a sandwich.", reasoning: "In the total absence of bread, filling, or structure, no sandwich claim can be entertained; the matter approaches the frivolous." },
      Date.UTC(2026, 0, 26)),
    D(42, "Spaghetti Sandwich", "SANDWICH", 62, "3–0", true, [],
      {
        textualis: { score: 80, vote: "SANDWICH", opinion: "Two opposing slices of bread enclose a contained filling. That the filling is buttered spaghetti is a culinary tragedy and a constitutional irrelevance. The structure is impeccable; the holding is compelled." },
        ferment: { score: 55, vote: "SANDWICH", opinion: "An eccentric but genuine tradition from Britain to Japan, ordered and eaten as a sandwich by those brave enough. Practice, however startled, supports inclusion." },
        crumb: { score: 52, vote: "SANDWICH", opinion: "Carbohydrate upon carbohydrate, an affront and yet — two breads, a filling, eaten by hand. The gut is appalled and outvoted by its own logic. Yes." },
      },
      { headnote: "A spaghetti sandwich is, however regrettably, a sandwich.", holding: "The Court unanimously holds the spaghetti sandwich IS a sandwich.", reasoning: "Two opposing breads enclosing a contained filling satisfy the structural test irrespective of the filling's identity; the result follows inexorably from the geometry." },
      Date.UTC(2026, 1, 4)),
    D(43, "Big Mac", "SANDWICH", 71, "3–0", true, [],
      {
        textualis: { score: 68, vote: "SANDWICH", opinion: "The interposed middle bun raises, but does not decide, whether this is one sandwich or two stacked. The Court treats the assembly as a single overstuffed sandwich with an internal partition; the outer opposing faces govern." },
        ferment: { score: 76, vote: "SANDWICH", opinion: "The most recognized sandwich on the planet, ordered by the billion as exactly that. If lived practice can settle a question, it has settled this one." },
        crumb: { score: 70, vote: "SANDWICH", opinion: "Three buns, special sauce, structural ambition. The gut waves off the middle-bun paradox and digs in. Sandwich, two all-beef patties and all." },
      },
      { headnote: "The Big Mac is a sandwich, its third bun notwithstanding.", holding: "The Court unanimously holds the Big Mac IS a sandwich.", reasoning: "An internal partition does not defeat the governing outer opposing faces; the dish enjoys overwhelming settled classification as a sandwich." },
      Date.UTC(2026, 1, 13)),
    D(44, "Lettuce-Wrap Burger", "NOT A SANDWICH", 31, "3–0", true, [],
      {
        textualis: { score: 6, vote: "NOT A SANDWICH", opinion: "Lettuce is not bread. A patty swaddled in foliage is a salad with delusions of grandeur, not a sandwich. Where there is no starch, the Cube Rule does not even convene." },
        ferment: { score: 46, vote: "NOT A SANDWICH", opinion: "Ordered with the intent of a burger and eaten in its stead, the protein-style preparation aspires to the sandwich form — but aspiration is not membership, and the public knows the difference." },
        crumb: { score: 40, vote: "NOT A SANDWICH", opinion: "A sad burger in a leafy costume. The gut sympathizes with the dieter and still cannot, in conscience, call it a sandwich." },
      },
      { headnote: "A bunless lettuce-wrapped patty is not a sandwich.", holding: "The Court unanimously holds the lettuce-wrap burger is NOT a sandwich.", reasoning: "Leaf is not bread; absent any starch face there is no structure for a sandwich claim to rest upon." },
      Date.UTC(2026, 1, 22)),
    D(45, "Sushi Burrito", "NOT A SANDWICH", 28, "3–0", true, [],
      {
        textualis: { score: 10, vote: "NOT A SANDWICH", opinion: "Rice rolled in nori around a filling is, doubly, not a sandwich: there is neither bread nor opposing faces, only a fusion cylinder of starch and seaweed. The claim fails on every axis the Court possesses." },
        ferment: { score: 38, vote: "NOT A SANDWICH", opinion: "An inventive child of two traditions, yet sold and eaten within neither the sandwich heading; the culture files it under 'roll,' enlarged. I see no sandwich expectation to honor." },
        crumb: { score: 35, vote: "NOT A SANDWICH", opinion: "A burrito that went to Japan. The gut enjoys the trip and reports back: still a roll, still not a sandwich." },
      },
      { headnote: "A sushi burrito is an oversized roll, not a sandwich.", holding: "The Court unanimously holds the sushi burrito is NOT a sandwich.", reasoning: "Rice-and-nori construction supplies neither bread nor opposing faces; the dish falls within the roll family, not the sandwich." },
      Date.UTC(2026, 2, 3)),
    D(46, "Pigs in a Blanket", "NOT A SANDWICH", 37, "3–0", true, [],
      {
        textualis: { score: 24, vote: "NOT A SANDWICH", opinion: "A cocktail sausage rolled in a single sheet of dough is a wrap in miniature. One bread enveloping its contents is not two opposing faces, however charming the party platter." },
        ferment: { score: 40, vote: "NOT A SANDWICH", opinion: "A festive hors d'oeuvre of long standing, passed on trays and never on sandwich menus. The occasion is celebratory; the classification is not sandwich." },
        crumb: { score: 46, vote: "NOT A SANDWICH", opinion: "Tiny, wrapped, delightful, gone in one bite. The gut adores them and shelves them beside the wrap, not the sandwich." },
      },
      { headnote: "Pigs in a blanket are a wrap, not a sandwich.", holding: "The Court unanimously holds pigs in a blanket are NOT a sandwich.", reasoning: "A single sheet of dough enveloping a sausage forms a miniature wrap lacking opposing faces; cultural use confirms the holding." },
      Date.UTC(2026, 2, 12)),
    D(47, "Ravioli", "NOT A SANDWICH", 35, "3–0", true, [],
      {
        textualis: { score: 30, vote: "NOT A SANDWICH", opinion: "A filling sealed between two crimped sheets of pasta and eaten with a fork is, despite the recurring internet jest, a sealed pocket in the manner of the toaster pastry — a pocket, not two breads. The sealed-pastry rule controls." },
        ferment: { score: 28, vote: "NOT A SANDWICH", opinion: "A cornerstone of the Italian table, served in sauce and never ordered as a sandwich. The culture's settled view is plain and I would not disturb it." },
        crumb: { score: 48, vote: "NOT A SANDWICH", opinion: "The meme insists it is the original sandwich, and the gut is briefly charmed — then notes the fork, the bowl, the marinara, and dismisses the appeal." },
      },
      { headnote: "Ravioli is a sealed pasta pocket, not a sandwich.", holding: "The Court unanimously holds ravioli is NOT a sandwich.", reasoning: "A crimped, sealed pocket eaten with utensils lacks two discrete bread faces, consistent with the Court's sealed-pastry precedent." },
      Date.UTC(2026, 2, 21)),
    D(48, "Deep-Fried Butter", "NOT A SANDWICH", 7, "3–0", true, [],
      {
        textualis: { score: 2, vote: "NOT A SANDWICH", opinion: "A battered lump of butter has no bread, no filling distinct from itself, and no structure save surrender to the fryer. The Court can locate no sandwich within it, only consequences." },
        ferment: { score: 8, vote: "NOT A SANDWICH", opinion: "A creature of the state fair midway, never advanced as a sandwich by even its most devoted defenders. There is nothing here for the living constitution to embrace." },
        crumb: { score: 12, vote: "NOT A SANDWICH", opinion: "The gut recoils and quietly admires the audacity. Whatever this is, it is not a sandwich. Possibly a dare." },
      },
      { headnote: "Deep-fried butter is not a sandwich.", holding: "The Court unanimously holds deep-fried butter is NOT a sandwich.", reasoning: "Absent bread, distinct filling, or enclosing structure, no sandwich claim can be sustained." },
      Date.UTC(2026, 2, 30)),
    D(49, "Toast", "NOT A SANDWICH", 21, "3–0", true, [],
      {
        textualis: { score: 14, vote: "NOT A SANDWICH", opinion: "A single slice of bread, browned and unaccompanied, is one face with nothing to enclose and nothing to oppose it. It is bread that has merely grown warm. Half of nothing is still nothing." },
        ferment: { score: 20, vote: "NOT A SANDWICH", opinion: "Breakfast's faithful companion, beloved and bare, but no diner has ever called a naked slice a sandwich. Practice declines." },
        crumb: { score: 30, vote: "NOT A SANDWICH", opinion: "Lonely, crunchy, full of potential. The gut sees a sandwich that gave up halfway and orders it anyway. Not a sandwich, yet." },
      },
      { headnote: "A bare slice of toast is not a sandwich.", holding: "The Court unanimously holds that plain toast is NOT a sandwich.", reasoning: "A single slice with no filling and no opposing face lacks every structural element a sandwich requires." },
      Date.UTC(2026, 3, 8)),
    D(50, "Corn Dog", "NOT A SANDWICH", 43, "2–1", false, ["crumb"],
      {
        textualis: { score: 28, vote: "NOT A SANDWICH", opinion: "A sausage sheathed in a continuous fried batter on a stick is a battered frankfurter, not a sandwich. The coating is one seamless shell, not two opposing breads, and the stick is a confession that the hand needs help." },
        ferment: { score: 44, vote: "NOT A SANDWICH", opinion: "A fairground staple eaten upright by the millions, yet ordered as a corn dog and never as a sandwich. The culture has its own proud heading for it." },
        crumb: { score: 56, vote: "SANDWICH", opinion: "Cornbread all the way around the dog, hand-held by design. The gut, ever contrarian, finds this more honest than the hot dog and would call it a sandwich-on-a-stick. I dissent, mustard in hand." },
      },
      { headnote: "A corn dog is a battered sausage, not a sandwich.", holding: "The Court holds, 2–1, that the corn dog is NOT a sandwich.", reasoning: "A seamless fried coating is a single shell rather than two opposing faces; Justice Crumb, dissenting, would have recognized the fully-enclosing cornbread as sandwich-like." },
      Date.UTC(2026, 3, 17)),
    D(51, "Uncrustable", "SANDWICH", 62, "2–1", false, ["textualis"],
      {
        textualis: { score: 46, vote: "NOT A SANDWICH", opinion: "A peanut-butter-and-jelly filling sealed within a crimped, crustless dough disc troubles me: the crimp seals the perimeter into something pocket-like. Two bread faces are present, but the seal pushes it toward the pastry family. I respectfully dissent." },
        ferment: { score: 72, vote: "SANDWICH", opinion: "It is a PB&J — the most American sandwich there is — with its crusts surgically removed and its edges pinched for transport. Stripping the crust does not strip the sandwich-hood." },
        crumb: { score: 68, vote: "SANDWICH", opinion: "A round, sealed PB&J that skips the knife. The gut tastes a sandwich, crimped edges and all, and votes accordingly." },
      },
      { headnote: "The crimped, crustless Uncrustable is a sandwich.", holding: "The Court holds, 2–1, that the Uncrustable IS a sandwich.", reasoning: "The majority held that a sealed perimeter and removed crust do not defeat a recognizable two-bread PB&J; Justice Textualis, dissenting, deemed the crimp to push it into the sealed-pastry family." },
      Date.UTC(2026, 3, 26)),
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
