(() => {
var exports = {};
exports.id = 979;
exports.ids = [979];
exports.modules = {

/***/ 8038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 8704:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 7897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 1844:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 6624:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 5281:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 7085:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 199:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 9569:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 893:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 7887:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 8735:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 8231:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 4614:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 3750:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 9618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 1646:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7262);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9513);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1823);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2502);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2838)), "/Users/hunterwilson/projects/doctor-sim/app/page.tsx"],
          
        }]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 1921)), "/Users/hunterwilson/projects/doctor-sim/app/layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 5493, 23)), "next/dist/client/components/not-found-error"],
        
      }
      ]
      }.children;
const pages = ["/Users/hunterwilson/projects/doctor-sim/app/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 2522:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4802))

/***/ }),

/***/ 1119:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 1232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 4282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6505, 23))

/***/ }),

/***/ 5303:
/***/ (() => {



/***/ }),

/***/ 4802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

/* =========================
   UI helpers
========================= */ const difficultyTint = {
    easy: "rgba(56,189,248,.25)",
    medium: "rgba(250,204,21,.25)",
    hard: "rgba(248,113,113,.25)"
};
const bubbleTint = {
    you: "#3b82f6",
    doc: "#475569"
};
const roleLabel = (v)=>v === "pharma" ? "Provider" : "Prospect";
/* =========================
   Small helpers
========================= */ function bulletify(s) {
    if (!s) return [];
    // Split on newlines, bullets, or sentence breaks; keep it simple and robust
    const parts = s.split(/\n|•|-\s|;\s|\. (?=[A-Z(])/g).map((t)=>t.trim().replace(/^[•-\s]+/, "")).filter(Boolean);
    return parts.length ? parts : [
        s
    ];
}
/* =========================
   Avatar (SVG with visemes + blink)
========================= */ function clamp01(n) {
    return Math.max(0, Math.min(1, n));
}
function MaleAvatar({ thinking, blink, viseme }) {
    const mouthOpen = 6 + 10 * clamp01(viseme); // 6..16
    const browLift = 0 + 3 * clamp01(viseme); // 0..3
    const eyeRY = blink ? 1 : 7; // quick blink
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        viewBox: "0 0 220 220",
        width: "220",
        height: "220",
        role: "img",
        "aria-label": "Male avatar",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("radialGradient", {
                        id: "skinM",
                        cx: "50%",
                        cy: "42%",
                        r: "60%",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "0%",
                                stopColor: "#ffd7b8"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "100%",
                                stopColor: "#eab799"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "shirtM",
                        x1: "0",
                        x2: "1",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "0%",
                                stopColor: "#7aa8ff"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "100%",
                                stopColor: "#3d6cf0"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("filter", {
                        id: "softShadowM",
                        x: "-30%",
                        y: "-30%",
                        width: "160%",
                        height: "160%",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feDropShadow", {
                            dx: "0",
                            dy: "8",
                            stdDeviation: "8",
                            floodColor: "rgba(0,0,0,.35)"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                filter: "url(#softShadowM)",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                        x: "95",
                        y: "135",
                        width: "30",
                        height: "20",
                        rx: "8",
                        fill: "url(#skinM)"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "110",
                        cy: "105",
                        r: "55",
                        fill: "url(#skinM)"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M55,100 Q65,45 110,45 Q155,45 165,100 Q150,80 110,75 Q70,80 55,100 Z",
                        fill: "#3b3026"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "55",
                        cy: "110",
                        r: "9",
                        fill: "#e5a98d"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "165",
                        cy: "110",
                        r: "9",
                        fill: "#e5a98d"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                        cx: "92",
                        cy: "105",
                        rx: "10",
                        ry: eyeRY,
                        fill: "#fff"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                        cx: "128",
                        cy: "105",
                        rx: "10",
                        ry: eyeRY,
                        fill: "#fff"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "92",
                        cy: "105",
                        r: eyeRY > 2 ? 3.2 : 0,
                        fill: "#222"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "128",
                        cy: "105",
                        r: eyeRY > 2 ? 3.2 : 0,
                        fill: "#222"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M80,${92 - browLift} q12,-8 24,-2`,
                        stroke: "#2a221d",
                        strokeWidth: "4",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M116,${90 - browLift} q15,-6 24,0`,
                        stroke: "#2a221d",
                        strokeWidth: "4",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M92,${128} q18,${mouthOpen} 36,0`,
                        stroke: "#b06464",
                        strokeWidth: "5",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M50,185 q60,-32 120,0 v15 h-120 z",
                        fill: "url(#shirtM)"
                    })
                ]
            }),
            thinking && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                x: "0",
                y: "0",
                width: "220",
                height: "220",
                fill: "transparent",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("animate", {
                    attributeName: "opacity",
                    from: "0.15",
                    to: "0.35",
                    dur: "1.6s",
                    repeatCount: "indefinite"
                })
            })
        ]
    });
}
function FemaleAvatar({ thinking, blink, viseme }) {
    const mouthOpen = 6 + 10 * clamp01(viseme);
    const browLift = 0 + 3 * clamp01(viseme);
    const eyeRY = blink ? 1 : 7;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        viewBox: "0 0 220 220",
        width: "220",
        height: "220",
        role: "img",
        "aria-label": "Female avatar",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("radialGradient", {
                        id: "skinF",
                        cx: "50%",
                        cy: "42%",
                        r: "60%",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "0%",
                                stopColor: "#ffe0c8"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "100%",
                                stopColor: "#f2bda0"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "shirtF",
                        x1: "0",
                        x2: "1",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "0%",
                                stopColor: "#ff9fd1"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "100%",
                                stopColor: "#ff6fb8"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("filter", {
                        id: "softShadowF",
                        x: "-30%",
                        y: "-30%",
                        width: "160%",
                        height: "160%",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feDropShadow", {
                            dx: "0",
                            dy: "8",
                            stdDeviation: "8",
                            floodColor: "rgba(0,0,0,.35)"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                filter: "url(#softShadowF)",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                        x: "95",
                        y: "135",
                        width: "30",
                        height: "20",
                        rx: "8",
                        fill: "url(#skinF)"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "110",
                        cy: "105",
                        r: "55",
                        fill: "url(#skinF)"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M55,95 q5,-48 55,-52 q50,4 55,52 v35 q-15,25 -55,28 q-40,-3 -55,-28 z",
                        fill: "#ffcc66"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M55,96 q22,-28 55,-30 q33,2 55,30 q-20,-15 -55,-16 q-35,1 -55,16 z",
                        fill: "#ffcf70"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "55",
                        cy: "110",
                        r: "8.5",
                        fill: "#f2b9a0"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "165",
                        cy: "110",
                        r: "8.5",
                        fill: "#f2b9a0"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                        cx: "92",
                        cy: "108",
                        rx: "10",
                        ry: eyeRY,
                        fill: "#fff"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                        cx: "128",
                        cy: "108",
                        rx: "10",
                        ry: eyeRY,
                        fill: "#fff"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "92",
                        cy: "108",
                        r: eyeRY > 2 ? 3 : 0,
                        fill: "#222"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        cx: "128",
                        cy: "108",
                        r: eyeRY > 2 ? 3 : 0,
                        fill: "#222"
                    }),
                    eyeRY > 2 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M83,102 l-6,-3 M99,102 l6,-3 M119,102 l6,-3 M135,102 l6,-3",
                        stroke: "#222",
                        strokeWidth: "1.5"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M80,${95 - browLift} q12,-7 24,-2`,
                        stroke: "#a86b2a",
                        strokeWidth: "4",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M116,${94 - browLift} q15,-5 24,0`,
                        stroke: "#a86b2a",
                        strokeWidth: "4",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: `M92,130 q18,${mouthOpen} 36,0`,
                        stroke: "#e23a77",
                        strokeWidth: "6",
                        fill: "none",
                        strokeLinecap: "round"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M50,185 q60,-32 120,0 v15 h-120 z",
                        fill: "url(#shirtF)"
                    })
                ]
            }),
            thinking && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                x: "0",
                y: "0",
                width: "220",
                height: "220",
                fill: "transparent",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("animate", {
                    attributeName: "opacity",
                    from: "0.15",
                    to: "0.35",
                    dur: "1.6s",
                    repeatCount: "indefinite"
                })
            })
        ]
    });
}
/* =========================
   LocalStorage helpers
========================= */ const RUNS_KEY = "dsim_runs_v4";
const HISTORY_KEY = "dsim_history_v4";
function loadRuns() {
    try {
        const s = localStorage.getItem(RUNS_KEY);
        return s ? JSON.parse(s) : [];
    } catch  {
        return [];
    }
}
function saveRun(row) {
    const runs = loadRuns();
    runs.push(row);
    localStorage.setItem(RUNS_KEY, JSON.stringify(runs.slice(-200)));
}
function loadHistory() {
    try {
        const s = localStorage.getItem(HISTORY_KEY);
        return s ? JSON.parse(s) : [];
    } catch  {
        return [];
    }
}
function saveHistory(conv) {
    const h = loadHistory();
    h.push(conv);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(-50)));
}
/* =========================
   Voice (STT & TTS)
========================= */ function pickVoice(tone, gender) {
    const all = ( false ? 0 : []) || 0;
    const femaleHints = [
        "Google UK English Female",
        "Google US English",
        "Samantha",
        "Victoria",
        "Karen"
    ];
    const maleHints = [
        "Google UK English Male",
        "Google US English",
        "Alex",
        "Daniel",
        "Fred"
    ];
    const wanted = gender === "female" ? femaleHints : maleHints;
    for (const hint of wanted){
        const v = all.find((x)=>x.name.includes(hint));
        if (v) return v;
    }
    const byGender = all.find((v)=>gender === "female" ? /female/i.test(v.name) : /male/i.test(v.name));
    if (byGender) return byGender;
    return all.find((v)=>v.lang?.toLowerCase() === "en-us") ?? all[0];
}
function getRecognition() {
    if (true) return null; // <-- SSR guard (no runtime change)
    const w = window;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition || w.mozSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true;
    rec.maxAlternatives = 1;
    return rec;
}
const OBJECTION_LIMIT = {
    easy: 2,
    medium: 3,
    hard: 4
};
function classifyObjection(text) {
    const t = text.toLowerCase();
    if (/(too\s*(expensive|price|cost)|budget|afford)/.test(t)) return "price";
    if (/(no\s*time|busy|not\s*a\s*good\s*time|call\s*back)/.test(t)) return "time";
    if (/(not\s*interested|don’t\s*need|do\s*not\s*need)/.test(t)) return "notInterested";
    if (/(send|email)\s+(me|over)\s+(info|information|details|deck)/.test(t)) return "sendInfo";
    if (/(need|have)\s+to\s+(ask|check|run\s+by)\s+(my\s+boss|manager|partner|spouse|team|procurement)/.test(t)) return "authority";
    if (/(does(n’t| not)\s*fit|fit\s*my\s*lifestyle|workflow|process|use\s*case)/.test(t)) return "lifestyle";
    if (/(hard\s*evidence|proof|case\s*study|real\s*world\s*(study|evidence)|peer\s*review)/.test(t)) return "evidence";
    if (/(already\s*(use|have)|current\s*(vendor|provider)|working\s*with)/.test(t)) return "competition";
    if (/(bad\s*time|circle\s*back\s*later|quarter\s*end|budget\s*cycle)/.test(t)) return "timing";
    if (/(risk|concern|wary|skeptic)/.test(t)) return "risk";
    return null;
}
function analyzeObjections(lines) {
    // Count unique objections by the prospect (doc) and repetitions by category
    const counts = new Map();
    const order = [];
    for (const l of lines){
        if (l.who !== "doc") continue;
        const k = classifyObjection(l.text);
        if (!k) continue;
        counts.set(k, (counts.get(k) ?? 0) + 1);
        if (!order.includes(k)) order.push(k);
    }
    const totalUnique = order.length;
    const lastCategory = order.length ? order[order.length - 1] : null;
    const lastCount = lastCategory ? counts.get(lastCategory) ?? 0 : 0;
    return {
        counts,
        totalUnique,
        lastCategory,
        lastCount
    };
}
function shouldMoveOn(scenario, lines) {
    const { totalUnique, lastCategory, lastCount } = analyzeObjections(lines);
    const limit = OBJECTION_LIMIT[scenario.difficulty];
    // If we already hit the unique-objection cap for the difficulty, time to move on.
    if (totalUnique >= limit) return {
        acceptAndClose: true,
        acceptThisOne: true
    };
    // If the current category has been brought up twice, accept and progress.
    if (lastCategory && lastCount >= 2) return {
        acceptAndClose: false,
        acceptThisOne: true
    };
    return {
        acceptAndClose: false,
        acceptThisOne: false
    };
}
function sanitizeForVertical(vertical, reply) {
    if (vertical !== "pharma") {
        // strip/soften insurance/coverage talk for non-pharma
        reply = reply.replace(/\b(insurance|coverage|copay|prior authorization)\b/gi, "options");
    }
    return reply;
}
function acceptanceLine(category) {
    // Brief “accept + transition” lines after 2 rounds on the same objection
    const map = {
        price: "Totally fair—let’s structure it so the cost lines up with the value you’ll see. If that’s reasonable, the next step is a quick kickoff.",
        time: "Makes sense—let’s keep this lightweight so it doesn’t add work. If that sounds good, we can pencil a short start date.",
        lifestyle: "Understood—it should fit your day, not fight it. We’ll tailor rollout to your workflow. Shall we schedule a quick start?",
        evidence: "Fair ask—I’ll send a concise summary you can review later. For now, we can lock a tentative start and you can cancel if it’s not a fit.",
        authority: "Good call—looping in the right person is smart. Let’s set a brief intro with them; I’ll keep it surgical.",
        competition: "No problem—this should complement what you have. We’ll start small so you can compare side-by-side.",
        timing: "Totally—timing matters. Let’s target a date that lines up with your schedule and keep it flexible.",
        sendInfo: "I’ll send a crisp one-pager right after this. In the meantime, shall we set a tentative slot?",
        notInterested: "Got it—if results look good, great; if not, we part friends. Low-risk start?",
        risk: "Fair concern—let’s keep the first step small and reversible. If it delivers, we expand."
    };
    return map[category ?? "misc"] ?? "That’s fair—let’s keep the first step small and reversible.";
}
function closingNudge() {
    return "If that works, let’s pick a quick time to kick off—what does early next week look like?";
}
/* =========================
   Page
========================= */ function Page() {
    /* Scenario (defaults Door-to-Door + pen + easy + matter-of-fact) */ const [scenario, setScenario] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        vertical: "door2door",
        difficulty: "easy",
        tone: "matter-of-fact",
        product: "pen",
        persona: "Homeowner, cost-conscious but open to value"
    });
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("chat");
    const [gender, setGender] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("male");
    /* Conversation state */ const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [interim, setInterim] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    // === Mic Lock State and Helper Functions ===
    const [micLocked, setMicLocked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // mic locked after End & Score
    function stopMic() {
        try {
            window.recognition?.stop?.();
        } catch  {}
    }
    function startMicIfAllowed() {
        // only start if not Text Only and not locked
        if (!textOnly && !micLocked) {
            try {
                window.recognition?.start?.();
            } catch  {}
        }
    }
    /* Scoring */ const [score, setScore] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /* History & Leaderboard (right drawer) */ const [showHL, setShowHL] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const runs = loadRuns();
    const leaderboard = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>runs.slice().sort((a, b)=>b.score - a.score).slice(0, 10), [
        runs.length
    ]);
    /* Voice refs */ const recRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const ttsSpeakingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const [listening, setListening] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [handsFree, setHandsFree] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    /* NEW: Text-only mode */ const [textOnly, setTextOnly] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* NEW: lip-sync + blink state */ const [isSpeaking, setIsSpeaking] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [viseme, setViseme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [blink, setBlink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* NEW: Ended state (End & Score should *end* the call) */ const [ended, setEnded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [voicesReady, setVoicesReady] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Keep bubbles tidy */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const el = document.getElementById("chatScroll");
        if (el) el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth"
        });
    }, [
        messages.length
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (textOnly) {
            stopRecognition(); // hard stop the mic
            setListening(false); // UI state
            setHandsFree(false); // avoid auto-send voice flow
        }
    }, [
        textOnly
    ]);
    /* Blink timer */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const t = setInterval(()=>{
            setBlink(true);
            setTimeout(()=>setBlink(false), 120);
        }, 3600 + Math.random() * 1200);
        return ()=>clearInterval(t);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onVoices = ()=>setVoicesReady(true);
        try {
            window.speechSynthesis.addEventListener?.("voiceschanged", onVoices);
        } catch  {}
        // Safari may not fire voiceschanged — nudge once
        const t = setTimeout(()=>setVoicesReady(true), 400);
        return ()=>{
            clearTimeout(t);
            try {
                window.speechSynthesis.removeEventListener?.("voiceschanged", onVoices);
            } catch  {}
        };
    }, []);
    /* Reset convo when scenario changes (except tone) */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMessages([]);
        setScore(null);
        setEnded(false);
    }, [
        scenario.vertical,
        scenario.difficulty,
        scenario.product,
        scenario.persona
    ]);
    /* ---- Voice controls ---- */ function stopRecognition() {
        if (recRef.current) {
            try {
                recRef.current.onresult = null;
                recRef.current.onend = null;
                recRef.current.onerror = null;
                recRef.current.stop();
            } catch  {}
            recRef.current = null;
        }
        setListening(false);
    }
    function startVoice() {
        if (textOnly) return; // 🚫 never start mic in Text Only
        // ...rest of your existing code
        if (ended || textOnly) return; // respect ended + text-only
        if (ttsSpeakingRef.current) return; // wait until TTS ends
        const rec = getRecognition();
        if (!rec) {
            alert("Speech Recognition not supported in this browser. Try Chrome on desktop.");
            return;
        }
        recRef.current = rec;
        setListening(true);
        setInterim("");
        // Grace period: don’t auto-send on tiny pauses
        let partialBuffer = "";
        let sendTimer = null;
        rec.onresult = (e)=>{
            for(let i = e.resultIndex; i < e.results.length; i++){
                if (textOnly) return; //ignore speech results in Text Only
                const r = e.results[i];
                const txt = r[0].transcript;
                if (r.isFinal) {
                    partialBuffer = (partialBuffer + " " + txt).trim();
                    setInterim("");
                    if (handsFree) {
                        if (sendTimer) {
                            clearTimeout(sendTimer);
                            sendTimer = null;
                        }
                        // 900ms grace period so brief pauses don’t fire mid-sentence
                        sendTimer = window.setTimeout(()=>{
                            const toSend = partialBuffer.trim();
                            partialBuffer = "";
                            if (toSend) sendImmediate(toSend);
                        }, 900);
                    } else {
                        setInput((prev)=>prev ? `${prev} ${txt.trim()}` : txt.trim());
                    }
                } else {
                    setInterim(txt);
                }
            }
        };
        rec.onend = ()=>{
            setListening(false);
        };
        rec.onerror = ()=>setListening(false);
        try {
            rec.start();
        } catch  {
        // ignore
        }
    }
    /* Natural-ish TTS with viseme pulses */ function speakAndResume(text) {
        if (!text || ended || textOnly) return;
        // ✅ HARD STOP any live recognition before speaking to prevent self-hearing
        stopRecognition();
        setListening(false);
        if (!voicesReady) {
            setTimeout(()=>speakAndResume(text), 120);
            return;
        }
        ttsSpeakingRef.current = true;
        // Pause mic to avoid echo
        const wasListening = listening;
        if (wasListening) stopRecognition();
        ttsSpeakingRef.current = true;
        const u = new SpeechSynthesisUtterance(text);
        u.voice = pickVoice(scenario.tone, gender);
        const t = scenario.tone.toLowerCase();
        u.rate = t.includes("fast") ? 1.12 : t.includes("calm") ? 0.96 : 1.02;
        u.pitch = gender === "female" ? 1.06 : 0.98;
        u.volume = 1;
        u.onstart = ()=>{
            setIsSpeaking(true);
            setViseme(0.1);
        };
        u.onend = ()=>{
            setIsSpeaking(false);
            setViseme(0);
            ttsSpeakingRef.current = false;
            // ✅ Only restart mic after a small delay (avoid self-hearing echo)
            if ((handsFree || wasListening) && !textOnly && !ended) {
                setTimeout(()=>startVoice(), 600);
            }
        };
        u.onboundary = ()=>{
            const amp = 0.35 + Math.random() * 0.55; // 0..1
            setViseme(amp);
            setTimeout(()=>setViseme((v)=>v * 0.25), 90);
        };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    }
    /* ---- Network helpers to your existing API routes ---- */ async function fetchSimReply(lines) {
        // quick guard so non-pharma never gets “coverage/insurance” replies injected by model
        const resp = await fetch("/api/sim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                scenario,
                messages: lines
            })
        });
        if (!resp.ok) return "Sorry—could you restate that?";
        const data = await resp.json();
        let reply = data.text ?? data.reply ?? "Understood.";
        // Safety pass: never mention insurance unless pharma
        if (scenario.vertical !== "pharma") {
            if (/\b(coverage|covered|insurance|payer|formulary|prior ?auth|authorization)\b/i.test(reply)) {
                reply = "Got it—let’s stick to the essentials for now.";
            }
        }
        return reply;
    }
    async function scoreNow(lines) {
        try {
            const resp = await fetch("/api/score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store",
                body: JSON.stringify({
                    scenario,
                    messages: lines,
                    transcript: lines.map((l)=>`${l.who === "you" ? "Rep" : roleLabel(scenario.vertical)}: ${l.text}`).join("\n")
                })
            });
            if (!resp.ok) throw new Error("Score API not ok");
            const d = await resp.json();
            const scoreNum = Number.isFinite(d?.score) ? Math.round(Number(d.score) * 10) / 10 : 6.5;
            const res = {
                score: scoreNum,
                wentWell: (d?.wentWell ?? d?.good ?? "").trim(),
                improve: (d?.improve ?? "").trim(),
                next: (d?.next ?? d?.nextTime ?? "").trim()
            };
            setScore(res);
            saveRun({
                ts: Date.now(),
                score: res.score,
                vertical: scenario.vertical,
                difficulty: scenario.difficulty,
                product: scenario.product,
                tone: scenario.tone,
                persona: scenario.persona
            });
            saveHistory(lines);
        } catch (err) {
            // 🔁 Dynamic offline fallback (varies per conversation)
            const rep = lines.filter((l)=>l.who === "you").map((l)=>l.text).join(" ");
            const doc = lines.filter((l)=>l.who === "doc").map((l)=>l.text).join(" ");
            const repQs = (rep.match(/\?/g) || []).length;
            const objCount = (doc.match(/price|expensive|budget|time|busy|coverage|insurance|prior\s*auth|risk|not\s*interested|send\s+info/gi) || []).length;
            let s = 5;
            s += Math.min(repQs * 0.35, 2); // discovery
            s -= Math.min(objCount * 0.4, 1.2); // objection tax
            s += (Math.random() - 0.5) * 0.5; // small jitter
            s = Math.max(0, Math.min(10, s));
            s = Math.round(s * 10) / 10; // 0.1 precision
            setScore({
                score: s,
                wentWell: repQs >= 2 ? "Strong discovery and natural flow." : "Good rapport; add 1–2 sharper discovery questions.",
                improve: objCount > 0 ? "Tighten objection handling with one-sentence answers." : "Translate features into outcomes tied to the persona.",
                next: "Propose a crisp next step and a concrete time."
            });
            saveRun({
                ts: Date.now(),
                score: s,
                vertical: scenario.vertical,
                difficulty: scenario.difficulty,
                product: scenario.product,
                tone: scenario.tone,
                persona: scenario.persona
            });
            saveHistory(lines);
        }
    }
    /* ---- Sending user input ---- */ function pushYou(text) {
        setMessages((prev)=>[
                ...prev,
                {
                    who: "you",
                    text
                }
            ]);
    }
    async function respondFromDoc(lines) {
        // 1) Ask your simulator as usual
        let raw = await fetchSimReply(lines);
        // 2) Guard: remove non-pharma insurance talk
        raw = sanitizeForVertical(scenario.vertical, raw);
        // 3) Tiny anti-repeat only (no templated closes)
        const lastDoc = [
            ...lines
        ].reverse().find((l)=>l.who === "doc")?.text || "";
        if (lastDoc && lastDoc.trim().toLowerCase() === raw.trim().toLowerCase()) {
            raw = "Makes sense—what would you need from me to get this started?";
        }
        // 4) Commit reply and speak if Avatar view
        setMessages((prev)=>[
                ...prev,
                {
                    who: "doc",
                    text: raw
                }
            ]);
        if (view === "avatar") speakAndResume(raw);
    }
    async function sendImmediate(raw) {
        if (ended) return;
        const text = raw.trim();
        if (!text) return;
        setInput("");
        setInterim("");
        pushYou(text);
        await respondFromDoc([
            ...messages,
            {
                who: "you",
                text
            }
        ]);
    }
    async function onSendClick() {
        await sendImmediate(input);
    }
    async function onEndAndScore() {
        stopMic();
        setMicLocked(true);
        // 1) hard-stop audio in/out
        setEnded(true);
        stopRecognition();
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setViseme(0);
        setInterim("");
        // 2) score
        await scoreNow(messages);
    }
    function onStartNew() {
        setMicLocked(false);
        startMicIfAllowed();
        setMessages([]);
        setScore(null);
        setInput("");
        setInterim("");
        setEnded(false);
        if (!textOnly) {
            // stay idle until user hits Start Voice again (preserving your UX)
            stopRecognition();
        }
    }
    /* =========================
     Render
  ========================= */ const label = roleLabel(scenario.vertical);
    const tintBG = difficultyTint[scenario.difficulty];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            minHeight: "100vh",
            background: "#0b1220",
            color: "#e5ecff"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "28px 20px"
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 14
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: "/logo.png",
                                        alt: "PerfectPitch Logo",
                                        style: {
                                            width: 100,
                                            height: 100,
                                            borderRadius: 15
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                        style: {
                                            fontSize: 28,
                                            fontWeight: 700,
                                            letterSpacing: 0.4
                                        },
                                        children: "PerfectPitch"
                                    })
                                ]
                            }),
                            "          ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>setShowHL(true),
                                        style: {
                                            padding: "8px 12px",
                                            borderRadius: 10,
                                            background: "#22c55e22",
                                            border: "1px solid #22c55e55",
                                            color: "#bbf7d0",
                                            cursor: "pointer"
                                        },
                                        children: "History & Leaderboard"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            background: "#0f172a",
                                            border: "1px solid #273754",
                                            borderRadius: 999,
                                            padding: 4,
                                            display: "flex",
                                            gap: 4
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: ()=>setView("chat"),
                                                style: {
                                                    padding: "6px 12px",
                                                    borderRadius: 999,
                                                    border: "none",
                                                    cursor: "pointer",
                                                    color: view === "chat" ? "#0b1220" : "#93a9cd",
                                                    background: view === "chat" ? "#5eead4" : "transparent"
                                                },
                                                children: "Chat"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: ()=>setView("avatar"),
                                                style: {
                                                    padding: "6px 12px",
                                                    borderRadius: 999,
                                                    border: "none",
                                                    cursor: "pointer",
                                                    color: view === "avatar" ? "#0b1220" : "#93a9cd",
                                                    background: view === "avatar" ? "#5eead4" : "transparent"
                                                },
                                                children: "Avatar"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
                            gap: 12,
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: "Vertical"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        value: scenario.vertical,
                                        onChange: (e)=>setScenario((s)=>({
                                                    ...s,
                                                    vertical: e.target.value
                                                })),
                                        style: {
                                            width: "100%",
                                            background: "#0f172a",
                                            color: "#e5ecff",
                                            borderRadius: 8,
                                            padding: 8,
                                            border: "1px solid #273754"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "door2door",
                                                children: "Door-to-Door"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "b2b",
                                                children: "B2B"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "pharma",
                                                children: "Pharma (HCP)"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: "tech",
                                                children: "Tech"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: "Difficulty"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        value: scenario.difficulty,
                                        onChange: (e)=>setScenario((s)=>({
                                                    ...s,
                                                    difficulty: e.target.value
                                                })),
                                        style: {
                                            width: "100%",
                                            background: "#0f172a",
                                            color: "#e5ecff",
                                            borderRadius: 8,
                                            padding: 8,
                                            border: "1px solid #273754"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                children: "easy"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                children: "medium"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                children: "hard"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: "Tone"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        value: scenario.tone,
                                        onChange: (e)=>setScenario((s)=>({
                                                    ...s,
                                                    tone: e.target.value
                                                })),
                                        placeholder: "matter-of-fact",
                                        style: {
                                            width: "100%",
                                            background: "#0f172a",
                                            color: "#e5ecff",
                                            borderRadius: 8,
                                            padding: 8,
                                            border: "1px solid #273754"
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: "Product/Offer"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        value: scenario.product,
                                        onChange: (e)=>setScenario((s)=>({
                                                    ...s,
                                                    product: e.target.value
                                                })),
                                        placeholder: "pen",
                                        style: {
                                            width: "100%",
                                            background: "#0f172a",
                                            color: "#e5ecff",
                                            borderRadius: 8,
                                            padding: 8,
                                            border: "1px solid #273754"
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: "Persona"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        value: scenario.persona,
                                        onChange: (e)=>setScenario((s)=>({
                                                    ...s,
                                                    persona: e.target.value
                                                })),
                                        placeholder: "Homeowner…",
                                        style: {
                                            width: "100%",
                                            background: "#0f172a",
                                            color: "#e5ecff",
                                            borderRadius: 8,
                                            padding: 8,
                                            border: "1px solid #273754"
                                        }
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 12
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>listening ? stopRecognition() : startVoice(),
                                disabled: textOnly,
                                style: {
                                    padding: "8px 12px",
                                    borderRadius: 10,
                                    background: textOnly ? "#334155" : listening ? "#ef4444" : "#22c55e",
                                    border: "1px solid rgba(255,255,255,.15)",
                                    color: "#0b1220",
                                    cursor: textOnly ? "not-allowed" : "pointer",
                                    fontWeight: 600,
                                    opacity: textOnly ? 0.6 : 1
                                },
                                children: textOnly ? "Text Only" : listening ? "Stop Voice" : "Start Voice"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontSize: 14,
                                    opacity: 0.9
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "checkbox",
                                        checked: handsFree,
                                        onChange: (e)=>setHandsFree(e.target.checked),
                                        disabled: ended || textOnly
                                    }),
                                    "Hands-free (auto-send)"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontSize: 14,
                                    opacity: 0.9
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "checkbox",
                                        checked: textOnly,
                                        onChange: (e)=>setTextOnly(e.target.checked)
                                    }),
                                    "Text Only (no mic)"
                                ]
                            }),
                            view === "avatar" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    marginLeft: "auto",
                                    background: "#0f172a",
                                    border: "1px solid #273754",
                                    borderRadius: 999,
                                    padding: 4,
                                    display: "flex",
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>setGender("male"),
                                        style: {
                                            padding: "6px 12px",
                                            borderRadius: 999,
                                            border: "none",
                                            cursor: "pointer",
                                            color: gender === "male" ? "#0b1220" : "#93a9cd",
                                            background: gender === "male" ? "#60a5fa" : "transparent"
                                        },
                                        children: "Male"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: ()=>setGender("female"),
                                        style: {
                                            padding: "6px 12px",
                                            borderRadius: 999,
                                            border: "none",
                                            cursor: "pointer",
                                            color: gender === "female" ? "#0b1220" : "#93a9cd",
                                            background: gender === "female" ? "#f472b6" : "transparent"
                                        },
                                        children: "Female"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: view === "chat" ? "1fr" : "1fr 360px",
                            gap: 16,
                            transition: "grid-template-columns .25s ease"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: `linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`,
                                    border: "1px solid #1f2a44",
                                    borderRadius: 16,
                                    padding: 14
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 13,
                                            opacity: 0.7,
                                            marginBottom: 6
                                        },
                                        children: label
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        id: "chatScroll",
                                        style: {
                                            maxHeight: 430,
                                            overflowY: "auto",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                            padding: 8,
                                            background: "#0b1220",
                                            borderRadius: 14,
                                            border: "1px solid #17223b"
                                        },
                                        children: [
                                            messages.map((m, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    style: {
                                                        display: "flex",
                                                        justifyContent: m.who === "you" ? "flex-end" : "flex-start"
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            maxWidth: "72%",
                                                            background: m.who === "you" ? bubbleTint.you : bubbleTint.doc,
                                                            color: "#eaf1ff",
                                                            padding: "10px 12px",
                                                            borderRadius: 16,
                                                            borderTopLeftRadius: m.who === "you" ? 16 : 6,
                                                            borderTopRightRadius: m.who === "you" ? 6 : 16,
                                                            boxShadow: `0 2px 0 0 rgba(0,0,0,.25), inset 0 0 0 1000px ${tintBG}`,
                                                            lineHeight: 1.35,
                                                            whiteSpace: "pre-wrap"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    opacity: 0.8,
                                                                    marginBottom: 4
                                                                },
                                                                children: m.who === "you" ? "You" : label
                                                            }),
                                                            m.text
                                                        ]
                                                    })
                                                }, i)),
                                            interim && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    opacity: 0.6,
                                                    fontStyle: "italic",
                                                    paddingLeft: 6
                                                },
                                                children: [
                                                    "…",
                                                    interim
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10,
                                            marginTop: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                value: input,
                                                onChange: (e)=>setInput(e.target.value),
                                                onKeyDown: (e)=>{
                                                    if (ended) return;
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        onSendClick();
                                                    }
                                                },
                                                placeholder: "Speak or type your next line…",
                                                style: {
                                                    flex: 1,
                                                    background: "#0f172a",
                                                    color: "#e5ecff",
                                                    borderRadius: 10,
                                                    padding: "10px 12px",
                                                    border: "1px solid #273754",
                                                    outline: "none"
                                                },
                                                disabled: ended
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: onSendClick,
                                                disabled: ended,
                                                style: {
                                                    padding: "10px 14px",
                                                    borderRadius: 10,
                                                    background: ended ? "#64748b" : "#60a5fa",
                                                    border: "1px solid rgba(255,255,255,.15)",
                                                    color: "#0b1220",
                                                    fontWeight: 700,
                                                    cursor: ended ? "not-allowed" : "pointer"
                                                },
                                                children: "Send"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: onEndAndScore,
                                                style: {
                                                    padding: "10px 14px",
                                                    borderRadius: 10,
                                                    background: "#22c55e",
                                                    border: "1px solid rgba(255,255,255,.15)",
                                                    color: "#0b1220",
                                                    fontWeight: 700,
                                                    cursor: "pointer"
                                                },
                                                children: "End & Score"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: onStartNew,
                                                style: {
                                                    padding: "10px 14px",
                                                    borderRadius: 10,
                                                    background: "#f59e0b",
                                                    border: "1px solid rgba(255,255,255,.15)",
                                                    color: "#0b1220",
                                                    fontWeight: 700,
                                                    cursor: "pointer"
                                                },
                                                children: "Start New"
                                            })
                                        ]
                                    }),
                                    score && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            marginTop: 12,
                                            borderRadius: 14,
                                            border: "1px solid #1f2a44",
                                            padding: 12,
                                            background: "#0f172a"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 12,
                                                    alignItems: "center",
                                                    marginBottom: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        style: {
                                                            fontWeight: 700
                                                        },
                                                        children: "Score:"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            padding: "4px 10px",
                                                            borderRadius: 999,
                                                            background: "#22c55e22",
                                                            border: "1px solid #22c55e55",
                                                            color: "#bbf7d0",
                                                            fontWeight: 700
                                                        },
                                                        children: [
                                                            Number(score.score).toFixed(1),
                                                            " / 10"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                style: {
                                                    display: "grid",
                                                    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                                                    gap: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    opacity: 0.7,
                                                                    marginBottom: 6
                                                                },
                                                                children: "What went well"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    display: "grid",
                                                                    gap: 6
                                                                },
                                                                children: bulletify(score.wentWell || "—").map((b, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        style: {
                                                                            background: "#16a34a22",
                                                                            border: "1px solid #16a34a55",
                                                                            color: "#bbf7d0",
                                                                            padding: "6px 8px",
                                                                            borderRadius: 10,
                                                                            fontSize: 13
                                                                        },
                                                                        children: [
                                                                            "• ",
                                                                            b
                                                                        ]
                                                                    }, i))
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    opacity: 0.7,
                                                                    marginBottom: 6
                                                                },
                                                                children: "Improvements"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    display: "grid",
                                                                    gap: 6
                                                                },
                                                                children: bulletify(score.improve || "—").map((b, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        style: {
                                                                            background: "#f59e0b22",
                                                                            border: "1px solid #f59e0b55",
                                                                            color: "#fde68a",
                                                                            padding: "6px 8px",
                                                                            borderRadius: 10,
                                                                            fontSize: 13
                                                                        },
                                                                        children: [
                                                                            "• ",
                                                                            b
                                                                        ]
                                                                    }, i))
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    opacity: 0.7,
                                                                    marginBottom: 6
                                                                },
                                                                children: "Next time"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    display: "grid",
                                                                    gap: 6
                                                                },
                                                                children: bulletify(score.next || "Frame a crisp close and propose a time.").map((b, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        style: {
                                                                            background: "#60a5fa22",
                                                                            border: "1px solid #60a5fa55",
                                                                            color: "#bfdbfe",
                                                                            padding: "6px 8px",
                                                                            borderRadius: 10,
                                                                            fontSize: 13
                                                                        },
                                                                        children: [
                                                                            "• ",
                                                                            b
                                                                        ]
                                                                    }, i))
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            view === "avatar" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    background: `linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`,
                                    border: "1px solid #1f2a44",
                                    borderRadius: 16,
                                    padding: 14,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 13,
                                            opacity: 0.7,
                                            alignSelf: "flex-start"
                                        },
                                        children: label
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            width: 280,
                                            height: 320,
                                            borderRadius: 18,
                                            background: "#0b1220",
                                            border: "1px solid #17223b",
                                            display: "grid",
                                            placeItems: "center",
                                            padding: 10,
                                            position: "relative"
                                        },
                                        children: gender === "male" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MaleAvatar, {
                                            thinking: listening && !ttsSpeakingRef.current,
                                            blink: blink,
                                            viseme: isSpeaking ? viseme : 0
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FemaleAvatar, {
                                            thinking: listening && !ttsSpeakingRef.current,
                                            blink: blink,
                                            viseme: isSpeaking ? viseme : 0
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: ended ? "Call ended" : listening ? "Voice: listening" : textOnly ? "Voice: disabled (text only)" : "Voice: idle"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            showHL && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                onClick: ()=>setShowHL(false),
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,.45)",
                    display: "grid",
                    placeItems: "center",
                    zIndex: 40
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        width: 840,
                        maxWidth: "92vw",
                        maxHeight: "80vh",
                        overflow: "auto",
                        background: "#0f172a",
                        border: "1px solid #1f2a44",
                        borderRadius: 16,
                        padding: 16,
                        color: "#e5ecff",
                        boxShadow: "0 20px 50px rgba(0,0,0,.45)"
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    style: {
                                        margin: 0
                                    },
                                    children: "History & Leaderboard"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    onClick: ()=>setShowHL(false),
                                    style: {
                                        background: "#17223b",
                                        color: "#cbd5e1",
                                        border: "1px solid #273754",
                                        borderRadius: 8,
                                        padding: "6px 10px"
                                    },
                                    children: "Close"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 16
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            style: {
                                                fontSize: 12,
                                                opacity: 0.7,
                                                marginBottom: 6
                                            },
                                            children: "Top 10"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            style: {
                                                display: "grid",
                                                gap: 8
                                            },
                                            children: [
                                                leaderboard.map((r, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            display: "grid",
                                                            gridTemplateColumns: "28px 1fr 64px",
                                                            alignItems: "center",
                                                            gap: 10,
                                                            background: "#0b1220",
                                                            border: "1px solid #17223b",
                                                            borderRadius: 10,
                                                            padding: "8px 10px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                style: {
                                                                    opacity: 0.6
                                                                },
                                                                children: [
                                                                    "#",
                                                                    i + 1
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                style: {
                                                                    fontSize: 13
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                                        children: Number(r.score).toFixed(1)
                                                                    }),
                                                                    " — ",
                                                                    r.vertical,
                                                                    " / ",
                                                                    r.difficulty,
                                                                    " / ",
                                                                    r.product,
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            opacity: 0.7
                                                                        },
                                                                        children: new Date(r.ts).toLocaleString()
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    opacity: 0.7,
                                                                    textAlign: "right"
                                                                },
                                                                children: r.tone
                                                            })
                                                        ]
                                                    }, i)),
                                                leaderboard.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    style: {
                                                        opacity: 0.6
                                                    },
                                                    children: "No scores yet."
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            style: {
                                                fontSize: 12,
                                                opacity: 0.7,
                                                marginBottom: 6
                                            },
                                            children: "Recent Sessions"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            style: {
                                                display: "grid",
                                                gap: 8
                                            },
                                            children: loadHistory().slice().reverse().slice(0, 8).map((conv, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    style: {
                                                        background: "#0b1220",
                                                        border: "1px solid #17223b",
                                                        borderRadius: 10,
                                                        padding: "8px 10px",
                                                        fontSize: 13
                                                    },
                                                    children: [
                                                        conv.slice(0, 4).map((ln, j)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                                                        children: [
                                                                            ln.who === "you" ? "You" : roleLabel(scenario.vertical),
                                                                            ":"
                                                                        ]
                                                                    }),
                                                                    " ",
                                                                    ln.text
                                                                ]
                                                            }, j)),
                                                        conv.length > 4 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                opacity: 0.6
                                                            },
                                                            children: "…"
                                                        })
                                                    ]
                                                }, i))
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                marginTop: 14,
                                display: "flex",
                                gap: 8
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: ()=>{
                                    localStorage.removeItem(RUNS_KEY);
                                    localStorage.removeItem(HISTORY_KEY);
                                    setShowHL(false);
                                },
                                style: {
                                    background: "#ef4444",
                                    color: "#0b1220",
                                    padding: "8px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(255,255,255,.15)",
                                    cursor: "pointer"
                                },
                                children: "Clear History"
                            })
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 1921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function RootLayout({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("body", {
            children: children
        })
    });
}


/***/ }),

/***/ 2838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/hunterwilson/projects/doctor-sim/app/page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [478,448], () => (__webpack_exec__(1646)));
module.exports = __webpack_exports__;

})();