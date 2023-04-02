var y = /* @__PURE__ */ ((u) => (u[u.Partial = 0] = "Partial", u[u.In = 1] = "In", u[u.Out = 2] = "Out", u))(y || {}), I = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, p = {}, L = {
  get exports() {
    return p;
  },
  set exports(u) {
    p = u;
  }
}, v = {}, A = {
  get exports() {
    return v;
  },
  set exports(u) {
    v = u;
  }
}, E;
function q() {
  return E || (E = 1, function(u) {
    (function(r, e) {
      u.exports ? u.exports = e() : r.EvEmitter = e();
    })(typeof window < "u" ? window : I, function() {
      function r() {
      }
      let e = r.prototype;
      return e.on = function(a, n) {
        if (!a || !n)
          return this;
        let l = this._events = this._events || {}, o = l[a] = l[a] || [];
        return o.includes(n) || o.push(n), this;
      }, e.once = function(a, n) {
        if (!a || !n)
          return this;
        this.on(a, n);
        let l = this._onceEvents = this._onceEvents || {}, o = l[a] = l[a] || {};
        return o[n] = !0, this;
      }, e.off = function(a, n) {
        let l = this._events && this._events[a];
        if (!l || !l.length)
          return this;
        let o = l.indexOf(n);
        return o != -1 && l.splice(o, 1), this;
      }, e.emitEvent = function(a, n) {
        let l = this._events && this._events[a];
        if (!l || !l.length)
          return this;
        l = l.slice(0), n = n || [];
        let o = this._onceEvents && this._onceEvents[a];
        for (let s of l)
          o && o[s] && (this.off(a, s), delete o[s]), s.apply(this, n);
        return this;
      }, e.allOff = function() {
        return delete this._events, delete this._onceEvents, this;
      }, r;
    });
  }(A)), v;
}
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(u) {
  (function(r, e) {
    u.exports ? u.exports = e(r, q()) : r.imagesLoaded = e(r, r.EvEmitter);
  })(
    typeof window < "u" ? window : I,
    function(e, a) {
      let n = e.jQuery, l = e.console;
      function o(t) {
        return Array.isArray(t) ? t : typeof t == "object" && typeof t.length == "number" ? [...t] : [t];
      }
      function s(t, i, d) {
        if (!(this instanceof s))
          return new s(t, i, d);
        let h = t;
        if (typeof t == "string" && (h = document.querySelectorAll(t)), !h) {
          l.error(`Bad element for imagesLoaded ${h || t}`);
          return;
        }
        this.elements = o(h), this.options = {}, typeof i == "function" ? d = i : Object.assign(this.options, i), d && this.on("always", d), this.getImages(), n && (this.jqDeferred = new n.Deferred()), setTimeout(this.check.bind(this));
      }
      s.prototype = Object.create(a.prototype), s.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this);
      };
      const c = [1, 9, 11];
      s.prototype.addElementImages = function(t) {
        t.nodeName === "IMG" && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        let { nodeType: i } = t;
        if (!i || !c.includes(i))
          return;
        let d = t.querySelectorAll("img");
        for (let h of d)
          this.addImage(h);
        if (typeof this.options.background == "string") {
          let h = t.querySelectorAll(this.options.background);
          for (let w of h)
            this.addElementBackgroundImages(w);
        }
      };
      const m = /url\((['"])?(.*?)\1\)/gi;
      s.prototype.addElementBackgroundImages = function(t) {
        let i = getComputedStyle(t);
        if (!i)
          return;
        let d = m.exec(i.backgroundImage);
        for (; d !== null; ) {
          let h = d && d[2];
          h && this.addBackground(h, t), d = m.exec(i.backgroundImage);
        }
      }, s.prototype.addImage = function(t) {
        let i = new f(t);
        this.images.push(i);
      }, s.prototype.addBackground = function(t, i) {
        let d = new g(t, i);
        this.images.push(d);
      }, s.prototype.check = function() {
        if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) {
          this.complete();
          return;
        }
        let t = (i, d, h) => {
          setTimeout(() => {
            this.progress(i, d, h);
          });
        };
        this.images.forEach(function(i) {
          i.once("progress", t), i.check();
        });
      }, s.prototype.progress = function(t, i, d) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, i]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && l && l.log(`progress: ${d}`, t, i);
      }, s.prototype.complete = function() {
        let t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
          let i = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[i](this);
        }
      };
      function f(t) {
        this.img = t;
      }
      f.prototype = Object.create(a.prototype), f.prototype.check = function() {
        if (this.getIsImageComplete()) {
          this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
          return;
        }
        this.proxyImage = new Image(), this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src;
      }, f.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth;
      }, f.prototype.confirm = function(t, i) {
        this.isLoaded = t;
        let { parentNode: d } = this.img, h = d.nodeName === "PICTURE" ? d : this.img;
        this.emitEvent("progress", [this, h, i]);
      }, f.prototype.handleEvent = function(t) {
        let i = "on" + t.type;
        this[i] && this[i](t);
      }, f.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents();
      }, f.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }, f.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      };
      function g(t, i) {
        this.url = t, this.element = i, this.img = new Image();
      }
      return g.prototype = Object.create(f.prototype), g.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"), this.unbindEvents());
      }, g.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
      }, g.prototype.confirm = function(t, i) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, i]);
      }, s.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (n = t, n.fn.imagesLoaded = function(i, d) {
          return new s(this, i, d).jqDeferred.promise(n(this));
        });
      }, s.makeJQueryPlugin(), s;
    }
  );
})(L);
class b {
  constructor(r = "[data-av]", e) {
    return this.groups = [], document.querySelectorAll(r).forEach((n) => {
      let l = n.getAttribute("data-av") ?? "";
      e != null && e.group && (l = e.group);
      let o = n.getAttribute("data-av-sequential") ?? !1;
      o = o !== !1, e != null && e.sequential && (o = e.sequential);
      let s = !!n.hasAttribute("data-av-resets");
      e != null && e.resets && (s = e.resets);
      let c = !!n.hasAttribute(
        "data-av-only-when-totally-in"
      );
      e != null && e.onlyWhenTotallyIn && (c = e.onlyWhenTotallyIn);
      let m = {
        name: l,
        sequential: o,
        resets: s,
        onlyWhenTotallyIn: c,
        items: []
      };
      this.groups.find((f) => f.name == m.name) || this.groups.push(m);
    }), this.groups.forEach((n) => {
      let l = document.querySelectorAll(`[data-av="${n.name}"]`);
      r != "[data-av]" && (l = document.querySelectorAll(r));
      let o = Array.from(l);
      n.sequential && o.sort((s, c) => {
        let m = s.getAttribute("data-av-sequential") ?? "", f = c.getAttribute("data-av-sequential") ?? "", g = o.indexOf(s), t = o.indexOf(c);
        return e != null && e.optionsItem && e.optionsItem[g].sequentialOrder && (m = e.optionsItem[g].sequentialOrder ?? ""), e != null && e.optionsItem && e.optionsItem[t].sequentialOrder && (f = e.optionsItem[t].sequentialOrder ?? ""), m > f ? 1 : m < f ? -1 : 0;
      }), o.forEach((s, c) => {
        let m = "600", f = n.items.length > 0 ? n.items[n.items.length - 1].duration : "0", g = n.items.length > 0 ? n.items[n.items.length - 1].delay : "0", t = "av-style-01", i = s.getAttribute("data-av-animation") ?? t;
        e != null && e.animation && (i = e.animation), e != null && e.optionsItem && e.optionsItem[c].animation && (i = e.optionsItem[c].animation ?? t);
        let d = s.getAttribute("data-av-animation-duration") ?? m;
        e != null && e.duration && (d = e.duration), e != null && e.optionsItem && e.optionsItem[c].duration && (d = e.optionsItem[c].duration ?? m);
        let h = s.getAttribute("data-av-animation-delay") ?? 0;
        e != null && e.delay && (h = e.delay), e != null && e.optionsItem && e.optionsItem[c].delay && (h = e.optionsItem[c].delay ?? 0), h = h || (n.sequential ? Number(f) + Number(g) : h), n.items.push({
          element: s,
          group: n,
          animation: i,
          duration: d,
          delay: h
        });
      });
    }), this.startBooting(), window.addEventListener("load", () => {
      p("body", { background: !0 }, () => {
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
    const e = r.element.getBoundingClientRect(), a = {
      top: 0,
      right: window.innerWidth || document.documentElement.clientWidth,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      left: 0
    };
    return e.bottom >= a.top && e.right >= a.left && e.top <= a.bottom && e.left <= a.right ? e.top >= a.top && e.left >= a.left && e.bottom <= a.bottom && e.right <= a.right ? y.In : y.Partial : y.Out;
  }
  init() {
    this.groups.forEach((r) => {
      r.items.forEach((e) => {
        var a;
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
            this.elAddWrapper(e), (a = e.wrapper) == null || a.setAttribute(
              "class",
              `av-animation av-animation--${e.animation} av-animation-duration av-animation-duration--${e.duration} av-animation-delay av-animation-delay--${e.delay}`
            );
            break;
        }
      });
    });
  }
  listenersCallback() {
    this.groups.forEach((r) => {
      r.items.forEach((e) => {
        var a, n, l, o, s, c;
        if (this.isInViewport(e) == y.In || !r.onlyWhenTotallyIn && this.isInViewport(e) == y.Partial)
          if (r.sequential) {
            let m = 1;
            (a = e.wrapper) != null && a.classList.contains("av-ani-end") || (this.isInViewport(e) == y.In || !r.onlyWhenTotallyIn && this.isInViewport(e) == y.Partial) && ((n = e.wrapper) == null || n.classList.add(
              "av-animation-delay--" + Number(e.delay) * m
            ), (l = e.wrapper) == null || l.classList.add("av-ani-end"), m++);
          } else
            (o = e.wrapper) != null && o.classList.contains("av-ani-end") || (s = e.wrapper) == null || s.classList.add("av-ani-end");
        else
          r.resets && ((c = e.wrapper) == null || c.classList.remove("av-ani-end"));
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
    const e = document.createElement("div");
    r.element.insertAdjacentElement("afterend", e), e.appendChild(r.element), r.wrapper = e;
  }
}
function k(u, r) {
  return new b(u, r);
}
new b();
export {
  k as default
};
