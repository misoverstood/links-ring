/*
  links-ring
  Shared footer ring for misoverstood's personal sites.
  https://github.com/misoverstood/links-ring

  Add a site: append it to SITES. Every footer updates within about 10 minutes.
  Change format: set MODE to "list" (all sites inline) or "ring" (prev / random / next).

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

  function init() {
    var here = hereIndex();
    var navs = document.querySelectorAll("[data-links-ring]");
    for (var i = 0; i < navs.length; i++) {
      navs[i].textContent = "";
      if (MODE === "ring") renderRing(navs[i], here);
      else renderList(navs[i], here);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();