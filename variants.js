/* ===== variants.js (generated) ===== */

/* --- sim-income.js --- */
// sim-income.js（scoped）
// - ルート（data-component="sim-income"）内だけを触る
// - ID/グローバル変数の衝突を避ける
(() => {
  const fmt = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "0";
    return num.toLocaleString("ja-JP");
  };

  const calc = (root) => {
    const dailyWageEl = root.querySelector('[data-role="daily-wage"]');
    const weeklyDaysEl = root.querySelector('[data-role="weekly-days"]');
    const transportEl = root.querySelector('[data-role="transport"]');

    const dailyOut = root.querySelector('[data-role="display-daily"]');
    const weeklyOut = root.querySelector('[data-role="display-weekly"]');
    const transportOut = root.querySelector('[data-role="display-transport"]');

    const monthlyOut = root.querySelector('[data-role="result-monthly"]');
    const yearlyOut = root.querySelector('[data-role="result-yearly"]');

    if (!dailyWageEl || !weeklyDaysEl || !transportEl || !dailyOut || !weeklyOut || !transportOut || !monthlyOut || !yearlyOut) return;

    const daily = Number(dailyWageEl.value || 0);
    const weekly = Number(weeklyDaysEl.value || 0);
    const transport = Number(transportEl.value || 0);

    // 日給 × 週出勤日数 × 4週 ＋ 交通費（月額）
    const monthly = Math.max(0, daily * weekly * 4 + transport);
    const yearly = Math.max(0, monthly * 12);

    dailyOut.textContent = fmt(daily);
    weeklyOut.textContent = fmt(weekly);
    transportOut.textContent = fmt(transport);

    monthlyOut.textContent = fmt(monthly);
    yearlyOut.textContent = fmt(yearly);
  };

  const bind = (root) => {
    // 初期計算
    calc(root);

    // 入力監視
    root.querySelectorAll('input[type="range"]').forEach((el) => {
      el.addEventListener('input', () => calc(root));
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-component="sim-income"]').forEach(bind);
  });
})();


/* --- job-spec.js --- */
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


/* --- apply-flow.js --- */
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

