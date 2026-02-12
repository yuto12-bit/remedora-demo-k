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
// Scroll Animation
// ==============================
(() => {
  const targets = $$(".module-wrapper");
  if (!targets.length) return;

  targets.forEach(el => el.classList.add("fade-in-up"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -100px 0px"
  });

  targets.forEach(el => observer.observe(el));
})();

// ==============================
// GA4 & Form Logic
// ==============================
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

const track = (name, params = {}) => {
  if (typeof gtag !== "function") return;
  gtag("event", name, { ...params });
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("a, button");
  if (!el) return;
  const eventName = el.dataset.event; 
  if (eventName) track(eventName);
});

// ==============================
// Pseudo Form Submit (Updated for Tour Request)
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

    // 実際の運用ではここでGAS等へ送信
    // デモなので即thanksへ
    setTimeout(() => {
      window.location.href = "thanks.html"; 
    }, 1500);
  });
});

// =========================================
// Variants Logic
// =========================================

/* Sim Income */
(() => {
  const fmt = (n) => Number(n).toLocaleString("ja-JP");
  const calc = (root) => {
    const dailyWageEl = root.querySelector('[data-role="daily-wage"]');
    const weeklyDaysEl = root.querySelector('[data-role="weekly-days"]');
    if (!dailyWageEl || !weeklyDaysEl) return;

    const daily = Number(dailyWageEl.value);
    const weekly = Number(weeklyDaysEl.value);
    const monthly = daily * weekly * 4;
    const yearly = monthly * 12;

    root.querySelector('[data-role="display-daily"]').textContent = fmt(daily);
    root.querySelector('[data-role="display-weekly"]').textContent = fmt(weekly);
    root.querySelector('[data-role="result-monthly"]').textContent = fmt(monthly);
    root.querySelector('[data-role="result-yearly"]').textContent = fmt(yearly);
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

/* Job Spec */
(function () {
  const roots = document.querySelectorAll("[data-accordion-root]");
  roots.forEach((root) => {
    const btn = root.querySelector("[data-accordion-toggle]");
    const panel = root.querySelector("[data-accordion-panel]");
    if (!btn || !panel) return;
    
    panel.hidden = true;
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !isOpen);
      panel.hidden = isOpen;
      btn.textContent = isOpen ? "条件の詳細を開く" : "条件の詳細を閉じる";
    });
  });
})();

// ==============================
// Page Fade In (Initial Load)
// ==============================
window.addEventListener("load", () => {
  // 画像などのリソースを含めて読み込みが完了したらフェードイン
  document.body.classList.add("is-loaded");
});

// 万が一読み込みが遅すぎた場合の保険（3秒後に強制表示）
setTimeout(() => {
  document.body.classList.add("is-loaded");
}, 3000);