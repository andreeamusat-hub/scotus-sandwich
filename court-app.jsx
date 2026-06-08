/* global React, ReactDOM, Court */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------------- Seal ---------------- */
function Seal({ id, className, opts }) {
  const html = Court.seal(id, opts || {});
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------------- small icons ---------------- */
const IconGavel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 13l-7.8 7.8a1.7 1.7 0 0 1-2.4-2.4L11.6 10.6" /><path d="M9.5 8.5l6 6" /><path d="M13 4l7 7" /><path d="M16.5 3.5l4 4" /><path d="M11.5 6.5l6 6" /><path d="M5 21h8" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
);

/* ---------------- helpers ---------------- */
const cls = (...a) => a.filter(Boolean).join(" ");

function orderOpinions(record) {
  // returns [{key, role:'majority'|'lead'|'dissent', ...op}]
  const keys = Object.keys(record.opinions);
  const verdict = record.verdict;
  const ops = keys.map((k) => ({ ...record.opinions[k], key: k }));
  const majority = ops.filter((o) => o.vote === verdict);
  const dissent = ops.filter((o) => o.vote !== verdict);
  // lead = most confident on majority side
  majority.sort((a, b) =>
    verdict === "SANDWICH" ? b.score - a.score : a.score - b.score
  );
  const out = [];
  majority.forEach((o, i) => out.push({ ...o, role: i === 0 ? "lead" : "concur" }));
  dissent.forEach((o) => out.push({ ...o, role: "dissent" }));
  return out;
}

