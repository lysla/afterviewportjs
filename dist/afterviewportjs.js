var D = /* @__PURE__ */ ((e) => (e[e.Partial = 0] = "Partial", e[e.In = 1] = "In", e[e.Out = 2] = "Out", e))(D || {}), Ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, G = {}, _e = {
  get exports() {
    return G;
  },
  set exports(e) {
    G = e;
  }
}, z = {}, ze = {
  get exports() {
    return z;
  },
  set exports(e) {
    z = e;
  }
}, ve;
function Ne() {
  return ve || (ve = 1, function(e) {
    (function(r, t) {
      e.exports ? e.exports = t() : r.EvEmitter = t();
    })(typeof window < "u" ? window : Ie, function() {
      function r() {
      }
      let t = r.prototype;
      return t.on = function(i, n) {
        if (!i || !n)
          return this;
        let s = this._events = this._events || {}, o = s[i] = s[i] || [];
        return o.includes(n) || o.push(n), this;
      }, t.once = function(i, n) {
        if (!i || !n)
          return this;
        this.on(i, n);
        let s = this._onceEvents = this._onceEvents || {}, o = s[i] = s[i] || {};
        return o[n] = !0, this;
      }, t.off = function(i, n) {
        let s = this._events && this._events[i];
        if (!s || !s.length)
          return this;
        let o = s.indexOf(n);
        return o != -1 && s.splice(o, 1), this;
      }, t.emitEvent = function(i, n) {
        let s = this._events && this._events[i];
        if (!s || !s.length)
          return this;
        s = s.slice(0), n = n || [];
        let o = this._onceEvents && this._onceEvents[i];
        for (let u of s)
          o && o[u] && (this.off(i, u), delete o[u]), u.apply(this, n);
        return this;
      }, t.allOff = function() {
        return delete this._events, delete this._onceEvents, this;
      }, r;
    });
  }(ze)), z;
}
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(e) {
  (function(r, t) {
    e.exports ? e.exports = t(r, Ne()) : r.imagesLoaded = t(r, r.EvEmitter);
  })(
    typeof window < "u" ? window : Ie,
    function(t, i) {
      let n = t.jQuery, s = t.console;
      function o(f) {
        return Array.isArray(f) ? f : typeof f == "object" && typeof f.length == "number" ? [...f] : [f];
      }
      function u(f, v, d) {
        if (!(this instanceof u))
          return new u(f, v, d);
        let c = f;
        if (typeof f == "string" && (c = document.querySelectorAll(f)), !c) {
          s.error(`Bad element for imagesLoaded ${c || f}`);
          return;
        }
        this.elements = o(c), this.options = {}, typeof v == "function" ? d = v : Object.assign(this.options, v), d && this.on("always", d), this.getImages(), n && (this.jqDeferred = new n.Deferred()), setTimeout(this.check.bind(this));
      }
      u.prototype = Object.create(i.prototype), u.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this);
      };
      const a = [1, 9, 11];
      u.prototype.addElementImages = function(f) {
        f.nodeName === "IMG" && this.addImage(f), this.options.background === !0 && this.addElementBackgroundImages(f);
        let { nodeType: v } = f;
        if (!v || !a.includes(v))
          return;
        let d = f.querySelectorAll("img");
        for (let c of d)
          this.addImage(c);
        if (typeof this.options.background == "string") {
          let c = f.querySelectorAll(this.options.background);
          for (let I of c)
            this.addElementBackgroundImages(I);
        }
      };
      const m = /url\((['"])?(.*?)\1\)/gi;
      u.prototype.addElementBackgroundImages = function(f) {
        let v = getComputedStyle(f);
        if (!v)
          return;
        let d = m.exec(v.backgroundImage);
        for (; d !== null; ) {
          let c = d && d[2];
          c && this.addBackground(c, f), d = m.exec(v.backgroundImage);
        }
      }, u.prototype.addImage = function(f) {
        let v = new l(f);
        this.images.push(v);
      }, u.prototype.addBackground = function(f, v) {
        let d = new h(f, v);
        this.images.push(d);
      }, u.prototype.check = function() {
        if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) {
          this.complete();
          return;
        }
        let f = (v, d, c) => {
          setTimeout(() => {
            this.progress(v, d, c);
          });
        };
        this.images.forEach(function(v) {
          v.once("progress", f), v.check();
        });
      }, u.prototype.progress = function(f, v, d) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !f.isLoaded, this.emitEvent("progress", [this, f, v]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, f), this.progressedCount === this.images.length && this.complete(), this.options.debug && s && s.log(`progress: ${d}`, f, v);
      }, u.prototype.complete = function() {
        let f = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(f, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
          let v = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[v](this);
        }
      };
      function l(f) {
        this.img = f;
      }
      l.prototype = Object.create(i.prototype), l.prototype.check = function() {
        if (this.getIsImageComplete()) {
          this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
          return;
        }
        this.proxyImage = new Image(), this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src;
      }, l.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth;
      }, l.prototype.confirm = function(f, v) {
        this.isLoaded = f;
        let { parentNode: d } = this.img, c = d.nodeName === "PICTURE" ? d : this.img;
        this.emitEvent("progress", [this, c, v]);
      }, l.prototype.handleEvent = function(f) {
        let v = "on" + f.type;
        this[v] && this[v](f);
      }, l.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents();
      }, l.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }, l.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      };
      function h(f, v) {
        this.url = f, this.element = v, this.img = new Image();
      }
      return h.prototype = Object.create(l.prototype), h.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"), this.unbindEvents());
      }, h.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      }, h.prototype.confirm = function(f, v) {
        this.isLoaded = f, this.emitEvent("progress", [this, this.element, v]);
      }, u.makeJQueryPlugin = function(f) {
        f = f || t.jQuery, f && (n = f, n.fn.imagesLoaded = function(v, d) {
          return new u(this, v, d).jqDeferred.promise(n(this));
        });
      }, u.makeJQueryPlugin(), u;
    }
  );
})(_e);
var Ee = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, ee = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, $e = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], N = {
  CSS: {},
  springs: {}
};
function T(e, r, t) {
  return Math.min(Math.max(e, r), t);
}
function R(e, r) {
  return e.indexOf(r) > -1;
}
function K(e, r) {
  return e.apply(null, r);
}
var g = {
  arr: function(e) {
    return Array.isArray(e);
  },
  obj: function(e) {
    return R(Object.prototype.toString.call(e), "Object");
  },
  pth: function(e) {
    return g.obj(e) && e.hasOwnProperty("totalLength");
  },
  svg: function(e) {
    return e instanceof SVGElement;
  },
  inp: function(e) {
    return e instanceof HTMLInputElement;
  },
  dom: function(e) {
    return e.nodeType || g.svg(e);
  },
  str: function(e) {
    return typeof e == "string";
  },
  fnc: function(e) {
    return typeof e == "function";
  },
  und: function(e) {
    return typeof e > "u";
  },
  nil: function(e) {
    return g.und(e) || e === null;
  },
  hex: function(e) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
  },
  rgb: function(e) {
    return /^rgb/.test(e);
  },
  hsl: function(e) {
    return /^hsl/.test(e);
  },
  col: function(e) {
    return g.hex(e) || g.rgb(e) || g.hsl(e);
  },
  key: function(e) {
    return !Ee.hasOwnProperty(e) && !ee.hasOwnProperty(e) && e !== "targets" && e !== "keyframes";
  }
};
function we(e) {
  var r = /\(([^)]+)\)/.exec(e);
  return r ? r[1].split(",").map(function(t) {
    return parseFloat(t);
  }) : [];
}
function xe(e, r) {
  var t = we(e), i = T(g.und(t[0]) ? 1 : t[0], 0.1, 100), n = T(g.und(t[1]) ? 100 : t[1], 0.1, 100), s = T(g.und(t[2]) ? 10 : t[2], 0.1, 100), o = T(g.und(t[3]) ? 0 : t[3], 0.1, 100), u = Math.sqrt(n / i), a = s / (2 * Math.sqrt(n * i)), m = a < 1 ? u * Math.sqrt(1 - a * a) : 0, l = 1, h = a < 1 ? (a * u + -o) / m : -o + u;
  function f(d) {
    var c = r ? r * d / 1e3 : d;
    return a < 1 ? c = Math.exp(-c * a * u) * (l * Math.cos(m * c) + h * Math.sin(m * c)) : c = (l + h * c) * Math.exp(-c * u), d === 0 || d === 1 ? d : 1 - c;
  }
  function v() {
    var d = N.springs[e];
    if (d)
      return d;
    for (var c = 1 / 6, I = 0, w = 0; ; )
      if (I += c, f(I) === 1) {
        if (w++, w >= 16)
          break;
      } else
        w = 0;
    var p = I * c * 1e3;
    return N.springs[e] = p, p;
  }
  return r ? f : v;
}
function He(e) {
  return e === void 0 && (e = 10), function(r) {
    return Math.ceil(T(r, 1e-6, 1) * e) * (1 / e);
  };
}
var Ue = function() {
  var e = 11, r = 1 / (e - 1);
  function t(l, h) {
    return 1 - 3 * h + 3 * l;
  }
  function i(l, h) {
    return 3 * h - 6 * l;
  }
  function n(l) {
    return 3 * l;
  }
  function s(l, h, f) {
    return ((t(h, f) * l + i(h, f)) * l + n(h)) * l;
  }
  function o(l, h, f) {
    return 3 * t(h, f) * l * l + 2 * i(h, f) * l + n(h);
  }
  function u(l, h, f, v, d) {
    var c, I, w = 0;
    do
      I = h + (f - h) / 2, c = s(I, v, d) - l, c > 0 ? f = I : h = I;
    while (Math.abs(c) > 1e-7 && ++w < 10);
    return I;
  }
  function a(l, h, f, v) {
    for (var d = 0; d < 4; ++d) {
      var c = o(h, f, v);
      if (c === 0)
        return h;
      var I = s(h, f, v) - l;
      h -= I / c;
    }
    return h;
  }
  function m(l, h, f, v) {
    if (!(0 <= l && l <= 1 && 0 <= f && f <= 1))
      return;
    var d = new Float32Array(e);
    if (l !== h || f !== v)
      for (var c = 0; c < e; ++c)
        d[c] = s(c * r, l, f);
    function I(w) {
      for (var p = 0, y = 1, k = e - 1; y !== k && d[y] <= w; ++y)
        p += r;
      --y;
      var C = (w - d[y]) / (d[y + 1] - d[y]), E = p + C * r, P = o(E, l, f);
      return P >= 1e-3 ? a(w, E, l, f) : P === 0 ? E : u(w, p, p + r, l, f);
    }
    return function(w) {
      return l === h && f === v || w === 0 || w === 1 ? w : s(I(w), h, v);
    };
  }
  return m;
}(), ke = function() {
  var e = { linear: function() {
    return function(i) {
      return i;
    };
  } }, r = {
    Sine: function() {
      return function(i) {
        return 1 - Math.cos(i * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(i) {
        return 1 - Math.sqrt(1 - i * i);
      };
    },
    Back: function() {
      return function(i) {
        return i * i * (3 * i - 2);
      };
    },
    Bounce: function() {
      return function(i) {
        for (var n, s = 4; i < ((n = Math.pow(2, --s)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((n * 3 - 2) / 22 - i, 2);
      };
    },
    Elastic: function(i, n) {
      i === void 0 && (i = 1), n === void 0 && (n = 0.5);
      var s = T(i, 1, 10), o = T(n, 0.1, 2);
      return function(u) {
        return u === 0 || u === 1 ? u : -s * Math.pow(2, 10 * (u - 1)) * Math.sin((u - 1 - o / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / o);
      };
    }
  }, t = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  return t.forEach(function(i, n) {
    r[i] = function() {
      return function(s) {
        return Math.pow(s, n + 2);
      };
    };
  }), Object.keys(r).forEach(function(i) {
    var n = r[i];
    e["easeIn" + i] = n, e["easeOut" + i] = function(s, o) {
      return function(u) {
        return 1 - n(s, o)(1 - u);
      };
    }, e["easeInOut" + i] = function(s, o) {
      return function(u) {
        return u < 0.5 ? n(s, o)(u * 2) / 2 : 1 - n(s, o)(u * -2 + 2) / 2;
      };
    }, e["easeOutIn" + i] = function(s, o) {
      return function(u) {
        return u < 0.5 ? (1 - n(s, o)(1 - u * 2)) / 2 : (n(s, o)(u * 2 - 1) + 1) / 2;
      };
    };
  }), e;
}();
function te(e, r) {
  if (g.fnc(e))
    return e;
  var t = e.split("(")[0], i = ke[t], n = we(e);
  switch (t) {
    case "spring":
      return xe(e, r);
    case "cubicBezier":
      return K(Ue, n);
    case "steps":
      return K(He, n);
    default:
      return K(i, n);
  }
}
function Le(e) {
  try {
    var r = document.querySelectorAll(e);
    return r;
  } catch {
    return;
  }
}
function $(e, r) {
  for (var t = e.length, i = arguments.length >= 2 ? arguments[1] : void 0, n = [], s = 0; s < t; s++)
    if (s in e) {
      var o = e[s];
      r.call(i, o, s, e) && n.push(o);
    }
  return n;
}
function H(e) {
  return e.reduce(function(r, t) {
    return r.concat(g.arr(t) ? H(t) : t);
  }, []);
}
function ge(e) {
  return g.arr(e) ? e : (g.str(e) && (e = Le(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e]);
}
function re(e, r) {
  return e.some(function(t) {
    return t === r;
  });
}
function ne(e) {
  var r = {};
  for (var t in e)
    r[t] = e[t];
  return r;
}
function Y(e, r) {
  var t = ne(e);
  for (var i in e)
    t[i] = r.hasOwnProperty(i) ? r[i] : e[i];
  return t;
}
function U(e, r) {
  var t = ne(e);
  for (var i in r)
    t[i] = g.und(e[i]) ? r[i] : e[i];
  return t;
}
function Je(e) {
  var r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);
  return r ? "rgba(" + r[1] + ",1)" : e;
}
function Qe(e) {
  var r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, t = e.replace(r, function(u, a, m, l) {
    return a + a + m + m + l + l;
  }), i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t), n = parseInt(i[1], 16), s = parseInt(i[2], 16), o = parseInt(i[3], 16);
  return "rgba(" + n + "," + s + "," + o + ",1)";
}
function Ze(e) {
  var r = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), t = parseInt(r[1], 10) / 360, i = parseInt(r[2], 10) / 100, n = parseInt(r[3], 10) / 100, s = r[4] || 1;
  function o(f, v, d) {
    return d < 0 && (d += 1), d > 1 && (d -= 1), d < 1 / 6 ? f + (v - f) * 6 * d : d < 1 / 2 ? v : d < 2 / 3 ? f + (v - f) * (2 / 3 - d) * 6 : f;
  }
  var u, a, m;
  if (i == 0)
    u = a = m = n;
  else {
    var l = n < 0.5 ? n * (1 + i) : n + i - n * i, h = 2 * n - l;
    u = o(h, l, t + 1 / 3), a = o(h, l, t), m = o(h, l, t - 1 / 3);
  }
  return "rgba(" + u * 255 + "," + a * 255 + "," + m * 255 + "," + s + ")";
}
function Ke(e) {
  if (g.rgb(e))
    return Je(e);
  if (g.hex(e))
    return Qe(e);
  if (g.hsl(e))
    return Ze(e);
}
function O(e) {
  var r = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
  if (r)
    return r[1];
}
function Ge(e) {
  if (R(e, "translate") || e === "perspective")
    return "px";
  if (R(e, "rotate") || R(e, "skew"))
    return "deg";
}
function X(e, r) {
  return g.fnc(e) ? e(r.target, r.id, r.total) : e;
}
function M(e, r) {
  return e.getAttribute(r);
}
function ie(e, r, t) {
  var i = O(r);
  if (re([t, "deg", "rad", "turn"], i))
    return r;
  var n = N.CSS[r + t];
  if (!g.und(n))
    return n;
  var s = 100, o = document.createElement(e.tagName), u = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
  u.appendChild(o), o.style.position = "absolute", o.style.width = s + t;
  var a = s / o.offsetWidth;
  u.removeChild(o);
  var m = a * parseFloat(r);
  return N.CSS[r + t] = m, m;
}
function Ae(e, r, t) {
  if (r in e.style) {
    var i = r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), n = e.style[r] || getComputedStyle(e).getPropertyValue(i) || "0";
    return t ? ie(e, n, t) : n;
  }
}
function ae(e, r) {
  if (g.dom(e) && !g.inp(e) && (!g.nil(M(e, r)) || g.svg(e) && e[r]))
    return "attribute";
  if (g.dom(e) && re($e, r))
    return "transform";
  if (g.dom(e) && r !== "transform" && Ae(e, r))
    return "css";
  if (e[r] != null)
    return "object";
}
function Te(e) {
  if (g.dom(e)) {
    for (var r = e.style.transform || "", t = /(\w+)\(([^)]*)\)/g, i = /* @__PURE__ */ new Map(), n; n = t.exec(r); )
      i.set(n[1], n[2]);
    return i;
  }
}
function Ye(e, r, t, i) {
  var n = R(r, "scale") ? 1 : 0 + Ge(r), s = Te(e).get(r) || n;
  return t && (t.transforms.list.set(r, s), t.transforms.last = r), i ? ie(e, s, i) : s;
}
function se(e, r, t, i) {
  switch (ae(e, r)) {
    case "transform":
      return Ye(e, r, i, t);
    case "css":
      return Ae(e, r, t);
    case "attribute":
      return M(e, r);
    default:
      return e[r] || 0;
  }
}
function oe(e, r) {
  var t = /^(\*=|\+=|-=)/.exec(e);
  if (!t)
    return e;
  var i = O(e) || 0, n = parseFloat(r), s = parseFloat(e.replace(t[0], ""));
  switch (t[0][0]) {
    case "+":
      return n + s + i;
    case "-":
      return n - s + i;
    case "*":
      return n * s + i;
  }
}
function Me(e, r) {
  if (g.col(e))
    return Ke(e);
  if (/\s/g.test(e))
    return e;
  var t = O(e), i = t ? e.substr(0, e.length - t.length) : e;
  return r ? i + r : i;
}
function ue(e, r) {
  return Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
}
function Xe(e) {
  return Math.PI * 2 * M(e, "r");
}
function et(e) {
  return M(e, "width") * 2 + M(e, "height") * 2;
}
function tt(e) {
  return ue(
    { x: M(e, "x1"), y: M(e, "y1") },
    { x: M(e, "x2"), y: M(e, "y2") }
  );
}
function Oe(e) {
  for (var r = e.points, t = 0, i, n = 0; n < r.numberOfItems; n++) {
    var s = r.getItem(n);
    n > 0 && (t += ue(i, s)), i = s;
  }
  return t;
}
function rt(e) {
  var r = e.points;
  return Oe(e) + ue(r.getItem(r.numberOfItems - 1), r.getItem(0));
}
function Ce(e) {
  if (e.getTotalLength)
    return e.getTotalLength();
  switch (e.tagName.toLowerCase()) {
    case "circle":
      return Xe(e);
    case "rect":
      return et(e);
    case "line":
      return tt(e);
    case "polyline":
      return Oe(e);
    case "polygon":
      return rt(e);
  }
}
function nt(e) {
  var r = Ce(e);
  return e.setAttribute("stroke-dasharray", r), r;
}
function it(e) {
  for (var r = e.parentNode; g.svg(r) && g.svg(r.parentNode); )
    r = r.parentNode;
  return r;
}
function De(e, r) {
  var t = r || {}, i = t.el || it(e), n = i.getBoundingClientRect(), s = M(i, "viewBox"), o = n.width, u = n.height, a = t.viewBox || (s ? s.split(" ") : [0, 0, o, u]);
  return {
    el: i,
    viewBox: a,
    x: a[0] / 1,
    y: a[1] / 1,
    w: o,
    h: u,
    vW: a[2],
    vH: a[3]
  };
}
function at(e, r) {
  var t = g.str(e) ? Le(e)[0] : e, i = r || 100;
  return function(n) {
    return {
      property: n,
      el: t,
      svg: De(t),
      totalLength: Ce(t) * (i / 100)
    };
  };
}
function st(e, r, t) {
  function i(l) {
    l === void 0 && (l = 0);
    var h = r + l >= 1 ? r + l : 0;
    return e.el.getPointAtLength(h);
  }
  var n = De(e.el, e.svg), s = i(), o = i(-1), u = i(1), a = t ? 1 : n.w / n.vW, m = t ? 1 : n.h / n.vH;
  switch (e.property) {
    case "x":
      return (s.x - n.x) * a;
    case "y":
      return (s.y - n.y) * m;
    case "angle":
      return Math.atan2(u.y - o.y, u.x - o.x) * 180 / Math.PI;
  }
}
function me(e, r) {
  var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, i = Me(g.pth(e) ? e.totalLength : e, r) + "";
  return {
    original: i,
    numbers: i.match(t) ? i.match(t).map(Number) : [0],
    strings: g.str(e) || r ? i.split(t) : []
  };
}
function fe(e) {
  var r = e ? H(g.arr(e) ? e.map(ge) : ge(e)) : [];
  return $(r, function(t, i, n) {
    return n.indexOf(t) === i;
  });
}
function Pe(e) {
  var r = fe(e);
  return r.map(function(t, i) {
    return { target: t, id: i, total: r.length, transforms: { list: Te(t) } };
  });
}
function ot(e, r) {
  var t = ne(r);
  if (/^spring/.test(t.easing) && (t.duration = xe(t.easing)), g.arr(e)) {
    var i = e.length, n = i === 2 && !g.obj(e[0]);
    n ? e = { value: e } : g.fnc(r.duration) || (t.duration = r.duration / i);
  }
  var s = g.arr(e) ? e : [e];
  return s.map(function(o, u) {
    var a = g.obj(o) && !g.pth(o) ? o : { value: o };
    return g.und(a.delay) && (a.delay = u ? 0 : r.delay), g.und(a.endDelay) && (a.endDelay = u === s.length - 1 ? r.endDelay : 0), a;
  }).map(function(o) {
    return U(o, t);
  });
}
function ut(e) {
  for (var r = $(H(e.map(function(s) {
    return Object.keys(s);
  })), function(s) {
    return g.key(s);
  }).reduce(function(s, o) {
    return s.indexOf(o) < 0 && s.push(o), s;
  }, []), t = {}, i = function(s) {
    var o = r[s];
    t[o] = e.map(function(u) {
      var a = {};
      for (var m in u)
        g.key(m) ? m == o && (a.value = u[m]) : a[m] = u[m];
      return a;
    });
  }, n = 0; n < r.length; n++)
    i(n);
  return t;
}
function ft(e, r) {
  var t = [], i = r.keyframes;
  i && (r = U(ut(i), r));
  for (var n in r)
    g.key(n) && t.push({
      name: n,
      tweens: ot(r[n], e)
    });
  return t;
}
function lt(e, r) {
  var t = {};
  for (var i in e) {
    var n = X(e[i], r);
    g.arr(n) && (n = n.map(function(s) {
      return X(s, r);
    }), n.length === 1 && (n = n[0])), t[i] = n;
  }
  return t.duration = parseFloat(t.duration), t.delay = parseFloat(t.delay), t;
}
function ct(e, r) {
  var t;
  return e.tweens.map(function(i) {
    var n = lt(i, r), s = n.value, o = g.arr(s) ? s[1] : s, u = O(o), a = se(r.target, e.name, u, r), m = t ? t.to.original : a, l = g.arr(s) ? s[0] : m, h = O(l) || O(a), f = u || h;
    return g.und(o) && (o = m), n.from = me(l, f), n.to = me(oe(o, l), f), n.start = t ? t.end : 0, n.end = n.start + n.delay + n.duration + n.endDelay, n.easing = te(n.easing, n.duration), n.isPath = g.pth(s), n.isPathTargetInsideSVG = n.isPath && g.svg(r.target), n.isColor = g.col(n.from.original), n.isColor && (n.round = 1), t = n, n;
  });
}
var Se = {
  css: function(e, r, t) {
    return e.style[r] = t;
  },
  attribute: function(e, r, t) {
    return e.setAttribute(r, t);
  },
  object: function(e, r, t) {
    return e[r] = t;
  },
  transform: function(e, r, t, i, n) {
    if (i.list.set(r, t), r === i.last || n) {
      var s = "";
      i.list.forEach(function(o, u) {
        s += u + "(" + o + ") ";
      }), e.style.transform = s;
    }
  }
};
function qe(e, r) {
  var t = Pe(e);
  t.forEach(function(i) {
    for (var n in r) {
      var s = X(r[n], i), o = i.target, u = O(s), a = se(o, n, u, i), m = u || O(a), l = oe(Me(s, m), a), h = ae(o, n);
      Se[h](o, n, l, i.transforms, !0);
    }
  });
}
function dt(e, r) {
  var t = ae(e.target, r.name);
  if (t) {
    var i = ct(r, e), n = i[i.length - 1];
    return {
      type: t,
      property: r.name,
      animatable: e,
      tweens: i,
      duration: n.end,
      delay: i[0].delay,
      endDelay: n.endDelay
    };
  }
}
function ht(e, r) {
  return $(H(e.map(function(t) {
    return r.map(function(i) {
      return dt(t, i);
    });
  })), function(t) {
    return !g.und(t);
  });
}
function Be(e, r) {
  var t = e.length, i = function(s) {
    return s.timelineOffset ? s.timelineOffset : 0;
  }, n = {};
  return n.duration = t ? Math.max.apply(Math, e.map(function(s) {
    return i(s) + s.duration;
  })) : r.duration, n.delay = t ? Math.min.apply(Math, e.map(function(s) {
    return i(s) + s.delay;
  })) : r.delay, n.endDelay = t ? n.duration - Math.max.apply(Math, e.map(function(s) {
    return i(s) + s.duration - s.endDelay;
  })) : r.endDelay, n;
}
var ye = 0;
function vt(e) {
  var r = Y(Ee, e), t = Y(ee, e), i = ft(t, e), n = Pe(e.targets), s = ht(n, i), o = Be(s, t), u = ye;
  return ye++, U(r, {
    id: u,
    children: [],
    animatables: n,
    animations: s,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var A = [], je = function() {
  var e;
  function r() {
    !e && (!pe() || !b.suspendWhenDocumentHidden) && A.length > 0 && (e = requestAnimationFrame(t));
  }
  function t(n) {
    for (var s = A.length, o = 0; o < s; ) {
      var u = A[o];
      u.paused ? (A.splice(o, 1), s--) : (u.tick(n), o++);
    }
    e = o > 0 ? requestAnimationFrame(t) : void 0;
  }
  function i() {
    b.suspendWhenDocumentHidden && (pe() ? e = cancelAnimationFrame(e) : (A.forEach(
      function(n) {
        return n._onDocumentVisibility();
      }
    ), je()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", i), r;
}();
function pe() {
  return !!document && document.hidden;
}
function b(e) {
  e === void 0 && (e = {});
  var r = 0, t = 0, i = 0, n, s = 0, o = null;
  function u(p) {
    var y = window.Promise && new Promise(function(k) {
      return o = k;
    });
    return p.finished = y, y;
  }
  var a = vt(e);
  u(a);
  function m() {
    var p = a.direction;
    p !== "alternate" && (a.direction = p !== "normal" ? "normal" : "reverse"), a.reversed = !a.reversed, n.forEach(function(y) {
      return y.reversed = a.reversed;
    });
  }
  function l(p) {
    return a.reversed ? a.duration - p : p;
  }
  function h() {
    r = 0, t = l(a.currentTime) * (1 / b.speed);
  }
  function f(p, y) {
    y && y.seek(p - y.timelineOffset);
  }
  function v(p) {
    if (a.reversePlayback)
      for (var k = s; k--; )
        f(p, n[k]);
    else
      for (var y = 0; y < s; y++)
        f(p, n[y]);
  }
  function d(p) {
    for (var y = 0, k = a.animations, C = k.length; y < C; ) {
      var E = k[y], P = E.animatable, j = E.tweens, S = j.length - 1, x = j[S];
      S && (x = $(j, function(Re) {
        return p < Re.end;
      })[0] || x);
      for (var q = T(p - x.start - x.delay, 0, x.duration) / x.duration, _ = isNaN(q) ? 1 : x.easing(q), L = x.to.strings, J = x.round, Q = [], We = x.to.numbers.length, B = void 0, V = 0; V < We; V++) {
        var F = void 0, le = x.to.numbers[V], ce = x.from.numbers[V] || 0;
        x.isPath ? F = st(x.value, _ * le, x.isPathTargetInsideSVG) : F = ce + _ * (le - ce), J && (x.isColor && V > 2 || (F = Math.round(F * J) / J)), Q.push(F);
      }
      var de = L.length;
      if (!de)
        B = Q[0];
      else {
        B = L[0];
        for (var W = 0; W < de; W++) {
          L[W];
          var he = L[W + 1], Z = Q[W];
          isNaN(Z) || (he ? B += Z + he : B += Z + " ");
        }
      }
      Se[E.type](P.target, E.property, B, P.transforms), E.currentValue = B, y++;
    }
  }
  function c(p) {
    a[p] && !a.passThrough && a[p](a);
  }
  function I() {
    a.remaining && a.remaining !== !0 && a.remaining--;
  }
  function w(p) {
    var y = a.duration, k = a.delay, C = y - a.endDelay, E = l(p);
    a.progress = T(E / y * 100, 0, 100), a.reversePlayback = E < a.currentTime, n && v(E), !a.began && a.currentTime > 0 && (a.began = !0, c("begin")), !a.loopBegan && a.currentTime > 0 && (a.loopBegan = !0, c("loopBegin")), E <= k && a.currentTime !== 0 && d(0), (E >= C && a.currentTime !== y || !y) && d(y), E > k && E < C ? (a.changeBegan || (a.changeBegan = !0, a.changeCompleted = !1, c("changeBegin")), c("change"), d(E)) : a.changeBegan && (a.changeCompleted = !0, a.changeBegan = !1, c("changeComplete")), a.currentTime = T(E, 0, y), a.began && c("update"), p >= y && (t = 0, I(), a.remaining ? (r = i, c("loopComplete"), a.loopBegan = !1, a.direction === "alternate" && m()) : (a.paused = !0, a.completed || (a.completed = !0, c("loopComplete"), c("complete"), !a.passThrough && "Promise" in window && (o(), u(a)))));
  }
  return a.reset = function() {
    var p = a.direction;
    a.passThrough = !1, a.currentTime = 0, a.progress = 0, a.paused = !0, a.began = !1, a.loopBegan = !1, a.changeBegan = !1, a.completed = !1, a.changeCompleted = !1, a.reversePlayback = !1, a.reversed = p === "reverse", a.remaining = a.loop, n = a.children, s = n.length;
    for (var y = s; y--; )
      a.children[y].reset();
    (a.reversed && a.loop !== !0 || p === "alternate" && a.loop === 1) && a.remaining++, d(a.reversed ? a.duration : 0);
  }, a._onDocumentVisibility = h, a.set = function(p, y) {
    return qe(p, y), a;
  }, a.tick = function(p) {
    i = p, r || (r = i), w((i + (t - r)) * b.speed);
  }, a.seek = function(p) {
    w(l(p));
  }, a.pause = function() {
    a.paused = !0, h();
  }, a.play = function() {
    a.paused && (a.completed && a.reset(), a.paused = !1, A.push(a), h(), je());
  }, a.reverse = function() {
    m(), a.completed = !a.reversed, h();
  }, a.restart = function() {
    a.reset(), a.play();
  }, a.remove = function(p) {
    var y = fe(p);
    Ve(y, a);
  }, a.reset(), a.autoplay && a.play(), a;
}
function be(e, r) {
  for (var t = r.length; t--; )
    re(e, r[t].animatable.target) && r.splice(t, 1);
}
function Ve(e, r) {
  var t = r.animations, i = r.children;
  be(e, t);
  for (var n = i.length; n--; ) {
    var s = i[n], o = s.animations;
    be(e, o), !o.length && !s.children.length && i.splice(n, 1);
  }
  !t.length && !i.length && r.pause();
}
function gt(e) {
  for (var r = fe(e), t = A.length; t--; ) {
    var i = A[t];
    Ve(r, i);
  }
}
function mt(e, r) {
  r === void 0 && (r = {});
  var t = r.direction || "normal", i = r.easing ? te(r.easing) : null, n = r.grid, s = r.axis, o = r.from || 0, u = o === "first", a = o === "center", m = o === "last", l = g.arr(e), h = parseFloat(l ? e[0] : e), f = l ? parseFloat(e[1]) : 0, v = O(l ? e[1] : e) || 0, d = r.start || 0 + (l ? h : 0), c = [], I = 0;
  return function(w, p, y) {
    if (u && (o = 0), a && (o = (y - 1) / 2), m && (o = y - 1), !c.length) {
      for (var k = 0; k < y; k++) {
        if (!n)
          c.push(Math.abs(o - k));
        else {
          var C = a ? (n[0] - 1) / 2 : o % n[0], E = a ? (n[1] - 1) / 2 : Math.floor(o / n[0]), P = k % n[0], j = Math.floor(k / n[0]), S = C - P, x = E - j, q = Math.sqrt(S * S + x * x);
          s === "x" && (q = -S), s === "y" && (q = -x), c.push(q);
        }
        I = Math.max.apply(Math, c);
      }
      i && (c = c.map(function(L) {
        return i(L / I) * I;
      })), t === "reverse" && (c = c.map(function(L) {
        return s ? L < 0 ? L * -1 : -L : Math.abs(I - L);
      }));
    }
    var _ = l ? (f - h) / I : h;
    return d + _ * (Math.round(c[p] * 100) / 100) + v;
  };
}
function yt(e) {
  e === void 0 && (e = {});
  var r = b(e);
  return r.duration = 0, r.add = function(t, i) {
    var n = A.indexOf(r), s = r.children;
    n > -1 && A.splice(n, 1);
    function o(f) {
      f.passThrough = !0;
    }
    for (var u = 0; u < s.length; u++)
      o(s[u]);
    var a = U(t, Y(ee, e));
    a.targets = a.targets || e.targets;
    var m = r.duration;
    a.autoplay = !1, a.direction = r.direction, a.timelineOffset = g.und(i) ? m : oe(i, m), o(r), r.seek(a.timelineOffset);
    var l = b(a);
    o(l), s.push(l);
    var h = Be(s, e);
    return r.delay = h.delay, r.endDelay = h.endDelay, r.duration = h.duration, r.seek(0), r.reset(), r.autoplay && r.play(), r;
  }, r;
}
b.version = "3.2.1";
b.speed = 1;
b.suspendWhenDocumentHidden = !0;
b.running = A;
b.remove = gt;
b.get = se;
b.set = qe;
b.convertPx = ie;
b.path = at;
b.setDashoffset = nt;
b.stagger = mt;
b.timeline = yt;
b.easing = te;
b.penner = ke;
b.random = function(e, r) {
  return Math.floor(Math.random() * (r - e + 1)) + e;
};
class Fe {
  constructor(r = "[data-av]", t) {
    return this.groups = [], document.querySelectorAll(r).forEach((n) => {
      let s = n.getAttribute("data-av") ?? "";
      t != null && t.group && (s = t.group);
      let o = n.getAttribute("data-av-sequential") ?? !1;
      o = o !== !1, t != null && t.sequential && (o = t.sequential);
      let u = !!n.hasAttribute("data-av-resets");
      t != null && t.resets && (u = t.resets);
      let a = !!n.hasAttribute(
        "data-av-only-when-totally-in"
      );
      t != null && t.onlyWhenTotallyIn && (a = t.onlyWhenTotallyIn);
      let m = {
        name: s,
        sequential: o,
        resets: u,
        onlyWhenTotallyIn: a,
        items: []
      };
      this.groups.find((l) => l.name == m.name) || this.groups.push(m);
    }), this.groups.forEach((n) => {
      let s = document.querySelectorAll(`[data-av="${n.name}"]`);
      r != "[data-av]" && (s = document.querySelectorAll(r));
      let o = Array.from(s);
      n.sequential && o.sort((u, a) => {
        let m = u.getAttribute("data-av-sequential") ?? "", l = a.getAttribute("data-av-sequential") ?? "", h = o.indexOf(u), f = o.indexOf(a);
        return t != null && t.optionsItem && t.optionsItem[h].sequentialOrder && (m = t.optionsItem[h].sequentialOrder ?? ""), t != null && t.optionsItem && t.optionsItem[f].sequentialOrder && (l = t.optionsItem[f].sequentialOrder ?? ""), m > l ? 1 : m < l ? -1 : 0;
      }), o.forEach((u, a) => {
        let m = "600", l = n.items.length > 0 ? n.items[n.items.length - 1].duration : "0", h = n.items.length > 0 ? n.items[n.items.length - 1].delay : "0", f = "av-style-01", v = u.getAttribute("data-av-animation") ?? f;
        t != null && t.animation && (v = t.animation), t != null && t.optionsItem && t.optionsItem[a].animation && (v = t.optionsItem[a].animation ?? f);
        let d = u.getAttribute("data-av-animation-duration") ?? m;
        t != null && t.duration && (d = t.duration), t != null && t.optionsItem && t.optionsItem[a].duration && (d = t.optionsItem[a].duration ?? m);
        let c = u.getAttribute("data-av-animation-delay") ?? 0;
        t != null && t.delay && (c = t.delay), t != null && t.optionsItem && t.optionsItem[a].delay && (c = t.optionsItem[a].delay ?? 0), c = c || (n.sequential ? Number(l) + Number(h) : c), n.items.push({
          element: u,
          group: n,
          animation: v,
          duration: d,
          delay: c.toString()
        });
      });
    }), this.startBooting(), window.addEventListener("load", () => {
      G("body", { background: !0 }, () => {
        this.init(), this.addListeners(), this.finishBooting();
      });
    }), this;
  }
  startBooting() {
    var r;
    (r = document.querySelector("body")) == null || r.setAttribute("style", "opacity:0");
  }
  finishBooting() {
    var r;
    (r = document.querySelector("body")) == null || r.setAttribute("style", "");
  }
  isInViewport(r) {
    const t = r.element.getBoundingClientRect(), i = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0
    };
    return t.bottom >= i.top && t.right >= i.left && t.top <= i.bottom && t.left <= i.right ? t.top >= i.top && t.left >= i.left && t.bottom <= i.bottom && t.right <= i.right ? D.In : D.Partial : D.Out;
  }
  init() {
    this.groups.forEach((r) => {
      r.items.forEach((t) => {
        var i;
        this.elAddWrapper(t), (i = t.wrapper) == null || i.setAttribute(
          "class",
          `av-animation av-animation--${t.animation} av-animation-duration av-animation-duration--${t.duration} av-animation-delay av-animation-delay--${t.delay}`
        );
      });
    });
  }
  listenersCallback() {
    this.groups.forEach((r) => {
      r.items.forEach((t) => {
        var i, n, s, o, u, a;
        if (this.isInViewport(t) == D.In || !r.onlyWhenTotallyIn && this.isInViewport(t) == D.Partial) {
          if (r.sequential) {
            let m = 1;
            if (!((i = t.wrapper) != null && i.classList.contains("av-ani-end")) && (this.isInViewport(t) == D.In || !r.onlyWhenTotallyIn && this.isInViewport(t) == D.Partial)) {
              switch ((n = t.wrapper) == null || n.classList.add(
                "av-animation-delay--" + Number(t.delay) * m
              ), (s = t.wrapper) == null || s.classList.add("av-ani-end"), t.animation) {
                case "av-style-12":
                  b({
                    targets: t.element.querySelector("path"),
                    strokeDashoffset: [b.setDashoffset, 0],
                    easing: "easeInOutSine",
                    duration: Number.parseInt(t.duration),
                    delay: Number(t.delay) * m,
                    direction: "normal",
                    loop: !1
                  });
                  break;
              }
              m++;
            }
          } else if (!((o = t.wrapper) != null && o.classList.contains("av-ani-end")))
            switch ((u = t.wrapper) == null || u.classList.add("av-ani-end"), t.animation) {
              case "av-style-12":
                b({
                  targets: t.element.querySelector("path"),
                  strokeDashoffset: [b.setDashoffset, 0],
                  easing: "easeInOutSine",
                  duration: Number.parseInt(t.duration),
                  delay: Number.parseInt(t.delay),
                  direction: "normal",
                  loop: !1
                });
                break;
            }
        } else if (r.resets)
          switch ((a = t.wrapper) == null || a.classList.remove("av-ani-end"), t.animation) {
            case "av-style-12":
              b({
                targets: t.element.querySelector("path"),
                strokeDashoffset: [0, b.setDashoffset],
                easing: "easeInOutSine",
                duration: Number.parseInt(t.duration),
                delay: Number.parseInt(t.delay),
                direction: "normal",
                loop: !1
              });
              break;
          }
      });
    });
  }
  addListeners() {
    window.addEventListener(
      "scroll",
      () => {
        this.listenersCallback();
      },
      {
        passive: !0
      }
    ), window.addEventListener(
      "resize",
      () => {
        this.listenersCallback();
      },
      {
        passive: !0
      }
    ), window.dispatchEvent(new Event("resize"));
  }
  elAddWrapper(r) {
    const t = document.createElement("div");
    r.element.insertAdjacentElement("afterend", t), t.appendChild(r.element), r.wrapper = t;
  }
}
function pt(e, r) {
  return new Fe(e, r);
}
new Fe();
export {
  pt as default
};
