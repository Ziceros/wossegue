import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderProducts();
    initMobileMenu();
    initCustomCursor();
    initScrollReveal();
});

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": false },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 100, "size": 6, "duration": 2, "opacity": 0.8, "speed": 3 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !dot) return;

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map((product, index) => `
        <div class="product-card bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden group reveal" style="transition-delay: ${index * 100}ms">
            <a href="produit.html?id=${product.id}">
                <div class="relative overflow-hidden aspect-square bg-gray-900">
                    ${product.image ? `
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    ` : `
                        <div class="w-full h-full flex items-center justify-center text-gold/20 font-premium text-xs tracking-widest text-center px-4">
                            IMAGE EN COURS DE SHOOTING
                        </div>
                    `}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span class="text-gold font-premium tracking-widest text-sm">Voir les détails</span>
                    </div>
                </div>
                <div class="p-6">
                    <p class="text-gray-400 text-xs uppercase tracking-widest mb-2">${product.category}</p>
                    <h3 class="text-xl font-bold mb-3 group-hover:text-gold transition-colors">${product.name}</h3>
                    <div class="flex justify-between items-center">
                        <span class="product-price text-2xl font-black text-gold">${product.price}</span>
                        <div class="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.add('active');
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    }

    // Fermer le menu si on clique sur un lien
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}
