/* TAVALIM — comportamento da página. Sem dependências. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------- Cabeçalho e menu ---------- */
  var hdr = $(".hdr");
  var burger = $(".hdr__burger");
  var menu = $("#menu");

  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    hdr.classList.toggle("is-open", open);
  }
  burger.addEventListener("click", function () {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Vídeo do hero (Vimeo) ---------- */
  var video = $(".hero__video");
  if (video && !reduce) {
    video.addEventListener("load", function () { video.classList.add("is-ready"); });
    video.src = video.getAttribute("data-src");
  }

  /* ---------- Menu: seção atual ---------- */
  var navLinks = $$(".hdr__nav a");
  var navTargets = navLinks.map(function (a) { return $(a.getAttribute("href")); });

  /* ---------- Soluções: item ativo troca a cor do palco ---------- */
  var stage = $(".stage");
  var items = $$(".svc__item");
  function setActive(el) {
    items.forEach(function (i) { i.classList.toggle("is-active", i === el); });
    if (el && stage) stage.setAttribute("data-color", el.getAttribute("data-color"));
  }
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target); });
    }, { rootMargin: "-42% 0px -48% 0px" });
    items.forEach(function (i) { io.observe(i); });
    setActive(items[0]);
  } else {
    items.forEach(function (i) { i.classList.add("is-active"); });
  }

  /* ---------- Artistas: baralho de cartas ---------- */
  var artistsSection = $("#artistas");
  var data = (window.TAVALIM_ARTISTS || []).slice();

  function initials(name) {
    return name.split(/\s+/).filter(function (w) { return /^\p{L}/u.test(w); }).slice(0, 2)
      .map(function (p) { return p[0]; }).join("").toUpperCase();
  }

  function buildCard(a) {
    var li = document.createElement("li");
    li.className = "art" + (a.more ? " art--more" : "");
    var bar = document.createElement("i");
    bar.className = "art__bar"; bar.setAttribute("aria-hidden", "true");
    var photo = document.createElement("div");
    photo.className = "art__photo";
    function fb() {
      var f = document.createElement("div");
      f.className = "art__initials" + (a.more ? " art__initials--more" : "");
      f.setAttribute("aria-hidden", "true");
      var sp = document.createElement("span"); sp.textContent = a.more ? "+" : initials(a.name);
      f.appendChild(sp);
      return f;
    }
    if (a.photo && !a.more) {
      var img = document.createElement("img");
      img.src = a.photo; img.alt = ""; img.loading = "lazy"; img.decoding = "async"; img.draggable = false;
      img.addEventListener("error", function () { img.remove(); photo.appendChild(fb()); });
      photo.appendChild(img);
    } else {
      photo.appendChild(fb());
    }
    var info = document.createElement("div");
    info.className = "art__info";
    var name = document.createElement("h3");
    name.className = "art__name"; name.textContent = a.name;
    info.appendChild(name);
    if (a.note) {
      var note = document.createElement("p");
      note.className = "art__note"; note.textContent = a.note;
      info.appendChild(note);
    }
    li.appendChild(photo); li.appendChild(bar); li.appendChild(info);
    return li;
  }

  function initDeck() {
    var deck = $("[data-deck]", artistsSection);
    var list = $("[data-art-track]", artistsSection);
    var curEl = $("[data-art-cur]", artistsSection);
    var live = $("[data-art-live]", artistsSection);
    var cards = data.map(function (a) { var c = buildCard(a); list.appendChild(c); return c; });
    var n = cards.length;
    var order = cards.map(function (_, i) { return i; });   // order[0] = carta da vez
    $("[data-art-total]", artistsSection).textContent = String(n).padStart(2, "0");

    var cw = 300, vw = window.innerWidth, curDx = 0, busy = false, anim = 0, drag = null;
    function measure() { cw = cards[0].offsetWidth || 300; vw = window.innerWidth; }

    /* pequenas "imperfeições" fixas por carta, como num baralho de verdade */
    function jr(i) { return ((i * 53) % 17 - 8) * 0.55; }
    function jx(i) { return ((i * 37) % 13 - 6) * 3.2; }

    function layout(dx) {
      curDx = dx;
      var p = clamp(Math.abs(dx) / (cw * 0.6), 0, 1);
      for (var r = 0; r < n; r++) {
        var i = order[r], el = cards[i], x, y, rot, sc, op, k, z;
        if (r === 0) {                       // carta da vez: colorida, acompanha o dedo
          x = dx; y = -p * 10; rot = jr(i) * 0.25 + dx / cw * 14; sc = 1; op = 1; k = 1 - p; z = 200;
        } else {                             // pilha: preto e branco, sobe um degrau quando a de cima sai
          var s = r - p, f = clamp(s, 0, 1);
          x = jx(i) * f; y = s * 8; rot = jr(i) * (0.25 + 0.75 * f); sc = 1 - s * 0.03;
          op = clamp(1 - (s - 4), 0, 1); k = r === 1 ? p : 0; z = 200 - r;
        }
        el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + rot.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
        el.style.opacity = op.toFixed(3);
        el.style.visibility = op < 0.01 ? "hidden" : "visible";
        el.style.zIndex = z;
        el.classList.toggle("is-top", r === 0);
        el.style.setProperty("--k", k.toFixed(3));
      }
    }

    function setCurrent() {
      var idx = order[0];
      curEl.textContent = String(idx + 1).padStart(2, "0");
      live.textContent = data[idx].name + ", " + (idx + 1) + " de " + n;
    }

    function tween(from, to, dur, done) {
      if (anim) cancelAnimationFrame(anim);
      busy = true;
      var t0 = performance.now(); dur = reduce ? 1 : dur;
      (function step(t) {
        var u = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - u, 3);
        layout(from + (to - from) * e);
        if (u < 1) { anim = requestAnimationFrame(step); }
        else { anim = 0; busy = false; if (done) done(); }
      })(t0);
    }

    function next(dir) {            // dir = -1 sai para a esquerda, +1 para a direita; vai para o fim do baralho
      if (busy) return;
      var off = (dir || -1) * (vw / 2 + cw);
      tween(curDx, off, 300, function () { order.push(order.shift()); setCurrent(); layout(0); });
    }
    function prev() {               // traz de volta a última carta do baralho
      if (busy) return;
      order.unshift(order.pop()); setCurrent();
      tween(-(vw / 2 + cw), 0, 340);
    }

    /* arrastar a carta (mouse, toque, caneta). A rolagem vertical da página continua livre. */
    deck.addEventListener("pointerdown", function (e) {
      if (busy || (e.button !== undefined && e.button !== 0)) return;
      drag = { x: e.clientX, id: e.pointerId, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false };
    });
    deck.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true; deck.classList.add("is-drag");
        try { deck.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (!drag.moved) return;
      var dt = Math.max(1, e.timeStamp - drag.lt);
      drag.v = 0.7 * drag.v + 0.3 * ((e.clientX - drag.lx) / dt);
      drag.lx = e.clientX; drag.lt = e.timeStamp;
      layout(dx);
    });
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = drag; drag = null; deck.classList.remove("is-drag");
      if (!d.moved) { if (e && e.type === "pointerup") next(-1); return; }   // toque = próxima carta
      var dx = curDx, fast = Math.abs(d.v) > 0.45 && (d.v > 0) === (dx > 0);
      if (Math.abs(dx) > cw * 0.28 || fast) next(dx > 0 ? 1 : -1);
      else tween(dx, 0, 260);
    }
    deck.addEventListener("pointerup", endDrag);
    deck.addEventListener("pointercancel", endDrag);

    /* touchpad na horizontal */
    var lastWheel = 0;
    deck.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      var now = performance.now();
      if (Math.abs(e.deltaX) > 30 && now - lastWheel > 480 && !busy) {
        lastWheel = now;
        if (e.deltaX > 0) next(-1); else prev();
      }
    }, { passive: false });

    deck.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); next(-1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    });
    $("[data-art-prev]", artistsSection).addEventListener("click", prev);
    $("[data-art-next]", artistsSection).addEventListener("click", function () { next(-1); });

    window.addEventListener("resize", function () { measure(); layout(curDx); });
    window.addEventListener("load", function () { measure(); layout(curDx); });
    measure(); setCurrent(); layout(0);

    /* um empurrãozinho quando o baralho aparece, para mostrar que a carta se move */
    if (!reduce && "IntersectionObserver" in window) {
      var nudged = false;
      new IntersectionObserver(function (en, ob) {
        if (en[0].isIntersecting && !nudged) {
          nudged = true; ob.disconnect();
          setTimeout(function () {
            if (!busy && !drag) tween(0, -52, 320, function () { tween(-52, 0, 420); });
          }, 400);
        }
      }, { threshold: 0.6 }).observe(deck);
    }
  }

  if (artistsSection && data.length) {
    artistsSection.hidden = false;
    $$("[data-artists-link]").forEach(function (a) { a.hidden = false; });
    navLinks = $$(".hdr__nav a");
    navTargets = navLinks.map(function (a) { return $(a.getAttribute("href")); });
    initDeck();
  }

  /* ---------- Equipamentos: painel de LED em canvas ---------- */
  (function initLed() {
    var cv = $(".rig__led");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var RED = [239, 62, 66], GREEN = [109, 192, 90], CYAN = [101, 207, 246];
    var PAL = [RED, GREEN, CYAN];
    var w = 0, h = 0, cell = 12, cols = 0, rows = 0, dpr = 1, mask = null;
    var visible = false, raf = 0, last = 0;

    function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    function pal(u) {                       // u contínuo, repete a cada 3
      u = ((u % 3) + 3) % 3; var i = Math.floor(u), f = u - i;
      return mix(PAL[i], PAL[(i + 1) % 3], f);
    }

    function size() {
      var r = cv.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cell = w < 520 ? 8 : 12;
      cols = Math.floor(w / cell); rows = Math.floor(h / cell);
      var off = document.createElement("canvas"); off.width = cols; off.height = rows;
      var oc = off.getContext("2d");
      oc.fillStyle = "#000"; oc.fillRect(0, 0, cols, rows);
      oc.fillStyle = "#fff"; oc.textAlign = "center"; oc.textBaseline = "middle";
      var fs = Math.floor(Math.min(rows * 0.5, cols / 5.4));
      oc.font = "800 " + fs + "px Archivo, Arial, sans-serif";
      oc.fillText("TAVALIM", cols / 2, rows / 2 + 1);
      mask = oc.getImageData(0, 0, cols, rows).data;
    }

    function draw(t) {
      if (!mask) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#060606"; ctx.fillRect(0, 0, w, h);
      var pad = (w - cols * cell) / 2, size = cell - 1.6, pulse = 0.88 + 0.12 * Math.sin(t * 3);
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var on = mask[(y * cols + x) * 4] > 110;
          var wv = (Math.sin(x * 0.17 + t * 1.1) + Math.sin(y * 0.24 - t * 0.8) + Math.sin((x + y) * 0.09 + t * 0.55)) / 3;
          var col, a;
          if (on) { col = pal(x / cols * 3 + t * 0.45); a = pulse; }
          else { col = pal((wv + 1) * 1.5 + t * 0.12); a = 0.1 + 0.16 * (wv + 1) / 2; }
          ctx.fillStyle = "rgba(" + (col[0] | 0) + "," + (col[1] | 0) + "," + (col[2] | 0) + "," + a.toFixed(3) + ")";
          ctx.fillRect(pad + x * cell + 0.8, y * cell + 0.8, size, size);
        }
      }
      // emendas entre os módulos do painel
      ctx.fillStyle = "rgba(0,0,0,.7)";
      for (var cx = 8; cx < cols; cx += 8) ctx.fillRect(pad + cx * cell - 1, 0, 2, h);
      for (var cy = 8; cy < rows; cy += 8) ctx.fillRect(0, cy * cell - 1, w, 2);
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last > 33) { last = now; draw(now / 1000); }
      raf = requestAnimationFrame(loop);
    }

    size(); draw(1.6);
    window.addEventListener("resize", function () { size(); draw(1.6); });
    window.addEventListener("load", function () { size(); draw(1.6); });
    if (reduce || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    }, { rootMargin: "80px" }).observe(cv);
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(loop); });
  })();

  /* ---------- Rolagem: um único ouvinte ---------- */
  var hero = $(".hero");
  var heroMedia = $(".hero__media");
  var heroInner = $(".hero__inner");
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    hdr.classList.toggle("is-solid", y > 40);

    if (hero && !reduce) {
      var h = hero.offsetHeight;
      if (y < h) {
        var t = y / h;
        heroMedia.style.transform = "translate3d(0," + (y * 0.22) + "px,0) scale(" + (1 + t * 0.06) + ")";
        heroInner.style.transform = "translate3d(0," + (y * -0.12) + "px,0)";
        heroInner.style.opacity = String(1 - t * 1.25);
      }
    }

    var mark = y + window.innerHeight * 0.35, cur = -1;
    navTargets.forEach(function (el, i) { if (el && !el.hidden && el.offsetTop <= mark) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle("is-current", i === cur); });

    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
})();
