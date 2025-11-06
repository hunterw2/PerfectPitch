"use strict";
(() => {
var exports = {};
exports.id = 457;
exports.ids = [457];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 2263:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/doctor/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST),
  dynamic: () => (dynamic),
  revalidate: () => (revalidate)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
;// CONCATENATED MODULE: ./app/api/doctor/route.ts
// app/api/score/route.ts

const dynamic = "force-dynamic"; // ⛔️ disable route caching
const revalidate = 0;
function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
}
function safeNum(n, fallback = 0) {
    const v = Number(n);
    return Number.isFinite(v) ? v : fallback;
}
// Simple text helpers
const qmark = /\?/g;
const closeCues = /\b(let'?s|lets)\s+(get\s+started|set|book|schedule|kick\s*off|trial|pilot)|\bstart\s+(a|the)\b|\bgo\s+ahead\b|\bnext\s+step\b/i;
const empathyCues = /\b(totally|understand|makes sense|fair|got it|see why|good call|that helps)\b/i;
const valueCues = /\b(value|outcome|results?|impact|roi|benefit|faster|reduce|increase|improve)\b/i;
// Offline heuristic scoring (varies per transcript)
function heuristicScore(messages, scenario) {
    const turns = messages.length;
    const repLines = messages.filter((m)=>m.who === "you");
    const docLines = messages.filter((m)=>m.who === "doc");
    const repText = repLines.map((l)=>l.text).join(" ");
    const docText = docLines.map((l)=>l.text).join(" ");
    const allText = messages.map((m)=>m.text).join(" ");
    const repQs = (repText.match(qmark) || []).length;
    const docQs = (docText.match(qmark) || []).length;
    const askedClose = closeCues.test(repText);
    const showedEmpathy = empathyCues.test(allText);
    const showedValue = valueCues.test(repText);
    // very light objection detection
    const objection = /(price|expensive|budget|time|busy|coverage|insurance|prior\s*auth|risk|not\s*interested|send\s+info)/i;
    const objectionCount = messages.filter((m)=>m.who === "doc" && objection.test(m.text)).length;
    // Baseline by difficulty (harder = slightly stricter)
    const diffPenalty = scenario.difficulty === "hard" ? 0.6 : scenario.difficulty === "medium" ? 0.3 : 0;
    // Build score from components
    let s = 5;
    // Discovery (2 pts)
    s += clamp(repQs * 0.35, 0, 2);
    // Handling / balance (1.5 pts) — reward back-and-forth
    const balance = repLines.length / Math.max(1, turns);
    s += clamp(1.5 - Math.abs(balance - 0.5) * 3, 0, 1.5);
    // Empathy (1 pt)
    if (showedEmpathy) s += 0.7 + Math.random() * 0.3;
    // Value framing (1.5 pt)
    if (showedValue) s += 1.0 + Math.random() * 0.5;
    // Objection tax (up to -1.2)
    s -= clamp(objectionCount * 0.4, 0, 1.2);
    // Closing (up to +2)
    if (askedClose) s += 1.2 + Math.random() * 0.8;
    // Difficulty penalty
    s -= diffPenalty;
    // Small jitter so similar calls aren’t identical (±0.25)
    s += (Math.random() - 0.5) * 0.5;
    s = clamp(s, 0, 10);
    // Notes (dynamic)
    const goods = [];
    const improves = [];
    const nexts = [];
    if (repQs >= 2) goods.push("Strong discovery questions tailored to the buyer.");
    else improves.push("Ask 2–3 tighter discovery questions to uncover specifics.");
    if (showedEmpathy) goods.push("Good acknowledgment and pace—felt collaborative.");
    else improves.push("Briefly acknowledge their point before advancing the convo.");
    if (showedValue) goods.push("Value framed around outcomes, not features.");
    else improves.push("Translate features into outcomes (“so that you can…”).");
    if (askedClose) goods.push("Confident close with a clear next step.");
    else nexts.push("Propose a crisp next step with a time (“Tue 10:15 or 2:10?”).");
    if (scenario.vertical !== "pharma") {
        // non-pharma line variety
        nexts.push("Confirm who else should join the follow-up and set an agenda.");
    } else {
        nexts.push("Confirm start criteria (patient profile & workflow) and timebox.");
    }
    return {
        score: Math.round(s * 10) / 10,
        wentWell: goods.join(" "),
        improve: improves.join(" "),
        next: nexts.join(" ")
    };
}
async function POST(req) {
    try {
        const body = await req.json();
        const scenario = body?.scenario;
        const messages = body?.messages || [];
        // Construct a transcript if needed (LLM branch)
        let transcript = (body?.transcript || "").toString().trim();
        if (!transcript && messages.length) {
            transcript = messages.map((m)=>`${m.who === "you" ? "Rep" : "Buyer"}: ${m.text}`).join("\n");
        }
        // If no transcript at all, safe default (but still varied)
        if (!transcript) {
            const h = heuristicScore(messages, scenario);
            return next_response/* default */.Z.json(h, {
                headers: {
                    "Cache-Control": "no-store"
                }
            });
        }
        const apiKey = process.env.OPENAI_API_KEY;
        // ============ ONLINE (LLM) BRANCH ============
        if (apiKey) {
            // You can keep your existing LLM call here.
            // Below is a very compact OpenAI call pattern—replace with your client if you prefer.
            // --- Simple fetch to OpenAI responses API (or your preferred SDK) ---
            const prompt = `
Score this sales call on a 0-10 scale with one decimal. Return JSON with keys: score, wentWell, improve, next.
Be brief, specific, and avoid generic phrasing. Use the transcript below.

TRANSCRIPT:
${transcript}
      `.trim();
            // If you use the OpenAI SDK, swap this fetch for client.responses.create.
            const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are a concise sales call grader. Respond ONLY with valid JSON."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.2
                })
            });
            if (openaiRes.ok) {
                const data = await openaiRes.json();
                const raw = data.choices?.[0]?.message?.content || "{}";
                let parsed;
                try {
                    parsed = JSON.parse(raw);
                } catch  {
                    // fallback parse: extract numbers and strings if model added text
                    parsed = heuristicScore(messages, scenario);
                }
                const out = {
                    score: clamp(safeNum(parsed?.score, heuristicScore(messages, scenario).score), 0, 10),
                    wentWell: String(parsed?.wentWell || "").trim() || heuristicScore(messages, scenario).wentWell,
                    improve: String(parsed?.improve || "").trim() || heuristicScore(messages, scenario).improve,
                    next: String(parsed?.next || "").trim() || heuristicScore(messages, scenario).next
                };
                // ensure 0.1 precision
                out.score = Math.round(out.score * 10) / 10;
                return next_response/* default */.Z.json(out, {
                    headers: {
                        "Cache-Control": "no-store"
                    }
                });
            }
        // If OpenAI call failed, fall through to heuristic
        }
        // ============ OFFLINE / FALLBACK BRANCH ============
        const h = heuristicScore(messages, scenario);
        return next_response/* default */.Z.json(h, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (e) {
        // Hard fail-safe
        return next_response/* default */.Z.json({
            score: 6.5,
            wentWell: "Clear opener and natural pacing.",
            improve: "Ask 2–3 targeted discovery questions.",
            next: "Propose a crisp time for the next step."
        }, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fdoctor%2Froute&name=app%2Fapi%2Fdoctor%2Froute&pagePath=private-next-app-dir%2Fapi%2Fdoctor%2Froute.ts&appDir=%2FUsers%2Fhunterwilson%2Fprojects%2Fdoctor-sim%2Fapp&appPaths=%2Fapi%2Fdoctor%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/doctor/route",
        pathname: "/api/doctor",
        filename: "route",
        bundlePath: "app/api/doctor/route"
    },
    resolvedPagePath: "/Users/hunterwilson/projects/doctor-sim/app/api/doctor/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/doctor/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501,335], () => (__webpack_exec__(2263)));
module.exports = __webpack_exports__;

})();