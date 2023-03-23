var m = /* @__PURE__ */ ((d) => (d[d.Partial = 0] = "Partial", d[d.In = 1] = "In", d[d.Out = 2] = "Out", d))(m || {}), b = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, v = {}, L = {
  get exports() {
    return v;
  },
  set exports(d) {
    v = d;
  }
}, y = {}, A = {
  get exports() {
    return y;
  },
  set exports(d) {
    y = d;
  }
}, E;
function k() {
  return E || (E = 1, function(d) {
    (function(n, e) {
      d.exports ? d.exports = e() : n.EvEmitter = e();
    })(typeof window < "u" ? window : b, function() {
      function n() {
      }
      let e = n.prototype;
      return e.on = function(r, s) {
        if (!r || !s)
          return this;
        let a = this._events = this._events || {}, l = a[r] = a[r] || [];
        return l.includes(s) || l.push(s), this;
      }, e.once = function(r, s) {
        if (!r || !s)
          return this;
        this.on(r, s);
        let a = this._onceEvents = this._onceEvents || {}, l = a[r] = a[r] || {};
        return l[s] = !0, this;
      }, e.off = function(r, s) {
        let a = this._events && this._events[r];
        if (!a || !a.length)
          return this;
        let l = a.indexOf(s);
        return l != -1 && a.splice(l, 1), this;
      }, e.emitEvent = function(r, s) {
        let a = this._events && this._events[r];
        if (!a || !a.length)
          return this;
        a = a.slice(0), s = s || [];
        let l = this._onceEvents && this._onceEvents[r];
        for (let o of a)
          l && l[o] && (this.off(r, o), delete l[o]), o.apply(this, s);
        return this;
      }, e.allOff = function() {
        return delete this._events, delete this._onceEvents, this;
      }, n;
    });
  }(A)), y;
}
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(d) {
  (function(n, e) {
    d.exports ? d.exports = e(n, k()) : n.imagesLoaded = e(n, n.EvEmitter);
  })(
    typeof window < "u" ? window : b,
    function(e, r) {
      let s = e.jQuery, a = e.console;
      function l(t) {
        return Array.isArray(t) ? t : typeof t == "object" && typeof t.length == "number" ? [...t] : [t];
      }
      function o(t, i, h) {
        if (!(this instanceof o))
          return new o(t, i, h);
        let c = t;
        if (typeof t == "string" && (c = document.querySelectorAll(t)), !c) {
          a.error(`Bad element for imagesLoaded ${c || t}`);
          return;
        }
        this.elements = l(c), this.options = {}, typeof i == "function" ? h = i : Object.assign(this.options, i), h && this.on("always", h), this.getImages(), s && (this.jqDeferred = new s.Deferred()), setTimeout(this.check.bind(this));
      }
      o.prototype = Object.create(r.prototype), o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this);
      };
      const p = [1, 9, 11];
      o.prototype.addElementImages = function(t) {
        t.nodeName === "IMG" && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        let { nodeType: i } = t;
        if (!i || !p.includes(i))
          return;
        let h = t.querySelectorAll("img");
        for (let c of h)
          this.addImage(c);
        if (typeof this.options.background == "string") {
          let c = t.querySelectorAll(this.options.background);
          for (let w of c)
            this.addElementBackgroundImages(w);
        }
      };
      const f = /url\((['"])?(.*?)\1\)/gi;
      o.prototype.addElementBackgroundImages = function(t) {
        let i = getComputedStyle(t);
        if (!i)
          return;
        let h = f.exec(i.backgroundImage);
        for (; h !== null; ) {
          let c = h && h[2];
          c && this.addBackground(c, t), h = f.exec(i.backgroundImage);
        }
      }, o.prototype.addImage = function(t) {
        let i = new u(t);
        this.images.push(i);
      }, o.prototype.addBackground = function(t, i) {
        let h = new g(t, i);
        this.images.push(h);
      }, o.prototype.check = function() {
        if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) {
          this.complete();
          return;
        }
        let t = (i, h, c) => {
          setTimeout(() => {
            this.progress(i, h, c);
          });
        };
        this.images.forEach(function(i) {
          i.once("progress", t), i.check();
        });
      }, o.prototype.progress = function(t, i, h) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, i]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && a && a.log(`progress: ${h}`, t, i);
      }, o.prototype.complete = function() {
        let t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
          let i = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[i](this);
        }
      };
      function u(t) {
        this.img = t;
      }
      u.prototype = Object.create(r.prototype), u.prototype.check = function() {
        if (this.getIsImageComplete()) {
          this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
          return;
        }
        this.proxyImage = new Image(), this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src;
      }, u.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth;
      }, u.prototype.confirm = function(t, i) {
        this.isLoaded = t;
        let { parentNode: h } = this.img, c = h.nodeName === "PICTURE" ? h : this.img;
        this.emitEvent("progress", [this, c, i]);
      }, u.prototype.handleEvent = function(t) {
        let i = "on" + t.type;
        this[i] && this[i](t);
      }, u.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents();
      }, u.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }, u.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      };
      function g(t, i) {
        this.url = t, this.element = i, this.img = new Image();
      }
      return g.prototype = Object.create(u.prototype), g.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"), this.unbindEvents());
      }, g.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      }, g.prototype.confirm = function(t, i) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, i]);
      }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (s = t, s.fn.imagesLoaded = function(i, h) {
          return new o(this, i, h).jqDeferred.promise(s(this));
        });
      }, o.makeJQueryPlugin(), o;
    }
  );
})(L);
class I {
  constructor(n = "[data-av]", e) {
    return this.groups = [], document.querySelectorAll(n).forEach((s) => {
      let a = s.getAttribute("data-av") ?? "", l = s.getAttribute("data-av-sequential") ?? !1;
      l = l !== !1;
      let o = !!s.hasAttribute("data-av-resets"), p = !!s.hasAttribute(
        "data-av-only-when-totally-in"
      ), f = {
        name: a,
        sequential: l,
        resets: o,
        onlyWhenTotallyIn: p,
        items: []
      };
      this.groups.find((u) => u.name == f.name) || this.groups.push(f);
    }), this.groups.forEach((s) => {
      let a = document.querySelectorAll(`[data-av="${s.name}"]`), l = Array.from(a);
      s.sequential && l.sort((o, p) => {
        let f = o.getAttribute("data-av-sequential") ?? "", u = p.getAttribute("data-av-sequential") ?? "";
        return f > u ? 1 : f < u ? -1 : 0;
      }), l.forEach((o) => {
        let p = "300", f = s.items.length > 0 ? s.items[s.items.length - 1].duration : "0", u = s.items.length > 0 ? s.items[s.items.length - 1].delay : "0", g = o.getAttribute("data-av-animation") ?? "av-style-01", t = o.getAttribute("data-av-animation-duration") ?? p, i = o.getAttribute("data-av-animation-delay") ?? 0;
        i = i || (s.sequential ? Number(f) + Number(u) : i), s.items.push({
          element: o,
          group: s,
          animation: g,
          duration: t,
          delay: i
        });
      });
    }), console.log(this.groups), this.startBooting(), window.addEventListener("load", () => {
      v("body", { background: !0 }, () => {
        this.init(), this.addListeners(), this.finishBooting();
      });
    }), this;
  }
  startBooting() {
    var n;
    (n = document.querySelector("body")) == null || n.setAttribute("style", "opacity:0");
  }
  finishBooting() {
    var n;
    (n = document.querySelector("body")) == null || n.setAttribute("style", "");
  }
  isInViewport(n) {
    const e = n.element.getBoundingClientRect(), r = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0
    };
    return e.bottom >= r.top && e.right >= r.left && e.top <= r.bottom && e.left <= r.right ? e.top >= r.top && e.left >= r.left && e.bottom <= r.bottom && e.right <= r.right ? m.In : m.Partial : m.Out;
  }
  init() {
    this.groups.forEach((n) => {
      n.items.forEach((e) => {
        var r;
        switch (e.animation) {
          case "av-style-01":
          case "av-style-02":
          case "av-style-03":
          case "av-style-04":
          case "av-style-05":
          case "av-style-06":
          case "av-style-07":
          case "av-style-08":
          case "av-style-09":
          case "av-style-10":
          case "av-style-11":
            this.elAddWrapper(e), (r = e.wrapper) == null || r.setAttribute(
              "class",
              `av-animation av-animation--${e.animation} av-animation-duration av-animation-duration--${e.duration} av-animation-delay av-animation-delay--${e.delay}`
            );
            break;
        }
      });
    });
  }
  listenersCallback() {
    this.groups.forEach((n) => {
      n.items.forEach((e) => {
        var r, s, a, l, o, p;
        if (this.isInViewport(e) == m.In || !n.onlyWhenTotallyIn && this.isInViewport(e) == m.Partial)
          if (n.sequential) {
            let f = 1;
            (r = e.wrapper) != null && r.classList.contains("av-ani-end") || (this.isInViewport(e) == m.In || !n.onlyWhenTotallyIn && this.isInViewport(e) == m.Partial) && ((s = e.wrapper) == null || s.classList.add(
              "av-animation-delay--" + Number(e.delay) * f
            ), (a = e.wrapper) == null || a.classList.add("av-ani-end"), f++);
          } else
            (l = e.wrapper) != null && l.classList.contains("av-ani-end") || (o = e.wrapper) == null || o.classList.add("av-ani-end");
        else
          n.resets && ((p = e.wrapper) == null || p.classList.remove("av-ani-end"));
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
  elAddWrapper(n) {
    const e = document.createElement("div");
    n.element.insertAdjacentElement("afterend", e), e.appendChild(n.element), n.wrapper = e;
  }
}
function q(d, n) {
  return new I(d, n);
}
new I();
export {
  q as default
};
