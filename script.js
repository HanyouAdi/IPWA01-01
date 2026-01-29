const btn = document.querySelector("#button1"); // Select the button element
btn.addEventListener("click", () => { // Add click event listener
  btn.textContent = "YOU CLICKED ME!! ❤️"; // Change button text on click
  setTimeout(() => { // Set a timeout to revert text after 1 second
    btn.textContent = "Press me"; // Revert button text
  }, 1000); // 1000 milliseconds = 1 second
});

/*
// Enhanced: close collapse, then scroll to anchor with navbar offset
(function() {
  const navbarCollapse = document.getElementById('navbarNav');
  const navRoot = document.querySelector('.navbar');

  function getNavbarHeight() {
    return navRoot ? Math.ceil(navRoot.getBoundingClientRect().height) : 0;
  }

  function smoothScrollTo(el) {
    if (!el) return;
    const offset = getNavbarHeight() + 8; // small extra gap
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  // collect both anchor links and buttons inside navbar
  const navItems = document.querySelectorAll('.navbar-nav a, .navbar-nav button');

  navItems.forEach(item => {
    // If button has inline onclick like: document.getElementById('section1').scrollIntoView(...)
    // try to extract the target id and store it as data-target, then remove the inline onclick
    const onclickAttr = item.getAttribute && item.getAttribute('onclick');
    if (onclickAttr) {
      const m = onclickAttr.match(/getElementById\(['\"]([^'\"]+)['\"]\)/);
      if (m && m[1]) {
        item.dataset.targetId = m[1];
        item.removeAttribute('onclick');
      }
    }

    item.addEventListener('click', function (e) {
      // determine target selector
      let selector = null;
      if (this.tagName.toLowerCase() === 'a') {
        selector = this.getAttribute('href');
      }
      if (!selector && this.dataset && this.dataset.targetId) {
        selector = '#' + this.dataset.targetId;
      }
      if (!selector || !selector.startsWith('#')) {
        return; // not an internal anchor
      }

      e.preventDefault();
      const targetEl = document.querySelector(selector);

      // if collapse is open, close it first and wait for it to finish
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        const onHidden = function() {
          navbarCollapse.removeEventListener('hidden.bs.collapse', onHidden);
          smoothScrollTo(targetEl);
        };
        navbarCollapse.addEventListener('hidden.bs.collapse', onHidden);
        bsCollapse.hide();
      } else {
        // no collapse open — scroll immediately
        smoothScrollTo(targetEl);
      }
    });
  });
})(); 
*/ 

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});