/* ---------------- Justice card (live bench) ---------------- */
function JusticeCard({ justice, op, idx }) {
  const resolved = !!op;
  return (
    <div className={cls("justice-card", "entering", resolved && "resolved")} style={{ animationDelay: idx * 60 + "ms" }}>
      <div className="justice-head">
        <span className="justice-portrait" dangerouslySetInnerHTML={{ __html: justice.portrait }} />
        <div className="justice-meta">
          <div className="role">{justice.role}</div>
          <div className="jname">{justice.name}</div>
          <div className="philo">{justice.philosophy}</div>
        </div>
      </div>
      <div className="justice-body">
        {resolved ? (
          <div className="opinion-text">{op.opinion}</div>
        ) : (
          <div className="opinion-text placeholder">Deliberating upon the record…</div>
        )}
        <div className="justice-foot">
          {resolved ? (
            <>
              <div className="score-block">
                <span className="score-num">{op.score}</span>
                <span className="score-den">/ 100</span>
              </div>
              <span className={cls("vote-stamp", op.vote === "SANDWICH" ? "yes" : "no")}>
                {op.vote === "SANDWICH" ? "Sandwich" : "Not a sandwich"}
              </span>
            </>
          ) : (
            <div className="thinking-dots"><i /><i /><i /></div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- The Ruling document ---------------- */
function RulingDoc({ record }) {
  const ordered = orderOpinions(record);
  const isSandwich = record.verdict === "SANDWICH";
  const precDocket = record.precedent ? Court.docketStr(record.precedent.docket) : null;
  return (
    <div className="ruling-doc">
      <div className="ruling-watermark"><Seal id={"wm-" + record.docket} opts={{ text: false }} /></div>
      <div className="ruling-inner">
        <div className="ruling-caption">
          <div className="court-line">Supreme Court of the Sandwich Affairs</div>
          <div className="docket-line">Docket {record.docketStr} &nbsp;·&nbsp; October Term</div>
          <h2 className="case-title">In re {record.food}</h2>
          <div className="decided">[ Decided {Court.fmtDate(record.ts)} ]</div>
        </div>

        <div className="verdict-band">
          <div className={cls("verdict-stamp", isSandwich ? "sandwich" : "not")}>
            {isSandwich ? "Sandwich" : "Not a Sandwich"}
          </div>
          <div className="verdict-divider" />
          <div className="cindex">
            <div className="label">Constitutionality Index</div>
            <div className="gauge"><i style={{ width: record.index + "%" }} /></div>
            <div className="val">{record.index}<small> / 100</small></div>
          </div>
        </div>

        <div className="flag-badges">
          {record.unanimous ? (
            <span className="flag unanimous">★ Unanimous Court</span>
          ) : (
            <span className="flag split">Decided {record.split}</span>
          )}
          {record.precedent && (
            <span className="flag precedent">Cites In re {record.precedent.food} · {precDocket}</span>
          )}
        </div>

        <div className="doc-section">
          <div className="sec-label">Syllabus</div>
          <p className="headnote">{record.syllabus.headnote}</p>
          <div className="syll-block">
            <div className="h">Held</div>
            <div className="t">{record.syllabus.holding}</div>
          </div>
          <div className="syll-block">
            <div className="h">Reasoning of the Court</div>
            <div className="t">{record.syllabus.reasoning}</div>
          </div>
          {record.precedent && (
            <div className="precedent-cite">
              <IconGavelMini />
              <div>
                The Court consulted its own record and ruled consistent with{" "}
                <span className="cite-link">In re {record.precedent.food}, {precDocket}</span> (held {record.precedent.verdict}).
              </div>
            </div>
          )}
        </div>

        <div className="doc-section">
          <div className="sec-label">Opinions of the Court</div>
          {ordered.map((o) => {
            const j = Court.byKey[o.key];
            const roleText =
              o.role === "lead"
                ? `delivered the opinion of ${record.unanimous ? "a unanimous Court" : "the Court"}`
                : o.role === "concur"
                ? "concurring"
                : "dissenting";
            return (
              <div key={o.key} className={cls("opinion-entry", o.role === "dissent" && "dissent")}>
                <div className="deliverer">
                  <b>{j.name}</b>, <em>{roleText}</em>
                  {o.role === "dissent" && <span className="dissent-tag">Dissent</span>}
                </div>
                <div className="op-body">{o.opinion}</div>
                <div className="op-score">Sandwich-ness, in the Justice's estimation — {o.score} / 100.</div>
              </div>
            );
          })}
        </div>

        <div className="ruling-foot">
          <div className="filed-note">
            <span>Filed with the Clerk · {record.docketStr} · binding precedent</span>
          </div>
          <Seal id={"emboss-" + record.docket} className="seal-emboss" opts={{ ring: "#5C1A1E", brass: "#7A262C" }} />
        </div>
      </div>
    </div>
  );
}
const IconGavelMini = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C1A1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 1 }}>
    <path d="M14 13l-7.8 7.8a1.7 1.7 0 0 1-2.4-2.4L11.6 10.6" /><path d="M13 4l7 7" /><path d="M5 21h8" />
  </svg>
);

/* ---------------- Mistrial ---------------- */
function Mistrial({ food, reason, onAgain }) {
  const line =
    reason === "clerk"
      ? "The Clerk of the Court has been unable to engross the syllabus, and the Court declines to publish a ruling it cannot properly record."
      : "The bench failed to reach quorum; one or more Justices could not be raised from chambers.";
  return (
    <div className="mistrial-doc">
      <div className="stamp">Mistrial</div>
      <p>
        In the matter of <em style={{ fontStyle: "italic" }}>In re {food}</em>, the Court declares a mistrial. {line} No precedent is set. The petitioner may move the Court to reconvene.
      </p>
      <div className="again">
        <button className="btn-ghost primary" onClick={onAgain}>Move to reconvene</button>
      </div>
    </div>
  );
}

/* ---------------- Bench (main flow) ---------------- */
const SUGGESTIONS = ["Hot dog", "Sushi", "Taco", "Ice cream sandwich", "Calzone", "Cereal", "Wrap", "Burger"];
const PHASE_TEXT = {
  precedent: "Consulting the record for governing precedent…",
  deliberation: "The Justices have retired to deliberate…",
  clerk: "The Clerk of the Court is engrossing the syllabus…",
  filing: "Entering judgment upon the docket…",
};

function BenchView({ goArchive }) {
  const [food, setFood] = useState("");
  const [phase, setPhase] = useState(null); // null | precedent | deliberation | clerk | filing | ruling | mistrial
  const [ops, setOps] = useState({});
  const [result, setResult] = useState(null);
  const [mistrial, setMistrial] = useState(null);
  const rulingRef = useRef(null);

  const busy = phase && phase !== "ruling" && phase !== "mistrial";

  const convene = useCallback(async (term) => {
    const q = (term ?? food).trim();
    if (!q || busy) return;
    setOps({});
    setResult(null);
    setMistrial(null);
    setPhase("precedent");
    try {
      const res = await Court.convene(q, {
        onPhase: (p) => { if (p !== "done") setPhase(p); },
        onJustice: (op) => setOps((prev) => ({ ...prev, [op.key]: op })),
      });
      if (res.mistrial) {
        setMistrial({ food: q, reason: res.reason });
        setPhase("mistrial");
      } else {
        setResult(res.record);
        setPhase("ruling");
      }
    } catch (e) {
      setMistrial({ food: q, reason: "bench" });
      setPhase("mistrial");
    }
  }, [food, busy]);

  useEffect(() => {
    if ((phase === "ruling" || phase === "mistrial") && rulingRef.current) {
      const y = rulingRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [phase]);

  const showBench = phase && phase !== "mistrial";

  return (
    <div className="page-frame">
      <section className="bench-hero">
        <Seal id="hero-seal" className="big-seal" />
        <div className="eyebrow-mono">Est. MXXIV · Sitting en banc</div>
        <h1>Is it, in fact, a sandwich?</h1>
        <p className="dek">
          The Supreme Court of Sandwich Affairs sits to render <em>binding</em> constitutional judgment upon the sandwich-ness of any food item brought before it. Submit your petition. The Court will convene.
        </p>
      </section>

      <section className="petition">
        <div className="petition-head">
          <span className="docket-chip">Petition for a Writ of Certiorari</span>
          <span className="ph-title">No. ____, this Term</span>
        </div>
        <div className="petition-body">
          <label htmlFor="food">The food item presently before the Court</label>
          <div className="petition-row">
            <input
              id="food"
              className="food-input"
              type="text"
              autoComplete="off"
              placeholder="e.g. a hot dog…"
              value={food}
              disabled={busy}
              onChange={(e) => setFood(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") convene(); }}
            />
            <button className="btn-convene" onClick={() => convene()} disabled={busy || !food.trim()}>
              {busy ? <><span className="spin" style={{ display: "inline-flex" }}><IconGavel /></span> In session…</> : <><IconGavel /> Convene the Court</>}
            </button>
          </div>
          <div className="docket-suggest">
            <span className="lbl">On the docket:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chip-food" disabled={busy} onClick={() => { setFood(s); convene(s); }}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      {showBench && (
        <section className="deliberation">
          <div className="delib-banner">
            {phase === "ruling" ? "Judgment entered — the Court has spoken" : (PHASE_TEXT[phase] || "")}
          </div>
          <div className="bench-row">
            {Court.JUSTICES.map((j, i) => (
              <JusticeCard key={j.key} justice={j} op={ops[j.key]} idx={i} />
            ))}
          </div>
        </section>
      )}

      {phase === "ruling" && result && (
        <section className="ruling" ref={rulingRef}>
          <RulingDoc record={result} />
          <div className="ruling-actions">
            <button className="btn-ghost primary" onClick={() => { setPhase(null); setOps({}); setResult(null); setFood(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Convene on a new matter</button>
            <button className="btn-ghost" onClick={goArchive}>View the Body of Case Law →</button>
          </div>
        </section>
      )}

      {phase === "mistrial" && mistrial && (
        <section ref={rulingRef}>
          <Mistrial food={mistrial.food} reason={mistrial.reason} onAgain={() => convene(mistrial.food)} />
        </section>
      )}
    </div>
  );
}

/* ---------------- Archive (Body of Case Law) ---------------- */
function CaseRow({ c, onOpen }) {
  const isSandwich = c.verdict === "SANDWICH";
  return (
    <div className="case-row" onClick={() => onOpen(c)}>
      <div className="case-row-head">
        <span className="docket">{c.docketStr}</span>
        <span className="ctitle">In re {c.food}</span>
        {c.unanimous && <span className="uflag">Unanimous</span>}
        <span className="cidx">{c.index}<small>/100</small></span>
        <span className={cls("cverdict", isSandwich ? "sandwich" : "not")}>{isSandwich ? "Sandwich" : "Not"}</span>
        <span className="cdate">{Court.fmtDate(c.ts)}</span>
      </div>
    </div>
  );
}

function ArchiveView() {
  const [cases, setCases] = useState(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    Court.loadCases().then(setCases);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const filtered = (cases || []).filter((c) =>
    !query.trim() || c.food.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="page-frame">
      <section className="archive-hero">
        <div className="eyebrow-mono">Reports of the Court</div>
        <h1>The Body of Case Law</h1>
        <p className="dek">Every ruling the Court has entered, newest first, binding upon all who eat. Each was filed by a petitioner and now governs the question for all time, or until overruled.</p>
        <div className="archive-tools">
          <div className="search-wrap">
            <IconSearch />
            <input className="search-input" placeholder="Search the reports by food…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <span className="archive-count">{cases === null ? "Loading…" : `${filtered.length} of ${cases.length} rulings`}</span>
        </div>
      </section>

      {cases === null ? (
        <div className="empty-archive"><p>Opening the record…</p></div>
      ) : filtered.length === 0 ? (
        <div className="empty-archive">
          <Seal id="empty-seal" className="seal-faint" opts={{ text: false }} />
          <p>{query ? "No ruling on that matter. The question remains open — convene the Court." : "The record is empty."}</p>
        </div>
      ) : (
        <div className="case-list">
          {filtered.map((c) => <CaseRow key={c.docket} c={c} onOpen={setOpen} />)}
        </div>
      )}

      {open && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setOpen(null)}>Close ✕</button>
            <RulingDoc record={open} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- App shell ---------------- */
function App() {
  const [view, setView] = useState("bench");
  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <Seal id="mast-seal" className="seal-wrap" opts={{ text: false }} />
          <div className="masthead-titles">
            <div className="court-name">Supreme Court of Sandwich Affairs</div>
            <div className="court-sub">In Pane Veritas · Established for the Common Lunch</div>
          </div>
          <nav className="masthead-nav">
            <button className={cls("navtab", view === "bench" && "active")} onClick={() => setView("bench")}>The Bench</button>
            <button className={cls("navtab", view === "archive" && "active")} onClick={() => setView("archive")}>Body of Case Law</button>
          </nav>
        </div>
      </header>

      {view === "bench" ? <BenchView goArchive={() => { setView("archive"); window.scrollTo({ top: 0 }); }} /> : <ArchiveView />}

      <footer className="site-foot">
        <div className="motto">In Pane Veritas — In Bread, Truth.</div>
        <div className="fine">The Supreme Court of Sandwich Affairs · rulings are binding, shared, and gloriously non-appealable.</div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
