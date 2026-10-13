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

  /* ---------- Artistas: baralho arrastável na horizontal ---------- */
  var artistsSection = $("#artistas");
  var data = (window.TAVALIM_ARTISTS || []).slice();
  var deckApi = null;

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase();
  }

  function buildCard(a) {
    var li = document.createElement("li");
    li.className = "art";
    var bar = document.createElement("i");
    bar.className = "art__bar"; bar.setAttribute("aria-hidden", "true");
    var photo = document.createElement("div");
    photo.className = "art__photo";
    function fb() {
      var f = document.createElement("div");
      f.className = "art__initials"; f.setAttribute("aria-hidden", "true");
      var sp = document.createElement("span"); sp.textContent = initials(a.name);
      f.appendChild(sp);
      return f;
    }
    if (a.photo) {
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
    var prevBtn = $("[data-art-prev]", artistsSection);
    var nextBtn = $("[data-art-next]", artistsSection);
    var live = $("[data-art-live]", artistsSection);
    var cards = data.map(function (a) { var c = buildCard(a); list.appendChild(c); return c; });
    var n = cards.length;
    $("[data-art-total]", artistsSection).textContent = String(n).padStart(2, "0");

    var pos = 0, target = 0, last = -1, raf = 0, t0 = 0;
    var cw = 300;

    function measure() { cw = cards[0].offsetWidth || 300; }

    function render() {
      for (var i = 0; i < n; i++) {
        var d = i - pos, k = clamp(1 - Math.abs(d), 0, 1), x, y, rot, sc, op, z;
        if (d >= 0) {            // cartas atrás: leque à direita
          x = d * cw * 0.17; y = d * -6; rot = d * 2.2; sc = 1 - d * 0.055;
          op = clamp(1 - (d - 4.2) * 1.2, 0, 1); z = 100 - i;
        } else {                 // cartas que já passaram: saem para a esquerda
          var s = -d;
          x = -s * cw * 1.05; y = s * 14; rot = -s * 9; sc = 1 - s * 0.04;
          op = clamp(1 - s * 0.95, 0, 1); z = 200 + i;
        }
        var el = cards[i];
        el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + rot.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
        el.style.opacity = op.toFixed(3);
        el.style.zIndex = z;
        el.style.setProperty("--k", k.toFixed(3));
        el.style.pointerEvents = op < 0.05 ? "none" : "";
      }
      var idx = clamp(Math.round(pos), 0, n - 1);
      if (idx !== last) {
        last = idx;
        curEl.textContent = String(idx + 1).padStart(2, "0");
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === n - 1;
        live.textContent = data[idx].name + ", " + (idx + 1) + " de " + n;
      }
    }

    function tick(t) {
      var dt = Math.min(48, t - (t0 || t)); t0 = t;
      var diff = target - pos;
      if (reduce || Math.abs(diff) < 0.0008) { pos = target; render(); raf = 0; t0 = 0; return; }
      pos += diff * (1 - Math.exp(-dt / 95));
      render();
      raf = requestAnimationFrame(tick);
    }
    function go(i) {
      target = clamp(Math.round(i), 0, n - 1);
      if (!raf) raf = requestAnimationFrame(tick);
    }

    /* arrastar (mouse, toque e caneta). Rolagem vertical da página continua livre (touch-action: pan-y). */
    var drag = null;
    deck.addEventListener("pointerdown", function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { x: e.clientX, p: pos, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false, id: e.pointerId };
    });
    deck.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        deck.classList.add("is-drag");
        try { deck.setPointerCapture(e.pointerId); } catch (err) {}
        if (raf) { cancelAnimationFrame(raf); raf = 0; t0 = 0; }
      }
      if (!drag.moved) return;
      var dt = Math.max(1, e.timeStamp - drag.lt);
      drag.v = 0.8 * drag.v + 0.2 * ((e.clientX - drag.lx) / dt);
      drag.lx = e.clientX; drag.lt = e.timeStamp;
      pos = clamp(drag.p - dx / (cw * 0.7), -0.25, n - 0.75);
      target = pos;
      render();
    });
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = drag; drag = null;
      deck.classList.remove("is-drag");
      if (!d.moved) return;
      d.suppress = true; suppressClick = true; setTimeout(function () { suppressClick = false; }, 0);
      go(pos - d.v * 220 / (cw * 0.7));
    }
    var suppressClick = false;
    deck.addEventListener("pointerup", endDrag);
    deck.addEventListener("pointercancel", endDrag);

    /* clicar numa carta próxima traz ela para a frente */
    cards.forEach(function (c, i) {
      c.addEventListener("click", function () { if (!suppressClick && i !== last) go(i); });
    });

    /* touchpad / roda horizontal */
    var wheelTimer = 0;
    deck.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (raf) { cancelAnimationFrame(raf); raf = 0; t0 = 0; }
      pos = clamp(pos + e.deltaX / (cw * 0.9), 0, n - 1); target = pos; render();
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(function () { go(pos); }, 120);
    }, { passive: false });

    /* teclado e botões */
    deck.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(last + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(last - 1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(n - 1); }
    });
    prevBtn.addEventListener("click", function () { go(last - 1); });
    nextBtn.addEventListener("click", function () { go(last + 1); });

    window.addEventListener("resize", function () { measure(); render(); });
    window.addEventListener("load", function () { measure(); render(); });
    measure(); render();

    /* um empurrãozinho quando a seção aparece, para mostrar que dá para arrastar */
    if (!reduce && "IntersectionObserver" in window) {
      var nudged = false;
      new IntersectionObserver(function (en, ob) {
        if (en[0].isIntersecting && !nudged) {
          nudged = true; ob.disconnect();
          setTimeout(function () { if (Math.abs(pos) < 0.01 && !drag) { target = 0.38; raf = raf || requestAnimationFrame(tick); setTimeout(function () { if (!drag && target === 0.38) go(0); }, 520); } }, 350);
        }
      }, { threshold: 0.6 }).observe(deck);
    }
    return { go: go };
  }

  if (artistsSection && data.length) {
    artistsSection.hidden = false;
    $$("[data-artists-link]").forEach(function (a) { a.hidden = false; });
    navLinks = $$(".hdr__nav a");
    navTargets = navLinks.map(function (a) { return $(a.getAttribute("href")); });
    deckApi = initDeck();
  }

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
