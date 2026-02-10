/**
 * apply-flow: smooth scroll for internal CTA links (optional nicety).
 * Safe if anchors don't exist.
 */
(function () {
  const links = document.querySelectorAll('.applyFlow a[href^="#"]');
  if (!links.length) return;

  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
