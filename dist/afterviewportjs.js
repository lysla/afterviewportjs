var P = /* @__PURE__ */ ((e) => (e[e.Partial = 0] = "Partial", e[e.In = 1] = "In", e[e.Out = 2] = "Out", e))(P || {}), Ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Y = {}, Ne = {
  get exports() {
    return Y;
  },
  set exports(e) {
    Y = e;
  }
}, R = {}, Re = {
  get exports() {
    return R;
  },
  set exports(e) {
    R = e;
  }
}, ve;
function _e() {
  return ve || (ve = 1, function(e) {
    (function(r, t) {
      e.exports ? e.exports = t() : r.EvEmitter = t();
    })(typeof window < "u" ? window : Ie, function() {
      function r() {
      }
      let t = r.prototype;
      return t.on = function(n, a) {
        if (!n || !a)
          return this;
        let s = this._events = this._events || {}, o = s[n] = s[n] || [];
        return o.includes(a) || o.push(a), this;
      }, t.once = function(n, a) {
        if (!n || !a)
          return this;
        this.on(n, a);
        let s = this._onceEvents = this._onceEvents || {}, o = s[n] = s[n] || {};
        return o[a] = !0, this;
      }, t.off = function(n, a) {
        let s = this._events && this._events[n];
        if (!s || !s.length)
          return this;
        let o = s.indexOf(a);
        return o != -1 && s.splice(o, 1), this;
      }, t.emitEvent = function(n, a) {
        let s = this._events && this._events[n];
        if (!s || !s.length)
          return this;
        s = s.slice(0), a = a || [];
        let o = this._onceEvents && this._onceEvents[n];
        for (let l of s)
          o && o[l] && (this.off(n, l), delete o[l]), l.apply(this, a);
        return this;
      }, t.allOff = function() {
        return delete this._events, delete this._onceEvents, this;
      }, r;
    });
  }(Re)), R;
}
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(e) {
  (function(r, t) {
    e.exports ? e.exports = t(r, _e()) : r.imagesLoaded = t(r, r.EvEmitter);
  })(
    typeof window < "u" ? window : Ie,
    function(t, n) {
      let a = t.jQuery, s = t.console;
      function o(u) {
        return Array.isArray(u) ? u : typeof u == "object" && typeof u.length == "number" ? [...u] : [u];
      }
      function l(u, v, c) {
        if (!(this instanceof l))
          return new l(u, v, c);
        let d = u;
        if (typeof u == "string" && (d = document.querySelectorAll(u)), !d) {
          s.error(`Bad element for imagesLoaded ${d || u}`);
          return;
        }
        this.elements = o(d), this.options = {}, typeof v == "function" ? c = v : Object.assign(this.options, v), c && this.on("always", c), this.getImages(), a && (this.jqDeferred = new a.Deferred()), setTimeout(this.check.bind(this));
      }
      l.prototype = Object.create(n.prototype), l.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this);
      };
      const i = [1, 9, 11];
      l.prototype.addElementImages = function(u) {
        u.nodeName === "IMG" && this.addImage(u), this.options.background === !0 && this.addElementBackgroundImages(u);
        let { nodeType: v } = u;
        if (!v || !i.includes(v))
          return;
        let c = u.querySelectorAll("img");
        for (let d of c)
          this.addImage(d);
        if (typeof this.options.background == "string") {
          let d = u.querySelectorAll(this.options.background);
          for (let b of d)
            this.addElementBackgroundImages(b);
        }
      };
      const m = /url\((['"])?(.*?)\1\)/gi;
      l.prototype.addElementBackgroundImages = function(u) {
        let v = getComputedStyle(u);
        if (!v)
          return;
        let c = m.exec(v.backgroundImage);
        for (; c !== null; ) {
          let d = c && c[2];
          d && this.addBackground(d, u), c = m.exec(v.backgroundImage);
        }
      }, l.prototype.addImage = function(u) {
        let v = new f(u);
        this.images.push(v);
      }, l.prototype.addBackground = function(u, v) {
        let c = new h(u, v);
        this.images.push(c);
      }, l.prototype.check = function() {
        if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) {
          this.complete();
          return;
        }
        let u = (v, c, d) => {
          setTimeout(() => {
            this.progress(v, c, d);
          });
        };
        this.images.forEach(function(v) {
          v.once("progress", u), v.check();
        });
      }, l.prototype.progress = function(u, v, c) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !u.isLoaded, this.emitEvent("progress", [this, u, v]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, u), this.progressedCount === this.images.length && this.complete(), this.options.debug && s && s.log(`progress: ${c}`, u, v);
      }, l.prototype.complete = function() {
        let u = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(u, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
          let v = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[v](this);
        }
      };
      function f(u) {
        this.img = u;
      }
      f.prototype = Object.create(n.prototype), f.prototype.check = function() {
        if (this.getIsImageComplete()) {
          this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
          return;
        }
        this.proxyImage = new Image(), this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src;
      }, f.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth;
      }, f.prototype.confirm = function(u, v) {
        this.isLoaded = u;
        let { parentNode: c } = this.img, d = c.nodeName === "PICTURE" ? c : this.img;
        this.emitEvent("progress", [this, d, v]);
      }, f.prototype.handleEvent = function(u) {
        let v = "on" + u.type;
        this[v] && this[v](u);
      }, f.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents();
      }, f.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }, f.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      };
      function h(u, v) {
        this.url = u, this.element = v, this.img = new Image();
      }
      return h.prototype = Object.create(f.prototype), h.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"), this.unbindEvents());
      }, h.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      }, h.prototype.confirm = function(u, v) {
        this.isLoaded = u, this.emitEvent("progress", [this, this.element, v]);
      }, l.makeJQueryPlugin = function(u) {
        u = u || t.jQuery, u && (a = u, a.fn.imagesLoaded = function(v, c) {
          return new l(this, v, c).jqDeferred.promise(a(this));
        });
      }, l.makeJQueryPlugin(), l;
    }
  );
})(Ne);
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
}, ze = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], _ = {
  CSS: {},
  springs: {}
};
function T(e, r, t) {
  return Math.min(Math.max(e, r), t);
}
function W(e, r) {
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
    return W(Object.prototype.toString.call(e), "Object");
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
  var t = we(e), n = T(g.und(t[0]) ? 1 : t[0], 0.1, 100), a = T(g.und(t[1]) ? 100 : t[1], 0.1, 100), s = T(g.und(t[2]) ? 10 : t[2], 0.1, 100), o = T(g.und(t[3]) ? 0 : t[3], 0.1, 100), l = Math.sqrt(a / n), i = s / (2 * Math.sqrt(a * n)), m = i < 1 ? l * Math.sqrt(1 - i * i) : 0, f = 1, h = i < 1 ? (i * l + -o) / m : -o + l;
  function u(c) {
    var d = r ? r * c / 1e3 : c;
    return i < 1 ? d = Math.exp(-d * i * l) * (f * Math.cos(m * d) + h * Math.sin(m * d)) : d = (f + h * d) * Math.exp(-d * l), c === 0 || c === 1 ? c : 1 - d;
  }
  function v() {
    var c = _.springs[e];
    if (c)
      return c;
    for (var d = 1 / 6, b = 0, E = 0; ; )
      if (b += d, u(b) === 1) {
        if (E++, E >= 16)
          break;
      } else
        E = 0;
    var y = b * d * 1e3;
    return _.springs[e] = y, y;
  }
  return r ? u : v;
}
function He(e) {
  return e === void 0 && (e = 10), function(r) {
    return Math.ceil(T(r, 1e-6, 1) * e) * (1 / e);
  };
}
var Ue = function() {
  var e = 11, r = 1 / (e - 1);
  function t(f, h) {
    return 1 - 3 * h + 3 * f;
  }
  function n(f, h) {
    return 3 * h - 6 * f;
  }
  function a(f) {
    return 3 * f;
  }
  function s(f, h, u) {
    return ((t(h, u) * f + n(h, u)) * f + a(h)) * f;
  }
  function o(f, h, u) {
    return 3 * t(h, u) * f * f + 2 * n(h, u) * f + a(h);
  }
  function l(f, h, u, v, c) {
    var d, b, E = 0;
    do
      b = h + (u - h) / 2, d = s(b, v, c) - f, d > 0 ? u = b : h = b;
    while (Math.abs(d) > 1e-7 && ++E < 10);
    return b;
  }
  function i(f, h, u, v) {
    for (var c = 0; c < 4; ++c) {
      var d = o(h, u, v);
      if (d === 0)
        return h;
      var b = s(h, u, v) - f;
      h -= b / d;
    }
    return h;
  }
  function m(f, h, u, v) {
    if (!(0 <= f && f <= 1 && 0 <= u && u <= 1))
      return;
    var c = new Float32Array(e);
    if (f !== h || u !== v)
      for (var d = 0; d < e; ++d)
        c[d] = s(d * r, f, u);
    function b(E) {
      for (var y = 0, p = 1, A = e - 1; p !== A && c[p] <= E; ++p)
        y += r;
      --p;
      var M = (E - c[p]) / (c[p + 1] - c[p]), w = y + M * r, O = o(w, f, u);
      return O >= 1e-3 ? i(E, w, f, u) : O === 0 ? w : l(E, y, y + r, f, u);
    }
    return function(E) {
      return f === h && u === v || E === 0 || E === 1 ? E : s(b(E), h, v);
    };
  }
  return m;
}(), Ae = function() {
  var e = { linear: function() {
    return function(n) {
      return n;
    };
  } }, r = {
    Sine: function() {
      return function(n) {
        return 1 - Math.cos(n * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(n) {
        return 1 - Math.sqrt(1 - n * n);
      };
    },
    Back: function() {
      return function(n) {
        return n * n * (3 * n - 2);
      };
    },
    Bounce: function() {
      return function(n) {
        for (var a, s = 4; n < ((a = Math.pow(2, --s)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((a * 3 - 2) / 22 - n, 2);
      };
    },
    Elastic: function(n, a) {
      n === void 0 && (n = 1), a === void 0 && (a = 0.5);
      var s = T(n, 1, 10), o = T(a, 0.1, 2);
      return function(l) {
        return l === 0 || l === 1 ? l : -s * Math.pow(2, 10 * (l - 1)) * Math.sin((l - 1 - o / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / o);
      };
    }
  }, t = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  return t.forEach(function(n, a) {
    r[n] = function() {
      return function(s) {
        return Math.pow(s, a + 2);
      };
    };
  }), Object.keys(r).forEach(function(n) {
    var a = r[n];
    e["easeIn" + n] = a, e["easeOut" + n] = function(s, o) {
      return function(l) {
        return 1 - a(s, o)(1 - l);
      };
    }, e["easeInOut" + n] = function(s, o) {
      return function(l) {
        return l < 0.5 ? a(s, o)(l * 2) / 2 : 1 - a(s, o)(l * -2 + 2) / 2;
      };
    }, e["easeOutIn" + n] = function(s, o) {
      return function(l) {
        return l < 0.5 ? (1 - a(s, o)(1 - l * 2)) / 2 : (a(s, o)(l * 2 - 1) + 1) / 2;
      };
    };
  }), e;
}();
function te(e, r) {
  if (g.fnc(e))
    return e;
  var t = e.split("(")[0], n = Ae[t], a = we(e);
  switch (t) {
    case "spring":
      return xe(e, r);
    case "cubicBezier":
      return K(Ue, a);
    case "steps":
      return K(He, a);
    default:
      return K(n, a);
  }
}
function ke(e) {
  try {
    var r = document.querySelectorAll(e);
    return r;
  } catch {
    return;
  }
}
function z(e, r) {
  for (var t = e.length, n = arguments.length >= 2 ? arguments[1] : void 0, a = [], s = 0; s < t; s++)
    if (s in e) {
      var o = e[s];
      r.call(n, o, s, e) && a.push(o);
    }
  return a;
}
function H(e) {
  return e.reduce(function(r, t) {
    return r.concat(g.arr(t) ? H(t) : t);
  }, []);
}
function ge(e) {
  return g.arr(e) ? e : (g.str(e) && (e = ke(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e]);
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
function G(e, r) {
  var t = ne(e);
  for (var n in e)
    t[n] = r.hasOwnProperty(n) ? r[n] : e[n];
  return t;
}
function U(e, r) {
  var t = ne(e);
  for (var n in r)
    t[n] = g.und(e[n]) ? r[n] : e[n];
  return t;
}
function Je(e) {
  var r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);
  return r ? "rgba(" + r[1] + ",1)" : e;
}
function Qe(e) {
  var r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, t = e.replace(r, function(l, i, m, f) {
    return i + i + m + m + f + f;
  }), n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t), a = parseInt(n[1], 16), s = parseInt(n[2], 16), o = parseInt(n[3], 16);
  return "rgba(" + a + "," + s + "," + o + ",1)";
}
function Ze(e) {
  var r = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), t = parseInt(r[1], 10) / 360, n = parseInt(r[2], 10) / 100, a = parseInt(r[3], 10) / 100, s = r[4] || 1;
  function o(u, v, c) {
    return c < 0 && (c += 1), c > 1 && (c -= 1), c < 1 / 6 ? u + (v - u) * 6 * c : c < 1 / 2 ? v : c < 2 / 3 ? u + (v - u) * (2 / 3 - c) * 6 : u;
  }
  var l, i, m;
  if (n == 0)
    l = i = m = a;
  else {
    var f = a < 0.5 ? a * (1 + n) : a + n - a * n, h = 2 * a - f;
    l = o(h, f, t + 1 / 3), i = o(h, f, t), m = o(h, f, t - 1 / 3);
  }
  return "rgba(" + l * 255 + "," + i * 255 + "," + m * 255 + "," + s + ")";
}
function Ke(e) {
  if (g.rgb(e))
    return Je(e);
  if (g.hex(e))
    return Qe(e);
  if (g.hsl(e))
    return Ze(e);
}
function D(e) {
  var r = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
  if (r)
    return r[1];
}
function Ye(e) {
  if (W(e, "translate") || e === "perspective")
    return "px";
  if (W(e, "rotate") || W(e, "skew"))
    return "deg";
}
function X(e, r) {
  return g.fnc(e) ? e(r.target, r.id, r.total) : e;
}
function C(e, r) {
  return e.getAttribute(r);
}
function ae(e, r, t) {
  var n = D(r);
  if (re([t, "deg", "rad", "turn"], n))
    return r;
  var a = _.CSS[r + t];
  if (!g.und(a))
    return a;
  var s = 100, o = document.createElement(e.tagName), l = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
  l.appendChild(o), o.style.position = "absolute", o.style.width = s + t;
  var i = s / o.offsetWidth;
  l.removeChild(o);
  var m = i * parseFloat(r);
  return _.CSS[r + t] = m, m;
}
function Le(e, r, t) {
  if (r in e.style) {
    var n = r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), a = e.style[r] || getComputedStyle(e).getPropertyValue(n) || "0";
    return t ? ae(e, a, t) : a;
  }
}
function ie(e, r) {
  if (g.dom(e) && !g.inp(e) && (!g.nil(C(e, r)) || g.svg(e) && e[r]))
    return "attribute";
  if (g.dom(e) && re(ze, r))
    return "transform";
  if (g.dom(e) && r !== "transform" && Le(e, r))
    return "css";
  if (e[r] != null)
    return "object";
}
function Te(e) {
  if (g.dom(e)) {
    for (var r = e.style.transform || "", t = /(\w+)\(([^)]*)\)/g, n = /* @__PURE__ */ new Map(), a; a = t.exec(r); )
      n.set(a[1], a[2]);
    return n;
  }
}
function Ge(e, r, t, n) {
  var a = W(r, "scale") ? 1 : 0 + Ye(r), s = Te(e).get(r) || a;
  return t && (t.transforms.list.set(r, s), t.transforms.last = r), n ? ae(e, s, n) : s;
}
function se(e, r, t, n) {
  switch (ie(e, r)) {
    case "transform":
      return Ge(e, r, n, t);
    case "css":
      return Le(e, r, t);
    case "attribute":
      return C(e, r);
    default:
      return e[r] || 0;
  }
}
function oe(e, r) {
  var t = /^(\*=|\+=|-=)/.exec(e);
  if (!t)
    return e;
  var n = D(e) || 0, a = parseFloat(r), s = parseFloat(e.replace(t[0], ""));
  switch (t[0][0]) {
    case "+":
      return a + s + n;
    case "-":
      return a - s + n;
    case "*":
      return a * s + n;
  }
}
function Ce(e, r) {
  if (g.col(e))
    return Ke(e);
  if (/\s/g.test(e))
    return e;
  var t = D(e), n = t ? e.substr(0, e.length - t.length) : e;
  return r ? n + r : n;
}
function ue(e, r) {
  return Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2));
}
function Xe(e) {
  return Math.PI * 2 * C(e, "r");
}
function et(e) {
  return C(e, "width") * 2 + C(e, "height") * 2;
}
function tt(e) {
  return ue(
    { x: C(e, "x1"), y: C(e, "y1") },
    { x: C(e, "x2"), y: C(e, "y2") }
  );
}
function De(e) {
  for (var r = e.points, t = 0, n, a = 0; a < r.numberOfItems; a++) {
    var s = r.getItem(a);
    a > 0 && (t += ue(n, s)), n = s;
  }
  return t;
}
function rt(e) {
  var r = e.points;
  return De(e) + ue(r.getItem(r.numberOfItems - 1), r.getItem(0));
}
function Me(e) {
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
      return De(e);
    case "polygon":
      return rt(e);
  }
}
function nt(e) {
  var r = Me(e);
  return e.setAttribute("stroke-dasharray", r), r;
}
function at(e) {
  for (var r = e.parentNode; g.svg(r) && g.svg(r.parentNode); )
    r = r.parentNode;
  return r;
}
function Pe(e, r) {
  var t = r || {}, n = t.el || at(e), a = n.getBoundingClientRect(), s = C(n, "viewBox"), o = a.width, l = a.height, i = t.viewBox || (s ? s.split(" ") : [0, 0, o, l]);
  return {
    el: n,
    viewBox: i,
    x: i[0] / 1,
    y: i[1] / 1,
    w: o,
    h: l,
    vW: i[2],
    vH: i[3]
  };
}
function it(e, r) {
  var t = g.str(e) ? ke(e)[0] : e, n = r || 100;
  return function(a) {
    return {
      property: a,
      el: t,
      svg: Pe(t),
      totalLength: Me(t) * (n / 100)
    };
  };
}
function st(e, r, t) {
  function n(f) {
    f === void 0 && (f = 0);
    var h = r + f >= 1 ? r + f : 0;
    return e.el.getPointAtLength(h);
  }
  var a = Pe(e.el, e.svg), s = n(), o = n(-1), l = n(1), i = t ? 1 : a.w / a.vW, m = t ? 1 : a.h / a.vH;
  switch (e.property) {
    case "x":
      return (s.x - a.x) * i;
    case "y":
      return (s.y - a.y) * m;
    case "angle":
      return Math.atan2(l.y - o.y, l.x - o.x) * 180 / Math.PI;
  }
}
function me(e, r) {
  var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, n = Ce(g.pth(e) ? e.totalLength : e, r) + "";
  return {
    original: n,
    numbers: n.match(t) ? n.match(t).map(Number) : [0],
    strings: g.str(e) || r ? n.split(t) : []
  };
}
function le(e) {
  var r = e ? H(g.arr(e) ? e.map(ge) : ge(e)) : [];
  return z(r, function(t, n, a) {
    return a.indexOf(t) === n;
  });
}
function Oe(e) {
  var r = le(e);
  return r.map(function(t, n) {
    return { target: t, id: n, total: r.length, transforms: { list: Te(t) } };
  });
}
function ot(e, r) {
  var t = ne(r);
  if (/^spring/.test(t.easing) && (t.duration = xe(t.easing)), g.arr(e)) {
    var n = e.length, a = n === 2 && !g.obj(e[0]);
    a ? e = { value: e } : g.fnc(r.duration) || (t.duration = r.duration / n);
  }
  var s = g.arr(e) ? e : [e];
  return s.map(function(o, l) {
    var i = g.obj(o) && !g.pth(o) ? o : { value: o };
    return g.und(i.delay) && (i.delay = l ? 0 : r.delay), g.und(i.endDelay) && (i.endDelay = l === s.length - 1 ? r.endDelay : 0), i;
  }).map(function(o) {
    return U(o, t);
  });
}
function ut(e) {
  for (var r = z(H(e.map(function(s) {
    return Object.keys(s);
  })), function(s) {
    return g.key(s);
  }).reduce(function(s, o) {
    return s.indexOf(o) < 0 && s.push(o), s;
  }, []), t = {}, n = function(s) {
    var o = r[s];
    t[o] = e.map(function(l) {
      var i = {};
      for (var m in l)
        g.key(m) ? m == o && (i.value = l[m]) : i[m] = l[m];
      return i;
    });
  }, a = 0; a < r.length; a++)
    n(a);
  return t;
}
function lt(e, r) {
  var t = [], n = r.keyframes;
  n && (r = U(ut(n), r));
  for (var a in r)
    g.key(a) && t.push({
      name: a,
      tweens: ot(r[a], e)
    });
  return t;
}
function ft(e, r) {
  var t = {};
  for (var n in e) {
    var a = X(e[n], r);
    g.arr(a) && (a = a.map(function(s) {
      return X(s, r);
    }), a.length === 1 && (a = a[0])), t[n] = a;
  }
  return t.duration = parseFloat(t.duration), t.delay = parseFloat(t.delay), t;
}
function ct(e, r) {
  var t;
  return e.tweens.map(function(n) {
    var a = ft(n, r), s = a.value, o = g.arr(s) ? s[1] : s, l = D(o), i = se(r.target, e.name, l, r), m = t ? t.to.original : i, f = g.arr(s) ? s[0] : m, h = D(f) || D(i), u = l || h;
    return g.und(o) && (o = m), a.from = me(f, u), a.to = me(oe(o, f), u), a.start = t ? t.end : 0, a.end = a.start + a.delay + a.duration + a.endDelay, a.easing = te(a.easing, a.duration), a.isPath = g.pth(s), a.isPathTargetInsideSVG = a.isPath && g.svg(r.target), a.isColor = g.col(a.from.original), a.isColor && (a.round = 1), t = a, a;
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
  transform: function(e, r, t, n, a) {
    if (n.list.set(r, t), r === n.last || a) {
      var s = "";
      n.list.forEach(function(o, l) {
        s += l + "(" + o + ") ";
      }), e.style.transform = s;
    }
  }
};
function Be(e, r) {
  var t = Oe(e);
  t.forEach(function(n) {
    for (var a in r) {
      var s = X(r[a], n), o = n.target, l = D(s), i = se(o, a, l, n), m = l || D(i), f = oe(Ce(s, m), i), h = ie(o, a);
      Se[h](o, a, f, n.transforms, !0);
    }
  });
}
function dt(e, r) {
  var t = ie(e.target, r.name);
  if (t) {
    var n = ct(r, e), a = n[n.length - 1];
    return {
      type: t,
      property: r.name,
      animatable: e,
      tweens: n,
      duration: a.end,
      delay: n[0].delay,
      endDelay: a.endDelay
    };
  }
}
function ht(e, r) {
  return z(H(e.map(function(t) {
    return r.map(function(n) {
      return dt(t, n);
    });
  })), function(t) {
    return !g.und(t);
  });
}
function qe(e, r) {
  var t = e.length, n = function(s) {
    return s.timelineOffset ? s.timelineOffset : 0;
  }, a = {};
  return a.duration = t ? Math.max.apply(Math, e.map(function(s) {
    return n(s) + s.duration;
  })) : r.duration, a.delay = t ? Math.min.apply(Math, e.map(function(s) {
    return n(s) + s.delay;
  })) : r.delay, a.endDelay = t ? a.duration - Math.max.apply(Math, e.map(function(s) {
    return n(s) + s.duration - s.endDelay;
  })) : r.endDelay, a;
}
var ye = 0;
function vt(e) {
  var r = G(Ee, e), t = G(ee, e), n = lt(t, e), a = Oe(e.targets), s = ht(a, n), o = qe(s, t), l = ye;
  return ye++, U(r, {
    id: l,
    children: [],
    animatables: a,
    animations: s,
    duration: o.duration,
    delay: o.delay,
    endDelay: o.endDelay
  });
}
var L = [], je = function() {
  var e;
  function r() {
    !e && (!pe() || !I.suspendWhenDocumentHidden) && L.length > 0 && (e = requestAnimationFrame(t));
  }
  function t(a) {
    for (var s = L.length, o = 0; o < s; ) {
      var l = L[o];
      l.paused ? (L.splice(o, 1), s--) : (l.tick(a), o++);
    }
    e = o > 0 ? requestAnimationFrame(t) : void 0;
  }
  function n() {
    I.suspendWhenDocumentHidden && (pe() ? e = cancelAnimationFrame(e) : (L.forEach(
      function(a) {
        return a._onDocumentVisibility();
      }
    ), je()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", n), r;
}();
function pe() {
  return !!document && document.hidden;
}
function I(e) {
  e === void 0 && (e = {});
  var r = 0, t = 0, n = 0, a, s = 0, o = null;
  function l(y) {
    var p = window.Promise && new Promise(function(A) {
      return o = A;
    });
    return y.finished = p, p;
  }
  var i = vt(e);
  l(i);
  function m() {
    var y = i.direction;
    y !== "alternate" && (i.direction = y !== "normal" ? "normal" : "reverse"), i.reversed = !i.reversed, a.forEach(function(p) {
      return p.reversed = i.reversed;
    });
  }
  function f(y) {
    return i.reversed ? i.duration - y : y;
  }
  function h() {
    r = 0, t = f(i.currentTime) * (1 / I.speed);
  }
  function u(y, p) {
    p && p.seek(y - p.timelineOffset);
  }
  function v(y) {
    if (i.reversePlayback)
      for (var A = s; A--; )
        u(y, a[A]);
    else
      for (var p = 0; p < s; p++)
        u(y, a[p]);
  }
  function c(y) {
    for (var p = 0, A = i.animations, M = A.length; p < M; ) {
      var w = A[p], O = w.animatable, j = w.tweens, S = j.length - 1, x = j[S];
      S && (x = z(j, function(We) {
        return y < We.end;
      })[0] || x);
      for (var B = T(y - x.start - x.delay, 0, x.duration) / x.duration, N = isNaN(B) ? 1 : x.easing(B), k = x.to.strings, J = x.round, Q = [], Fe = x.to.numbers.length, q = void 0, V = 0; V < Fe; V++) {
        var $ = void 0, fe = x.to.numbers[V], ce = x.from.numbers[V] || 0;
        x.isPath ? $ = st(x.value, N * fe, x.isPathTargetInsideSVG) : $ = ce + N * (fe - ce), J && (x.isColor && V > 2 || ($ = Math.round($ * J) / J)), Q.push($);
      }
      var de = k.length;
      if (!de)
        q = Q[0];
      else {
        q = k[0];
        for (var F = 0; F < de; F++) {
          k[F];
          var he = k[F + 1], Z = Q[F];
          isNaN(Z) || (he ? q += Z + he : q += Z + " ");
        }
      }
      Se[w.type](O.target, w.property, q, O.transforms), w.currentValue = q, p++;
    }
  }
  function d(y) {
    i[y] && !i.passThrough && i[y](i);
  }
  function b() {
    i.remaining && i.remaining !== !0 && i.remaining--;
  }
  function E(y) {
    var p = i.duration, A = i.delay, M = p - i.endDelay, w = f(y);
    i.progress = T(w / p * 100, 0, 100), i.reversePlayback = w < i.currentTime, a && v(w), !i.began && i.currentTime > 0 && (i.began = !0, d("begin")), !i.loopBegan && i.currentTime > 0 && (i.loopBegan = !0, d("loopBegin")), w <= A && i.currentTime !== 0 && c(0), (w >= M && i.currentTime !== p || !p) && c(p), w > A && w < M ? (i.changeBegan || (i.changeBegan = !0, i.changeCompleted = !1, d("changeBegin")), d("change"), c(w)) : i.changeBegan && (i.changeCompleted = !0, i.changeBegan = !1, d("changeComplete")), i.currentTime = T(w, 0, p), i.began && d("update"), y >= p && (t = 0, b(), i.remaining ? (r = n, d("loopComplete"), i.loopBegan = !1, i.direction === "alternate" && m()) : (i.paused = !0, i.completed || (i.completed = !0, d("loopComplete"), d("complete"), !i.passThrough && "Promise" in window && (o(), l(i)))));
  }
  return i.reset = function() {
    var y = i.direction;
    i.passThrough = !1, i.currentTime = 0, i.progress = 0, i.paused = !0, i.began = !1, i.loopBegan = !1, i.changeBegan = !1, i.completed = !1, i.changeCompleted = !1, i.reversePlayback = !1, i.reversed = y === "reverse", i.remaining = i.loop, a = i.children, s = a.length;
    for (var p = s; p--; )
      i.children[p].reset();
    (i.reversed && i.loop !== !0 || y === "alternate" && i.loop === 1) && i.remaining++, c(i.reversed ? i.duration : 0);
  }, i._onDocumentVisibility = h, i.set = function(y, p) {
    return Be(y, p), i;
  }, i.tick = function(y) {
    n = y, r || (r = n), E((n + (t - r)) * I.speed);
  }, i.seek = function(y) {
    E(f(y));
  }, i.pause = function() {
    i.paused = !0, h();
  }, i.play = function() {
    i.paused && (i.completed && i.reset(), i.paused = !1, L.push(i), h(), je());
  }, i.reverse = function() {
    m(), i.completed = !i.reversed, h();
  }, i.restart = function() {
    i.reset(), i.play();
  }, i.remove = function(y) {
    var p = le(y);
    Ve(p, i);
  }, i.reset(), i.autoplay && i.play(), i;
}
function be(e, r) {
  for (var t = r.length; t--; )
    re(e, r[t].animatable.target) && r.splice(t, 1);
}
function Ve(e, r) {
  var t = r.animations, n = r.children;
  be(e, t);
  for (var a = n.length; a--; ) {
    var s = n[a], o = s.animations;
    be(e, o), !o.length && !s.children.length && n.splice(a, 1);
  }
  !t.length && !n.length && r.pause();
}
function gt(e) {
  for (var r = le(e), t = L.length; t--; ) {
    var n = L[t];
    Ve(r, n);
  }
}
function mt(e, r) {
  r === void 0 && (r = {});
  var t = r.direction || "normal", n = r.easing ? te(r.easing) : null, a = r.grid, s = r.axis, o = r.from || 0, l = o === "first", i = o === "center", m = o === "last", f = g.arr(e), h = parseFloat(f ? e[0] : e), u = f ? parseFloat(e[1]) : 0, v = D(f ? e[1] : e) || 0, c = r.start || 0 + (f ? h : 0), d = [], b = 0;
  return function(E, y, p) {
    if (l && (o = 0), i && (o = (p - 1) / 2), m && (o = p - 1), !d.length) {
      for (var A = 0; A < p; A++) {
        if (!a)
          d.push(Math.abs(o - A));
        else {
          var M = i ? (a[0] - 1) / 2 : o % a[0], w = i ? (a[1] - 1) / 2 : Math.floor(o / a[0]), O = A % a[0], j = Math.floor(A / a[0]), S = M - O, x = w - j, B = Math.sqrt(S * S + x * x);
          s === "x" && (B = -S), s === "y" && (B = -x), d.push(B);
        }
        b = Math.max.apply(Math, d);
      }
      n && (d = d.map(function(k) {
        return n(k / b) * b;
      })), t === "reverse" && (d = d.map(function(k) {
        return s ? k < 0 ? k * -1 : -k : Math.abs(b - k);
      }));
    }
    var N = f ? (u - h) / b : h;
    return c + N * (Math.round(d[y] * 100) / 100) + v;
  };
}
function yt(e) {
  e === void 0 && (e = {});
  var r = I(e);
  return r.duration = 0, r.add = function(t, n) {
    var a = L.indexOf(r), s = r.children;
    a > -1 && L.splice(a, 1);
    function o(u) {
      u.passThrough = !0;
    }
    for (var l = 0; l < s.length; l++)
      o(s[l]);
    var i = U(t, G(ee, e));
    i.targets = i.targets || e.targets;
    var m = r.duration;
    i.autoplay = !1, i.direction = r.direction, i.timelineOffset = g.und(n) ? m : oe(n, m), o(r), r.seek(i.timelineOffset);
    var f = I(i);
    o(f), s.push(f);
    var h = qe(s, e);
    return r.delay = h.delay, r.endDelay = h.endDelay, r.duration = h.duration, r.seek(0), r.reset(), r.autoplay && r.play(), r;
  }, r;
}
I.version = "3.2.1";
I.speed = 1;
I.suspendWhenDocumentHidden = !0;
I.running = L;
I.remove = gt;
I.get = se;
I.set = Be;
I.convertPx = ae;
I.path = it;
I.setDashoffset = nt;
I.stagger = mt;
I.timeline = yt;
I.easing = te;
I.penner = Ae;
I.random = function(e, r) {
  return Math.floor(Math.random() * (r - e + 1)) + e;
};
class $e {
  constructor(r = "[data-av]", t) {
    return this.groups = [], document.querySelectorAll(r).forEach((a) => {
      let s = !!a.hasAttribute("data-av-typewriter");
      t != null && t.typewriter && (s = t.typewriter);
      let o = a.getAttribute("data-av") ?? "";
      t != null && t.group && (o = t.group);
      let l = a.getAttribute("data-av-sequential") ?? !1;
      l = l !== !1, t != null && t.sequential && (l = t.sequential);
      let i = !!a.hasAttribute("data-av-resets");
      t != null && t.resets && (i = t.resets);
      let m = !!a.hasAttribute(
        "data-av-only-when-totally-in"
      );
      if (t != null && t.onlyWhenTotallyIn && (m = t.onlyWhenTotallyIn), s) {
        o = o + "--typewriter";
        let h = a.textContent, u = (h == null ? void 0 : h.trim().replace(/\s+/g, " ").replace(/\r?\n|\r/g, "").split("")) ?? [];
        a.textContent = "";
        let v = 10, c = v;
        a.hasAttribute("data-av-animation-duration") && (c = Number(a.getAttribute("data-av-animation-duration")) / u.length), c = c < v ? v : c > v * 100 ? v * 100 : c;
        for (let d = u.length - 1; d >= 0; d--) {
          const b = document.createElement("span");
          a.insertAdjacentElement("afterend", b), b.textContent = u[d];
          let E = a.attributes;
          for (let y = 0; y < E.length; y++) {
            const p = E[y];
            b.setAttribute(p.name, p.value);
          }
          b.setAttribute("data-av", o), b.setAttribute(
            "data-av-animation-duration",
            c.toString()
          );
        }
      }
      let f = {
        name: o,
        sequential: l,
        resets: i,
        onlyWhenTotallyIn: m,
        typewriter: s,
        items: []
      };
      this.groups.find((h) => h.name == f.name) || this.groups.push(f);
    }), this.groups.forEach((a) => {
      let s = document.querySelectorAll(`[data-av="${a.name}"]`);
      r != "[data-av]" && (s = document.querySelectorAll(r));
      let o = Array.from(s);
      a.sequential && o.sort((l, i) => {
        let m = l.getAttribute("data-av-sequential") ?? "", f = i.getAttribute("data-av-sequential") ?? "", h = o.indexOf(l), u = o.indexOf(i);
        return t != null && t.optionsItem && t.optionsItem[h].sequentialOrder && (m = t.optionsItem[h].sequentialOrder ?? ""), t != null && t.optionsItem && t.optionsItem[u].sequentialOrder && (f = t.optionsItem[u].sequentialOrder ?? ""), m > f ? 1 : m < f ? -1 : 0;
      }), o.forEach((l, i) => {
        let m = "600", f = a.items.length > 0 ? a.items[a.items.length - 1].duration : "0", h = a.items.length > 0 ? a.items[a.items.length - 1].delay : "0", u = "av-style-01", v = l.getAttribute("data-av-animation") ?? u;
        t != null && t.animation && (v = t.animation), t != null && t.optionsItem && t.optionsItem[i].animation && (v = t.optionsItem[i].animation ?? u);
        let c = l.getAttribute("data-av-animation-duration") ?? m;
        t != null && t.duration && (c = t.duration), t != null && t.optionsItem && t.optionsItem[i].duration && (c = t.optionsItem[i].duration ?? m);
        let d = l.getAttribute("data-av-animation-delay") ?? 0;
        t != null && t.delay && (d = t.delay), t != null && t.optionsItem && t.optionsItem[i].delay && (d = t.optionsItem[i].delay ?? 0), d = d || (a.sequential ? Number(f) + Number(h) : d);
        let b = !!l.hasAttribute("data-av-parallax");
        t != null && t.parallax && (b = t.parallax), t != null && t.optionsItem && t.optionsItem[i].parallax && (b = t.optionsItem[i].parallax ?? b), a.items.push({
          element: l,
          group: a,
          animation: v,
          duration: c,
          delay: d.toString(),
          parallax: b
        });
      });
    }), this.startBooting(), window.addEventListener("load", () => {
      Y("body", { background: !0 }, () => {
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
    const t = r.element.getBoundingClientRect(), n = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0
    };
    return t.bottom >= n.top && t.right >= n.left && t.top <= n.bottom && t.left <= n.right ? t.top >= n.top && t.left >= n.left && t.bottom <= n.bottom && t.right <= n.right ? P.In : P.Partial : P.Out;
  }
  init() {
    this.groups.forEach((r) => {
      r.items.forEach((t) => {
        var n, a;
        this.elAddWrapper(t), (n = t.wrapper) == null || n.setAttribute(
          "class",
          `av-animation av-animation--${t.animation} av-animation-duration av-animation-delay ${r.typewriter ? "av-animation-typewriter" : ""}`
        ), (a = t.wrapper) == null || a.setAttribute(
          "style",
          `transition-duration:${t.duration}ms;animation-duration:${t.duration}ms;transition-delay:${t.delay}ms;animation-delay:${t.delay}ms;`
        );
      });
    });
  }
  listenersCallback(r) {
    this.groups.forEach((t) => {
      t.items.forEach((n) => {
        var a, s, o, l, i, m, f, h;
        if (this.isInViewport(n) == P.In || !t.onlyWhenTotallyIn && this.isInViewport(n) == P.Partial) {
          if (t.sequential) {
            let u = 1;
            if (!((a = n.wrapper) != null && a.classList.contains("av-ani-end")) && (this.isInViewport(n) == P.In || !t.onlyWhenTotallyIn && this.isInViewport(n) == P.Partial)) {
              switch ((s = n.wrapper) == null || s.classList.add("av-ani-end"), (o = n.wrapper) == null || o.setAttribute(
                "style",
                `transition-duration:${n.duration}ms;animation-duration:${n.duration}ms;transition-delay:${Number(n.delay) * u}ms;animation-delay:${Number(n.delay) * u}ms;`
              ), n.animation) {
                case "av-style-12":
                  I({
                    targets: n.element.querySelectorAll("path"),
                    strokeDashoffset: [I.setDashoffset, 0],
                    easing: "linear",
                    duration: Number.parseInt(n.duration),
                    delay: Number(n.delay) * u,
                    direction: "normal",
                    loop: !1
                  });
                  break;
              }
              u++;
            }
          } else if (!((l = n.wrapper) != null && l.classList.contains("av-ani-end")))
            switch ((i = n.wrapper) == null || i.classList.add("av-ani-end"), (m = n.wrapper) == null || m.setAttribute(
              "style",
              `transition-duration:${n.duration}ms;animation-duration:${n.duration}ms;transition-delay:${n.delay}ms;animation-delay:${n.delay}ms;`
            ), n.animation) {
              case "av-style-12":
                I({
                  targets: n.element.querySelectorAll("path"),
                  strokeDashoffset: [I.setDashoffset, 0],
                  easing: "linear",
                  duration: Number.parseInt(n.duration),
                  delay: Number.parseInt(n.delay),
                  direction: "normal",
                  loop: !1
                });
                break;
            }
          if (n.parallax && r.type == "wheel") {
            let u = window.getComputedStyle(n.element).getPropertyValue("transform");
            u != "none" ? u = u.split(",")[5].trim().replace(")", "") : u = 0;
            let c = 20 / n.element.clientHeight * 100;
            r.deltaY < 0 ? u = Number(u) + c : u = Number(u) - c, n.element.setAttribute(
              "style",
              `transition-property: transform; transition-duration: 600ms; transition-timing-function: ease; transform: translateY(${u}px)`
            );
          }
        } else if (t.resets)
          switch ((f = n.wrapper) == null || f.classList.remove("av-ani-end"), (h = n.wrapper) == null || h.setAttribute("style", ""), n.animation) {
            case "av-style-12":
              I({
                targets: n.element.querySelectorAll("path"),
                strokeDashoffset: [0, I.setDashoffset],
                easing: "linear",
                duration: Number.parseInt(n.duration),
                delay: Number.parseInt(n.delay),
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
      (r) => {
        this.listenersCallback(r);
      },
      {
        passive: !0
      }
    ), window.addEventListener(
      "wheel",
      (r) => {
        this.listenersCallback(r);
      },
      {
        passive: !0
      }
    ), window.addEventListener(
      "resize",
      (r) => {
        this.listenersCallback(r);
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
  return new $e(e, r);
}
new $e();
export {
  pt as default
};
