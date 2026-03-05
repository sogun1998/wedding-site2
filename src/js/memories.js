export const memories = () => {
    const grid = document.querySelector('.memories-grid');
    const lightbox = document.querySelector('.memories-lightbox');

    if (!grid || !lightbox) return;

    const images = Array.from(grid.querySelectorAll('img'));
    if (!images.length) return;

    const figureImg = lightbox.querySelector('.memories-lightbox__figure img');
    const counterEl = lightbox.querySelector('.memories-lightbox__counter');
    const thumbsContainer = lightbox.querySelector('.memories-lightbox__thumbs');
    const closeBtn = lightbox.querySelector('.memories-lightbox__close');
    const prevBtn = lightbox.querySelector('.memories-lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.memories-lightbox__nav--next');
    const overlay = lightbox.querySelector('.memories-lightbox__overlay');

    let currentIndex = 0;

    const updateSlide = (index) => {
        const total = images.length;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        currentIndex = index;

        const { src, alt } = images[currentIndex];
        figureImg.src = src;
        figureImg.alt = alt || '';
        if (counterEl) {
            counterEl.textContent = `${currentIndex + 1} / ${total}`;
        }

        const thumbs = thumbsContainer.querySelectorAll('.memories-lightbox__thumb');
        thumbs.forEach((thumb, idx) => {
            thumb.classList.toggle('is-active', idx === currentIndex);
        });
    };

    const openLightbox = (index) => {
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        updateSlide(index);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('is-active');
        document.body.style.overflow = '';
    };

    // build thumbnails
    images.forEach((img, index) => {
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'memories-lightbox__thumb';
        thumb.setAttribute('aria-label', `Xem ảnh ${index + 1}`);
        thumb.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
        thumb.addEventListener('click', () => updateSlide(index));
        thumbsContainer.appendChild(thumb);
    });

    // click on grid image
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    // navigation
    prevBtn?.addEventListener('click', () => updateSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateSlide(currentIndex + 1));

    // close
    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);

    // keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') updateSlide(currentIndex + 1);
    });
};

