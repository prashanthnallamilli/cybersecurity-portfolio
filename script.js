// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixChars = matrix.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00f2ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinkItems);

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TYPING EFFECT =====
const typingElement = document.querySelector('.command');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            typingElement.style.animation = 'blink 1s infinite';
        }
    }

    setTimeout(typeWriter, 1000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== LOCK ANIMATION =====
const lockShackle = document.querySelector('.lock-shackle');
let isLocked = true;

setInterval(() => {
    if (lockShackle) {
        if (isLocked) {
            lockShackle.style.transition = 'all 0.5s ease';
            lockShackle.setAttribute('d', 'M70 90 L70 70 Q70 30 100 30 Q130 30 130 70 L130 90');
        } else {
            lockShackle.setAttribute('d', 'M70 90 L70 60 Q70 30 100 30 Q130 30 130 60 L130 90');
        }
        isLocked = !isLocked;
    }
}, 3000);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===== GLITCH EFFECT ON HOVER =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'glitch-skew 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-cyan);
    color: var(--bg-primary);
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

console.log('%c🔐 Welcome to the Cybersecurity Portfolio! 🔐', 'color: #00f2ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion for security and code.', 'color: #7b2ff7; font-size: 14px;');
