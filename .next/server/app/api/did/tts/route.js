"use strict";
(() => {
var exports = {};
exports.id = 580;
exports.ids = [580];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 3063:
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

// NAMESPACE OBJECT: ./app/api/did/tts/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST),
  dynamic: () => (dynamic),
  runtime: () => (runtime)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
;// CONCATENATED MODULE: ./app/api/did/tts/route.ts
// app/api/did/tts/route.ts
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function POST(req) {
    try {
        const DID_API_KEY = process.env.DID_API_KEY;
        if (!DID_API_KEY) {
            return new Response(JSON.stringify({
                error: "Missing DID_API_KEY in .env.local"
            }), {
                status: 500,
                headers: {
                    "content-type": "application/json"
                }
            });
        }
        const { text, voice_id } = await req.json();
        if (!text || typeof text !== "string") {
            return new Response(JSON.stringify({
                error: "text is required"
            }), {
                status: 400,
                headers: {
                    "content-type": "application/json"
                }
            });
        }
        // Optional: allow caller to pick a D-ID voice; fallback to your env default
        const voice = voice_id || process.env.DID_VOICE_ID || "en-US-Journey-D";
        // --- D-ID TTS call ---
        // This uses D-ID’s TTS endpoint that returns audio/mpeg (MP3).
        // If your account uses a slightly different path, just update `ttsUrl`.
        const ttsUrl = `https://api.d-id.com/v1/tts`;
        const upstream = await fetch(ttsUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${Buffer.from(DID_API_KEY + ":").toString("base64")}`,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            },
            body: JSON.stringify({
                text,
                voice_id: voice
            })
        });
        if (!upstream.ok) {
            const err = await safeText(upstream);
            return new Response(JSON.stringify({
                error: "D-ID TTS failed",
                details: err
            }), {
                status: 502,
                headers: {
                    "content-type": "application/json"
                }
            });
        }
        // Stream raw MP3 bytes back to the browser
        const arrayBuf = await upstream.arrayBuffer();
        return new Response(Buffer.from(arrayBuf), {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Cache-Control": "no-store"
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({
            error: "Proxy error",
            details: e?.message || String(e)
        }), {
            status: 500,
            headers: {
                "content-type": "application/json"
            }
        });
    }
}
async function safeText(res) {
    try {
        return await res.text();
    } catch  {
        return "<no error body>";
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fdid%2Ftts%2Froute&name=app%2Fapi%2Fdid%2Ftts%2Froute&pagePath=private-next-app-dir%2Fapi%2Fdid%2Ftts%2Froute.ts&appDir=%2FUsers%2Fhunterwilson%2Fprojects%2Fdoctor-sim%2Fapp&appPaths=%2Fapi%2Fdid%2Ftts%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/did/tts/route",
        pathname: "/api/did/tts",
        filename: "route",
        bundlePath: "app/api/did/tts/route"
    },
    resolvedPagePath: "/Users/hunterwilson/projects/doctor-sim/app/api/did/tts/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/did/tts/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501], () => (__webpack_exec__(3063)));
module.exports = __webpack_exports__;

})();