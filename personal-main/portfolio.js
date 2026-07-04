
const navBar = document.querySelector('.nav-links');
const navToggle = document.getElementById('hamburger');

navToggle.addEventListener('click', () => {
    const opened = navBar.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
   
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const formData = new FormData(contactForm);
        formData.append('form-name', contactForm.getAttribute('name') || 'contact');
        if (status) status.textContent = 'Sending...';
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            if (response.ok) {
                if (status) status.textContent = 'Message sent — thanks!';
                contactForm.reset();
            } else {
                if (status) status.textContent = 'There was a problem sending your message.';
            }
        } catch (err) {
            if (status) status.textContent = 'Network error — please try again later.';
        }
    });
}
