// ==============================
// Safe Helpers
// ==============================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ==============================
// Mobile Menu
// ==============================
(() => {
  const toggle = $(".header__toggle");
  const nav = $(".header__nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
})();

// ==============================
// FAQ Accordion
// ==============================
(() => {
  const faqItems = $$(".faq__item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const q = $(".faq__q", item);
    if (!q) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
})();

// ==============================
// GA4 Event Tracking
// ==============================
(() => {
  const PAGE_ID = document.body?.dataset?.pageId || "unknown_lp";

  const track = (name, params = {}) => {
    if (typeof gtag !== "function") return;
    gtag("event", name, {
      page_id: PAGE_ID,
      ...params,
    });
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("a, button");
    if (!el) return;

    const href = el.getAttribute("href") || "";
    const label = el.textContent.trim().slice(0, 30);
    const eventName = el.dataset.event; 

    if (eventName) {
      track(eventName, { event_label: label });
      if (eventName.includes("cta") || eventName.includes("submit")) {
         track("apply_click", { event_label: label, link_url: href });
      }
    }

    if (href.startsWith("tel:")) {
      track("click_tel", { event_label: href.replace("tel:", "") });
    }
    if (/line\.me|lin\.ee/i.test(href)) {
      track("click_line", { event_label: label });
    }
  });
})();

// ==============================
// Pseudo Form Submit
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const requiredInputs = form.querySelectorAll("[required]");
    let hasError = false;
    requiredInputs.forEach((input) => {
      if (!input.value.trim() || (input.type === "checkbox" && !input.checked)) {
        hasError = true;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "";
      }
    });

    if (hasError) {
      alert("必須項目を入力してください。");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "送信中...";
    }

    setTimeout(() => {
      window.location.href = "thanks.html"; 
    }, 1500);
  });
});

// =========================================
// Variants Logic (Integrated)
// =========================================

/* --- sim-income.js --- */
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

    const monthly = Math.max(0, daily * weekly * 4 + transport);
    const yearly = Math.max(0, monthly * 12);

    dailyOut.textContent = fmt(daily);
    weeklyOut.textContent = fmt(weekly);
    transportOut.textContent = fmt(transport);

    monthlyOut.textContent = fmt(monthly);
    yearlyOut.textContent = fmt(yearly);
  };

  const bind = (root) => {
    calc(root);
    root.querySelectorAll('input[type="range"]').forEach((el) => {
      el.addEventListener('input', () => calc(root));
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-component="sim-income"]').forEach(bind);
  });
})();


/* --- job-spec.js --- */
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

    close();

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });
  });
})();