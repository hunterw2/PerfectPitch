"use strict";
(() => {
var exports = {};
exports.id = 645;
exports.ids = [645];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 7070:
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

// NAMESPACE OBJECT: ./app/api/score/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
;// CONCATENATED MODULE: ./app/api/score/route.ts

const RUBRIC = `
You are the grader of a sales roleplay transcript between a salesperson ("you") and a buyer ("doc").
Return a strict JSON object with keys: score (0..10, number with 1 decimal), wentWell (string), improve (string), nextTime (string).

Scoring guidance (tailor to difficulty):
- Open Strong (2): concise intro, agenda, relevance to persona.
- Discovery (3): at least one good question + one follow-up tied to persona.
- Positioning/Value (3): translates features to value for the buyer's context (ROI for B2B/D2D; clinical/outcomes for Pharma).
- Next Step (2): closes for a sensible next step (trial, meeting, script, follow-up).

Difficulty bias:
- easy: be generous; accept short but correct answers; minor gaps OK.
- medium: standard rigor.
- hard: strict; push when value/close are weak.

Persona/vertical notes:
- Pharma: no ROI; clinical efficacy, safety, access logistics. If buyer asked coverage/PA and rep answered, don't keep penalizing repeats.
- B2B/D2D: ROI/value fine; no drug insurance topics.

Keep feedback crisp, bullet-style sentences in one paragraph each (no bullets in the JSON).
`;
async function POST(req) {
    try {
        const { scenario, transcript } = await req.json();
        const openaiKey = process.env.OPENAI_API_KEY;
        if (!openaiKey) {
            return next_response/* default */.Z.json({
                error: "Missing OPENAI_API_KEY"
            }, {
                status: 500
            });
        }
        const body = {
            model: "gpt-4o-mini",
            response_format: {
                type: "json_object"
            },
            messages: [
                {
                    role: "system",
                    content: RUBRIC.trim()
                },
                {
                    role: "user",
                    content: `Scenario:\n${JSON.stringify(scenario, null, 2)}\n\nTranscript (array of {who,text}):\n${JSON.stringify(transcript, null, 2)}\n\nReturn ONLY the JSON object.`
                }
            ],
            temperature: 0.2
        };
        const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openaiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const raw = await apiRes.text();
        if (!apiRes.ok) {
            return next_response/* default */.Z.json({
                error: `OpenAI ${apiRes.status}: ${raw}`
            }, {
                status: 500
            });
        }
        // Guaranteed JSON via response_format
        let data;
        try {
            data = JSON.parse(JSON.parse(raw).choices?.[0]?.message?.content || "{}");
        } catch  {
            data = {};
        }
        // Defensive defaults so UI never shows blanks
        const score = typeof data.score === "number" ? data.score : 0.0;
        const wentWell = data.wentWell || "You asked relevant questions and kept momentum.";
        const improve = data.improve || "Tie benefits to the persona and ask one deeper follow-up.";
        const nextTime = data.nextTime || "State a clear next step and confirm agreement.";
        return next_response/* default */.Z.json({
            score,
            wentWell,
            improve,
            nextTime
        });
    } catch (e) {
        return next_response/* default */.Z.json({
            error: e?.message || "Server error"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fscore%2Froute&name=app%2Fapi%2Fscore%2Froute&pagePath=private-next-app-dir%2Fapi%2Fscore%2Froute.ts&appDir=%2FUsers%2Fhunterwilson%2Fprojects%2Fdoctor-sim%2Fapp&appPaths=%2Fapi%2Fscore%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/score/route",
        pathname: "/api/score",
        filename: "route",
        bundlePath: "app/api/score/route"
    },
    resolvedPagePath: "/Users/hunterwilson/projects/doctor-sim/app/api/score/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/score/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501,335], () => (__webpack_exec__(7070)));
module.exports = __webpack_exports__;

})();