"use strict";
(() => {
var exports = {};
exports.id = 201;
exports.ids = [201];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 2178:
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

// NAMESPACE OBJECT: ./app/api/did/talk/route.ts
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
;// CONCATENATED MODULE: ./app/api/did/talk/route.ts

async function POST(req) {
    try {
        const { text, imageUrl, voiceId } = await req.json();
        const apiKey = process.env.DID_API_KEY;
        if (!apiKey) {
            return next_response/* default */.Z.json({
                error: "Missing DID_API_KEY"
            }, {
                status: 500
            });
        }
        // Create the D-ID "talk" job
        const body = {
            source_url: imageUrl,
            script: {
                type: "text",
                input: text,
                provider: {
                    type: "microsoft",
                    voice_id: voiceId || process.env.DID_VOICE_ID || "en-US-Journey-D"
                }
            },
            config: {
                stitch: true,
                driver_expressions: {
                    expressions: [
                        {
                            expression: "neutral",
                            start_time: 0,
                            intensity: 0.2
                        }
                    ]
                }
            }
        };
        const talkResp = await fetch("https://api.d-id.com/talks", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const talkData = await talkResp.json();
        if (!talkResp.ok) {
            return next_response/* default */.Z.json({
                error: talkData.error || "D-ID talk creation failed"
            }, {
                status: talkResp.status
            });
        }
        return next_response/* default */.Z.json({
            id: talkData.id
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            error: err.message || "Server error"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fdid%2Ftalk%2Froute&name=app%2Fapi%2Fdid%2Ftalk%2Froute&pagePath=private-next-app-dir%2Fapi%2Fdid%2Ftalk%2Froute.ts&appDir=%2FUsers%2Fhunterwilson%2Fprojects%2Fdoctor-sim%2Fapp&appPaths=%2Fapi%2Fdid%2Ftalk%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/did/talk/route",
        pathname: "/api/did/talk",
        filename: "route",
        bundlePath: "app/api/did/talk/route"
    },
    resolvedPagePath: "/Users/hunterwilson/projects/doctor-sim/app/api/did/talk/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/did/talk/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501,335], () => (__webpack_exec__(2178)));
module.exports = __webpack_exports__;

})();