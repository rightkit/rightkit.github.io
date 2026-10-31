/* Keep App Store support/policy navigation isolated, including links replaced by i18n. */
(function () {
  "use strict";

  function apply() {
    if (new URLSearchParams(location.search).get("ch") !== "mas") return;
    document.documentElement.setAttribute("data-ch", "mas");
    document.querySelectorAll(".back").forEach(function (element) {
      element.style.display = "none";
      element.removeAttribute("href");
    });
    document.querySelectorAll("a.logo").forEach(function (element) {
      element.removeAttribute("href");
      element.style.cursor = "default";
    });
    document.querySelectorAll("[data-website-only]").forEach(function (element) {
      element.hidden = true;
    });

    var base = new URL(location.href);
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var target;
      try { target = new URL(anchor.getAttribute("href"), base); } catch (error) { return; }
      if (target.origin !== base.origin) return;
      if (target.pathname === "/" || /\/index\.html$/.test(target.pathname)) {
        anchor.parentNode.replaceChild(document.createTextNode(anchor.textContent), anchor);
      } else if (/\/(support|privacy|terms|refund)\.html$/.test(target.pathname)) {
        target.searchParams.set("ch", "mas");
        anchor.setAttribute("href", target.href);
      }
    });
  }

  window.RKMASChannel = { apply: apply };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();
