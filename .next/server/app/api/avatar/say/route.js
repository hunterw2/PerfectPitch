"use strict";
(() => {
var exports = {};
exports.id = 858;
exports.ids = [858];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 152:
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

// NAMESPACE OBJECT: ./app/api/avatar/say/route.ts
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
;// CONCATENATED MODULE: ./app/api/avatar/say/route.ts

const DID_API = "https://api.d-id.com/v1/talks";
async function POST(req) {
    try {
        const { gender = "male", text = "", tone = "matter-of-fact" } = await req.json();
        if (!process.env.DID_API_KEY) {
            return next_response/* default */.Z.json({
                error: "Missing DID_API_KEY"
            }, {
                status: 500
            });
        }
        const avatarUrl = gender === "female" ? "https://create-images.d-id.com/DefaultPresenters/Female-1.png" : "https://create-images.d-id.com/DefaultPresenters/Male-1.png";
        // 1) create the talk
        const create = await fetch(DID_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // D-ID uses Basic with the key itself
                Authorization: `Basic ${process.env.DID_API_KEY}`
            },
            body: JSON.stringify({
                source_url: avatarUrl,
                // simple text script; you can pass SSML if you’d like
                script: {
                    type: "text",
                    input: text
                },
                // optional: nudge speaking style from your tone
                config: {
                    stitch: true
                }
            })
        });
        const created = await create.json();
        if (!create.ok) {
            return next_response/* default */.Z.json({
                error: created?.error || "D-ID create failed"
            }, {
                status: 500
            });
        }
        const id = created?.id;
        if (!id) return next_response/* default */.Z.json({
            error: "No id from D-ID"
        }, {
            status: 500
        });
        // 2) poll until ready
        let url = "";
        for(let i = 0; i < 25; i++){
            await new Promise((r)=>setTimeout(r, 900));
            const statusRes = await fetch(`${DID_API}/${id}`, {
                headers: {
                    Authorization: `Basic ${process.env.DID_API_KEY}`
                }
            });
            const status = await statusRes.json();
            if (status?.status === "done") {
                // different SDKs expose slightly different fields; cover common ones
                url = status.result_url || status.result?.url || status.output_url || status?.urls?.[0] || "";
                break;
            }
            if (status?.status === "error") {
                return next_response/* default */.Z.json({
                    error: status?.error || "Generation error"
                }, {
                    status: 500
                });
            }
        }
        if (!url) return next_response/* default */.Z.json({
            error: "Timed out waiting for video"
        }, {
            status: 504
        });
        return next_response/* default */.Z.json({
            url
        });
    } catch (e) {
        return next_response/* default */.Z.json({
            error: e?.message || "Avatar error"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Favatar%2Fsay%2Froute&name=app%2Fapi%2Favatar%2Fsay%2Froute&pagePath=private-next-app-dir%2Fapi%2Favatar%2Fsay%2Froute.ts&appDir=%2FUsers%2Fhunterwilson%2Fprojects%2Fdoctor-sim%2Fapp&appPaths=%2Fapi%2Favatar%2Fsay%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/avatar/say/route",
        pathname: "/api/avatar/say",
        filename: "route",
        bundlePath: "app/api/avatar/say/route"
    },
    resolvedPagePath: "/Users/hunterwilson/projects/doctor-sim/app/api/avatar/say/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/avatar/say/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,501,335], () => (__webpack_exec__(152)));
module.exports = __webpack_exports__;

})();