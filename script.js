// script.js – full functionality for Eyakem portfolio (no demo alerts)

// 1. smooth scrolling for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 2. "Buy" / "DM" buttons – open real telegram or payment links
//    (assign real links here – for demonstration they go to Telegram DM)
const buyButtons = document.querySelectorAll('.js-buy-demo');
buyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // all purchase/direct messages go to your Telegram DM
        window.open('https://t.me/webtemplatecheap', '_blank');
    });
});

// 3. Contact form submission (realistic: redirect to Telegram)
const contactForm = document.getElementById('realContactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // get name and message (optional email)
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
        formFeedback.textContent = '⚠️ Please fill in your name and message.';
        formFeedback.style.color = '#dc3545';
        return;
    }

    // compose a telegram deep link (pre-filled message)
    const telegramUsername = 'webtemplatecheap'; // your DM handle
    const text = `Hello Eyakem, I'm ${name}. Message: ${message}`;
    const encodedText = encodeURIComponent(text);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedText}`;

    // redirect to Telegram DM with prefilled message
    window.open(telegramUrl, '_blank');

    // optional feedback
    formFeedback.innerHTML = `✅ Redirecting to Telegram DM ... <br> <small>(@${telegramUsername})</small>`;
    formFeedback.style.color = '#00d1b2';

    // optionally reset form
    contactForm.reset();
});

// 4. small hover enhancement (already in CSS, but we can log readiness)
console.log('Eyakem portfolio — ready for business');