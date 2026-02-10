/**
 * job-spec: mobile-friendly accordion (details section).
 * No dependencies. Safe if multiple instances exist.
 */
(function () {
  const roots = document.querySelectorAll("[data-accordion-root]");
  if (!roots.length) return;

  roots.forEach((root) => {
    const btn = root.querySelector("[data-accordion-toggle]");
    const panel = root.querySelector("[data-accordion-panel]");
    if (!btn || !panel) return;

    const open = () => {
      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      btn.textContent = "条件の詳細（福利厚生・手当・試用期間）を閉じる";
    };

    const close = () => {
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      btn.textContent = "条件の詳細（福利厚生・手当・試用期間）を開く";
    };

    // 初期は閉じる
    close();

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
  });
})();
