import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    loadProduct();
    initCustomCursor();
});

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

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.5 }
            }
        });
    }
}

function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.getElementById('product-detail-container');

    const product = products.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = `<div class="text-center w-full py-20">
            <h2 class="text-4xl font-bold text-gold mb-4">Produit non trouvé</h2>
            <a href="index.html" class="text-white underline">Retour à l'accueil</a>
        </div>`;
        return;
    }

    document.title = `${product.name} | Wosségué`;

    container.innerHTML = `
        <!-- Gauche : Image -->
        <div class="lg:w-3/5">
            <div class="relative group cursor-zoom-in rounded-3xl overflow-hidden border border-gold/10 bg-gray-900 min-h-[400px] flex items-center justify-center" id="main-image-container">
                ${product.image ? `
                    <img src="${product.image}" id="main-image" alt="${product.name}" class="w-full h-auto transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="bg-gold text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">Zoom</span>
                    </div>
                ` : `
                    <div class="text-gold/20 font-premium tracking-widest text-center px-4">
                        IMAGE EN COURS DE SHOOTING
                    </div>
                `}
            </div>
        </div>

        <!-- Droite : Infos -->
        <div class="lg:w-2/5 flex flex-col justify-center">
            <p class="text-gold font-premium tracking-[0.3em] mb-2 uppercase text-sm">${product.category}</p>
            <h1 class="text-4xl md:text-6xl font-black mb-6 text-white uppercase leading-tight">${product.name}</h1>
            
            <div class="text-3xl font-black text-gold mb-8 logo-shimmer inline-block">${product.price}</div>
            
            <p class="text-gray-400 text-lg font-light leading-relaxed mb-10">
                ${product.description}
            </p>

            <div class="space-y-8 mb-10">
                ${product.sizes.length > 0 && product.sizes[0] !== 'Unique' ? `
                    <div>
                        <h4 class="font-premium text-sm tracking-widest text-gray-500 mb-4">CHOISIR TAILLE</h4>
                        <div class="flex gap-4" id="size-selector">
                            ${product.sizes.map(size => `
                                <button class="size-btn w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all font-bold" data-value="${size}">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${product.colors.length > 1 ? `
                    <div>
                        <h4 class="font-premium text-sm tracking-widest text-gray-500 mb-4">CHOISIR COULEUR</h4>
                        <div class="flex gap-4" id="color-selector">
                            ${product.colors.map(color => `
                                <button class="color-btn px-6 py-2 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:text-gold transition-all font-bold uppercase text-xs" data-value="${color}">
                                    ${color}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <button id="whatsapp-btn" class="btn-gold w-full py-6 rounded-2xl flex items-center justify-center gap-4 text-xl">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                COMMANDER SUR WHATSAPP
            </button>
        </div>
    `;

    // Interactivité
    const sizeBtns = document.querySelectorAll('.size-btn');
    let selectedSize = product.sizes.length === 1 ? product.sizes[0] : null;

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('bg-gold', 'text-black'));
            btn.classList.add('bg-gold', 'text-black');
            selectedSize = btn.dataset.value;
        });
    });

    const colorBtns = document.querySelectorAll('.color-btn');
    let selectedColor = product.colors.length === 1 ? product.colors[0] : null;

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('bg-gold', 'text-black'));
            btn.classList.add('bg-gold', 'text-black');
            selectedColor = btn.dataset.value;
        });
    });

    // WhatsApp Logic
    document.getElementById('whatsapp-btn').addEventListener('click', () => {
        if (!selectedSize && product.sizes.length > 1) {
            alert('Veuillez choisir une taille');
            return;
        }
        if (!selectedColor && product.colors.length > 1) {
            alert('Veuillez choisir une couleur');
            return;
        }

        const phoneNumber = "22870170157"; 
        const message = `Bonjour Wosségué Store, je souhaite commander la [${product.name}], taille [${selectedSize || 'N/A'}], couleur [${selectedColor || 'N/A'}], pour le prix de [${product.price}]. (Prix incluant la livraison). L'image de référence est [${window.location.origin}/${product.image}].`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });

    // Lightbox Logic
    const mainImgContainer = document.getElementById('main-image-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (mainImgContainer && product.image) {
        mainImgContainer.addEventListener('click', () => {
            lightboxImg.src = product.image;
            lightbox.classList.add('active');
        });
    }
}
