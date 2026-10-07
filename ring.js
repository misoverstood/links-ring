/*
  links-ring
  Shared footer ring for misoverstood's personal sites.
  https://github.com/misoverstood/links-ring

  Add a site: append it to SITES. Every footer updates within about 10 minutes.
  Change format: set MODE to "list" (all sites inline) or "ring" (prev / random / next).

  Mount point: any element with a data-links-ring attribute. It is filled at load,
  and any that appear later (app-style sites that re-render their footer) are
  filled as they appear. Filled elements get data-links-ring-filled.

  Separators render as: space, <span class="sep" aria-hidden="true">·</span>, space.
  Sites can style .sep if they want; sites that don't see a plain " · ".
*/
(function () {
  "use strict";

  var MODE = "list";

  // Fixed order. New sites go at the end.
  var SITES = [
    "muhummud.org",
    "thatstheworst.com",
    "flemingdon.org",
    "naseema.net",
    "iseentit.com",
    "kholvad.org"
  ];

  function hereIndex() {
    var host = (location.hostname || "").toLowerCase().replace(/^www\./, "");
    return SITES.indexOf(host);
  }

  function makeLink(domain, label, isCurrent) {
    var a = document.createElement("a");
    a.href = "https://" + domain + "/";
    a.textContent = label;
    if (label !== domain) a.title = domain;
    if (isCurrent) a.setAttribute("aria-current", "page");
    return a;
  }

  function addSep(nav) {
    var s = document.createElement("span");
    s.className = "sep";
    s.setAttribute("aria-hidden", "true");
    s.textContent = "\u00B7";
    nav.appendChild(document.createTextNode(" "));
    nav.appendChild(s);
    nav.appendChild(document.createTextNode(" "));
  }

  function renderList(nav, here) {
    SITES.forEach(function (domain, i) {
      if (i > 0) addSep(nav);
      nav.appendChild(makeLink(domain, domain, i === here));
    });
  }

  function renderRing(nav, here) {
    var n = SITES.length;
    var prev = here === -1 ? n - 1 : (here - 1 + n) % n;
    var next = (here + 1) % n;
    var others = SITES.filter(function (_, i) { return i !== here; });
    var rand = others[Math.floor(Math.random() * others.length)];
    nav.appendChild(makeLink(SITES[prev], "\u2190 prev", false));
    addSep(nav);
    nav.appendChild(makeLink(rand, "random", false));
    addSep(nav);
    nav.appendChild(makeLink(SITES[next], "next \u2192", false));
  }

  var HERE = -1;

  function fillAll() {
    var navs = document.querySelectorAll("[data-links-ring]:not([data-links-ring-filled])");
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      nav.setAttribute("data-links-ring-filled", "");
      nav.textContent = "";
      if (MODE === "ring") renderRing(nav, HERE);
      else renderList(nav, HERE);
    }
  }

  function init() {
    HERE = hereIndex();
    fillAll();
    if (window.MutationObserver) {
      new MutationObserver(fillAll).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();