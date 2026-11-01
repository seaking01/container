/*======================================================
CLOUDBRIDGE TECHNOLOGIES — site scripts
======================================================*/

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Loader ---------- */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader && loader.classList.add('hide'), 400);
    });
    // Fallback in case 'load' already fired or takes too long
    setTimeout(() => loader && loader.classList.add('hide'), 3500);

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Hamburger navigation ---------- */
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');

    function closeNav() {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        navOverlay.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    function openNav() {
        nav.classList.add('open');
        navToggle.classList.add('open');
        navOverlay.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            nav.classList.contains('open') ? closeNav() : openNav();
        });
    }
    if (navOverlay) navOverlay.addEventListener('click', closeNav);
    document.querySelectorAll('#navList a').forEach(link => {
        link.addEventListener('click', closeNav);
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });

    /* ---------- Animated stat counters ---------- */
    const statEls = document.querySelectorAll('.stats h2[data-count]');
    const animateCount = (el) => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    };
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    statEls.forEach(el => statObserver.observe(el));

    /* ---------- Scroll reveal for sections ---------- */
    const revealTargets = document.querySelectorAll(
        '.sectionTitle, .serviceCard, .tech, .trainingCard, .portfolioCard, .contactCard, .aboutCard, .aboutGrid > div, .consultContainer'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => revealObserver.observe(el));

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navList a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 140) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(a => {
            a.style.color = (a.getAttribute('href') === '#' + current) ? '#38bdf8' : '';
        });
    });

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            const action = form.getAttribute('action') || '';
            if (action.includes('your-form-id')) {
                e.preventDefault();
                alert('This form is not wired to a live endpoint yet. Please reach out via WhatsApp or email for now — see the setup note below the form.');
            }
        });
    }
});
